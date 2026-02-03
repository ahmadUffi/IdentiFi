"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
import { defineChain } from "viem";
import { sepolia } from "viem/chains";

const BitTorrentTestnet = defineChain({
  id: 1029,
  name: "BitTorrent Testnet",
  nativeCurrency: { name: "BTT", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://pre-rpc.bt.io/"] },
  },
  blockExplorers: {
    default: { name: "BitTorrent Explorer", url: "https://testscan.bt.io" },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: BitTorrentTestnet,
        supportedChains: [sepolia, BitTorrentTestnet],
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Providers;
