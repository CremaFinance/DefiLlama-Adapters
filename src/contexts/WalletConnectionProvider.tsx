import { useToast } from "@chakra-ui/react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import {
  getPhantomWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getCoin98Wallet,
  getSlopeWallet,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useCallback, useMemo } from "react";

import { DEFAULT_ENDPOINT } from "utils/web3/endpoints";

import { ConnectionProvider } from "./ConnectionProvider";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = DEFAULT_ENDPOINT.name as WalletAdapterNetwork;

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
    <ConnectionProvider>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
