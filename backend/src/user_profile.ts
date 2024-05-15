import { Record, StableBTreeMap, text, nat32, nat64, bool } from "azle";

const TransactionKey = nat32;

type TransactionKey = typeof TransactionKey.tsType;

export const Transaction = Record({
    id: text,
    amount: nat32,
    timestamp: nat64,
    redeemed: bool
});

export type Transaction = typeof Transaction.tsType;

const UserKey = nat32;

type UserKey = typeof UserKey.tsType;

export const UserProfile = Record({
    address: text,
    name: text,
    email: text,
});

export type UserProfile = typeof UserProfile.tsType;

const UserLoginKey = nat32;

type UserLoginKey = typeof UserLoginKey.tsType;

export const UserLogin = Record({
    address: text,
    date: nat64
});

export type UserLogin = typeof UserLogin.tsType;

export let profileStore = StableBTreeMap<UserKey, UserProfile>(0);

export let transactionMap = StableBTreeMap<TransactionKey, Transaction>(0);

export let userLoginMap = StableBTreeMap<UserLoginKey, UserLogin>(0);
