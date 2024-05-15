import {
    Canister,
    ic,
    init,
    nat,
    nat32,
    nat64,
    Opt,
    Principal,
    query,
    Some,
    text,
    update,
    None,
    Vec
} from 'azle';
import { profileStore, transactionMap, Transaction, UserProfile, userLoginMap } from '../src/user_profile';
import {
    SiweProviderCanister,
    initializeSiweProviderCanister,
} from "./siwe_provider";
import { Account, TransferArg, TransferResult, WithdrawResult } from './ledger';

const TokenCanister = Canister({
    icrc2_transfer_from: update([TransferArg], TransferResult),
    icrc1_balance_of: query([Account], nat)
});

const tokenCanister = TokenCanister(
    Principal.fromText('mxzaz-hqaaa-aaaar-qaada-cai')
);

export default Canister({
    updateUser: update([UserProfile], UserProfile, (username) => {
        let existingProfile: UserProfile | undefined;
        const userPrincipalString = ic.caller().toString();
        if (userPrincipalString === username.address) {
            for (const [userId, profile] of profileStore.items()) {
                if (profile.address === username.address) {
                    existingProfile = profile;
                    break;
                }
            }
            if (existingProfile) {
                return existingProfile;
            } else {
                const userId = generateUserId();
                const user: UserProfile = {
                    address: username.address,
                    name: username.name,
                    email: username.email
                };
                profileStore.insert(userId, user);
                const transactionId = generateTransactionId();
                const transaction: Transaction = {
                    id: username.address,
                    amount: 10,
                    timestamp: ic.time(),
                    redeemed: false
                };
                transactionMap.insert(transactionId, transaction);
                return user;
            }
        }
    }),
    getUserProfile: query([text], UserProfile, (address) => {
        let existingProfile: UserProfile | undefined;
        for (const [userId, profile] of profileStore.items()) {
            if (profile.address === address) {
                existingProfile = profile;
                break;
            }
        }
        return existingProfile;
    }),
    getUserLoginStreak: query([text], nat32, (address) => {
        let streak = 0;
        let currentStreak = 0;
        let lastDate: nat64 | null = null;
        for (const entry of userLoginMap.items()) {
            const [key, value] = entry;
            if (value.address === address) {
                if (lastDate !== null && lastDate !== value.date) {
                    currentStreak = 0;
                }
                lastDate = value.date;
                currentStreak++;
                streak = Math.max(streak, currentStreak);
            }
        }
        return streak;
    }),
    getTotalAmountByAddress: query([text], nat32, (address) => {
        let totalAmount = 0;
        for (const entry of transactionMap.items()) {
            const [_, transaction] = entry;
            if (transaction.id === address && transaction.redeemed === false) {
                totalAmount += transaction.amount;
            }
        }
        return totalAmount;
    }),
    getTotalTokenByAddress: query([text], nat, async (address) => {
        const points = await ic.call(tokenCanister.icrc1_balance_of, {
            args: [
                {
                    owner: Principal.fromText(address),
                    subaccount: None,
                }
            ]
        });
        return points;
    }),
    withdraw: update([text], WithdrawResult, async (address) => {
        const userPrincipalString = ic.caller().toString();
        if (userPrincipalString === address) {
            let totalNeedToWithdraw = 0;
            for (const entry of transactionMap.items()) {
                const [_, transaction] = entry;
                if (transaction.id === address && transaction.redeemed === false) {
                    totalNeedToWithdraw += transaction.amount;
                    transaction.redeemed = true;
                }
            }
            await ic.call(tokenCanister.icrc2_transfer_from, {
                args: [{
                    spender_subaccount: None,
                    from: {
                        owner: Principal.fromText("arnyo-efrhj-dqu5x-nowmf-7tade-j2vwe-7p6ow-vfac3-vkpg6-aj766-oae"),
                        subaccount: None,
                    },
                    to: {
                        owner: ic.caller(),
                        subaccount: None
                    },
                    amount: BigInt(totalNeedToWithdraw),
                    fee: Some(BigInt(10_000)),
                    memo: None,
                    created_at_time: Some(ic.time())
                }
                ]
            });
            return { Ok: totalNeedToWithdraw, Message: 'User can withdraw' };
        } else {
            return { Ok: 0, Message: `User ${userPrincipalString} cannot withdraw` };
        }
    }),
    whoami: query([], text, () => {
        const user = ic.caller().toString();
        return user;
    }),
    getUserProfileById: query([nat32], Opt(UserProfile), (id) => {
        const profile = profileStore.get(id)
        return profile;
    }),
    getUserTransactions: query([text], Vec(Transaction), (address) => {
        const userTransactions: Transaction[] = [];
        for (const entry of transactionMap.items()) {
            const [key, transaction] = entry;
            if (transaction.id === address) {
                userTransactions.push(transaction);
            }
        }
        return userTransactions;
    }),
    init: init([Principal], (siweProviderPrincipal) => {
        initializeSiweProviderCanister(SiweProviderCanister(siweProviderPrincipal));
    })
});

function generateUserId(): number {
    const id = Number(profileStore.len());
    return id + 1;
}

function generateTransactionId(): number {
    const id = Number(transactionMap.len());
    return id + 1;
}