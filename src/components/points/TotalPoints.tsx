"use client"

import { useSiweIdentity } from "ic-use-siwe-identity";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { backend } from '../../declarations/backend';
import { useEffect, useState } from "react";

export default function TotalPoints() {

    const [currentPoints, setCurrentPoints] = useState<number | null>(null);
    const [currentTokens, setCurrentTokens] = useState<number | null>(null);
    const [isWaitingForWithdraw, setIsWaitingForWithdraw] = useState<boolean | null>(null);

    const { identity } = useSiweIdentity();
    const isDynamicLoggedIn = useIsLoggedIn();

    const icpPrincipal = identity?.getPrincipal().toString();

    async function getPointsData() {
        await backend?.getTotalAmountByAddress(icpPrincipal).then((totalPoints) => {
            setCurrentPoints(totalPoints || 0);
        });
    }

    async function getTokenData() {
        await backend?.getTotalTokenByAddress(icpPrincipal).then((totalTokens) => {
            setCurrentTokens(Number(totalTokens) || 0);
        });
    }

    async function withdrawPoints() {
        setIsWaitingForWithdraw(true);
        await backend?.withdraw(icpPrincipal).then((response) => {
            console.log('icpPrincipal', icpPrincipal);
            console.log(response);
            setIsWaitingForWithdraw(false);
        });;
    }

    useEffect(() => {
        getPointsData();
        getTokenData();
    }, [identity])

    return (
        <div>
            {isDynamicLoggedIn && identity &&
                <div className="stats card card-side border border-1">
                    <div className="stat">
                        <div>
                            <div className="stat-title">Current points balance:</div>
                            <div className={`${currentPoints === null ? 'text-sm' : 'stat-value'}`}>{currentPoints === null ? 'Loading' : currentPoints}</div>
                            <div className="stat-title">Current BERRY token balance:</div>
                            <div className={`${currentTokens === null ? 'text-sm' : 'stat-value'}`}>{currentTokens === null ? 'Loading' : currentTokens}</div>
                        </div>
                        <div className="stat-actions flex gap-x-4">
                            <button className="flex btn btn-sm">Earn more</button>
                            <button disabled={isWaitingForWithdraw} className="flex btn btn-sm" onClick={() => { withdrawPoints() }}>Withdraw</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
