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

import { DEFAULT_ENDPOINT } from "../utils/web3/endpoints";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = DEFAULT_ENDPOINT.name as WalletAdapterNetwork;

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
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
      if (
        error.name !== "WalletNotFoundError" &&
        error.name !== "WalletNotReadyError"
      ) {
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
    <WalletProvider wallets={wallets} onError={onError}>
      {children}
    </WalletProvider>
  );
};
