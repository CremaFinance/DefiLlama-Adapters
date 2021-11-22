import { useToast } from "@chakra-ui/react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getCoin98Wallet,
  getSlopeWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useMemo, useCallback } from "react";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = WalletAdapterNetwork.Mainnet; // to-do get from env var on build?

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getPhantomWallet(),
      getSolflareWallet(),
      getSolflareWebWallet(),
      getCoin98Wallet(),
      getSlopeWallet(),
    ],
    [network]
  );

  const toast = useToast();

  const onError = useCallback(
    (error: WalletError) => {
      if (error.name !== "WalletNotFoundError") {
        toast({
          title: error.name,
          status: "error",
          description: error.message,
          variant: "subtle",
          isClosable: true,
        });
      }
    },
    [toast]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
