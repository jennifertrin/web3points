export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getTotalAmountByAddress' : IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
    'getTotalTokenByAddress' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'getUserLoginStreak' : IDL.Func([IDL.Text], [IDL.Nat32], ['query']),
    'getUserProfile' : IDL.Func(
        [IDL.Text],
        [
          IDL.Record({
            'name' : IDL.Text,
            'email' : IDL.Text,
            'address' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getUserProfileById' : IDL.Func(
        [IDL.Nat32],
        [
          IDL.Opt(
            IDL.Record({
              'name' : IDL.Text,
              'email' : IDL.Text,
              'address' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getUserTransactions' : IDL.Func(
        [IDL.Text],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'redeemed' : IDL.Bool,
              'timestamp' : IDL.Nat64,
              'amount' : IDL.Nat32,
            })
          ),
        ],
        ['query'],
      ),
    'updateUser' : IDL.Func(
        [
          IDL.Record({
            'name' : IDL.Text,
            'email' : IDL.Text,
            'address' : IDL.Text,
          }),
        ],
        [
          IDL.Record({
            'name' : IDL.Text,
            'email' : IDL.Text,
            'address' : IDL.Text,
          }),
        ],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
    'withdraw' : IDL.Func(
        [IDL.Text],
        [IDL.Record({ 'Ok' : IDL.Nat32, 'Message' : IDL.Text })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
