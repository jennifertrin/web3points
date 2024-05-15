"use client"

import { useSiweIdentity } from "ic-use-siwe-identity";
import TotalPoints from "../points/TotalPoints";
import { backend } from '../../declarations/backend';
import { useEffect, useState } from "react";

interface WalletConnectionProps {
    isDynamicLoggedIn: boolean
}

export default function WalletConnection({ isDynamicLoggedIn }: WalletConnectionProps) {
    const { clear, identity, identityAddress } = useSiweIdentity();

    const icpPrincipal = identity?.getPrincipal().toString();
    const EthereumAddress = identityAddress;

    return (
        <div className="p-4 flex flex-col gap-y-6">
            {isDynamicLoggedIn && identity &&
                <div className="flex flex-row w-full justify-evenly">
                    <TotalPoints />
                    <div className="flex flex-col mr-0 px-4 py-4 justify-between card card-side border border-1">
                        <label htmlFor="icpPrincipal" className="flex flex-col text-md font-lighter">
                            Ethereum Address:
                            <span>{EthereumAddress || 'Loading'}</span>
                        </label>
                        <label htmlFor="icpPrincipal" className="flex flex-col text-md font-lighter">
                            ICP Principal:
                            <span>{icpPrincipal || 'Loading'}</span>
                        </label>
                        <button onClick={() => clear()} className="btn btn-sm text-md">
                            Sign out
                        </button>
                    </div>
                </div>}
        </div>
    );
}