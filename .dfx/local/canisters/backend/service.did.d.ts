import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getTotalAmountByAddress' : ActorMethod<[string], number>,
  'getTotalTokenByAddress' : ActorMethod<[string], bigint>,
  'getUserLoginStreak' : ActorMethod<[string], number>,
  'getUserProfile' : ActorMethod<
    [string],
    { 'name' : string, 'email' : string, 'address' : string }
  >,
  'getUserProfileById' : ActorMethod<
    [number],
    [] | [{ 'name' : string, 'email' : string, 'address' : string }]
  >,
  'getUserTransactions' : ActorMethod<
    [string],
    Array<
      {
        'id' : string,
        'redeemed' : boolean,
        'timestamp' : bigint,
        'amount' : number,
      }
    >
  >,
  'updateUser' : ActorMethod<
    [{ 'name' : string, 'email' : string, 'address' : string }],
    { 'name' : string, 'email' : string, 'address' : string }
  >,
  'whoami' : ActorMethod<[], string>,
  'withdraw' : ActorMethod<[string], { 'Ok' : number, 'Message' : string }>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
