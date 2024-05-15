"use client"

import { SiweIdentityProvider } from 'ic-use-siwe-identity';
import { _SERVICE } from "../../../declarations/ic_siwe_provider/ic_siwe_provider.did";
import { idlFactory } from "../../../declarations/ic_siwe_provider/index";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import Actors from '../Actors';

const queryClient = new QueryClient();

export default function WalletInitate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: '8d12ae2f-e980-48e5-97e4-96b552ba7721',
        walletConnectors: [EthereumWalletConnectors],
      }}>
      <QueryClientProvider client={queryClient} >
        <WagmiProvider config={config}>
          <DynamicWagmiConnector>
            <SiweIdentityProvider<_SERVICE>
              idlFactory={idlFactory}
              canisterId={"bd3sg-teaaa-aaaaa-qaaba-cai"}
            >
              <Actors>
                {children}
              </Actors>
            </SiweIdentityProvider>
          </DynamicWagmiConnector>
        </WagmiProvider>
      </QueryClientProvider >
    </DynamicContextProvider>
  );
}