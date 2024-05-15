import { blob, nat, nat32, nat64, text, Record, Principal, Variant, Opt } from 'azle';

export const Account = Record({
    owner: Principal,
    subaccount: Opt(blob)
});

export type Account = typeof Account.tsType;

export const TransferArg = Record({
    spender_subaccount: Opt(blob),
    from: Account,
    to: Account,
    amount: nat,
    fee: Opt(nat),
    memo: Opt(blob),
    created_at_time: Opt(nat64)
});

export const TransferError = Variant({
    BadFee: Record({ expected_fee: nat }),
    BadBurn: Record({ min_burn_amount: nat }),
    InsufficientFunds: Record({ balance: nat }),
    CreatedInFuture: Record({ ledger_time: nat64 }),
    Duplicate: Record({ duplicate_of: nat }),
    GenericError: Record({ error_code: nat, message: text })
});

export type TransferError = typeof TransferError.tsType;

export type TransferArg = typeof TransferArg.tsType;

export const TransferResult = Record({
    Ok: nat,
    Err: TransferError
});

export type TransferResult = typeof TransferResult.tsType;

export const WithdrawResult = Record({
    Ok: nat32,
    Message: text
});

export type WithdrawResult = typeof WithdrawResult.tsType;