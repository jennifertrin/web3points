import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '69bd8a0c3106c08b72524c648efa5e10'

export const config = createConfig({
    chains: [mainnet],
    connectors: [
        injected(),
        walletConnect({ projectId }),
        metaMask(),
        safe(),
    ],
    transports: {
        [mainnet.id]: http()
    },
})