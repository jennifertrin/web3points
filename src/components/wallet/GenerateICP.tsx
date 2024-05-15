"use client"

import { useSiweIdentity } from "ic-use-siwe-identity";

interface WalletConnectionProps {
    isDynamicLoggedIn: boolean
}

export default function WalletConnection({ isDynamicLoggedIn }: WalletConnectionProps) {
    const { login, identity } = useSiweIdentity();

    return (
        <div className="p-4 flex flex-col gap-y-6">
            {isDynamicLoggedIn && !identity && <div>
                <button onClick={() => login()} className="btn btn-lg">
                    Create ICP Principal
                </button>
            </div>}
        </div>
    );
}