import { getDefaultConfig } from "connectkit";
import { http } from "viem";
import { arbitrum, mainnet } from "viem/chains";
import { createConfig } from "wagmi";

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, arbitrum],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [arbitrum.id]: http(),
    },
    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    // Required App Info
    appName: "Simple Send data",
    // Optional App Info
    appDescription: "Simplified send transaction data",
  })
);
