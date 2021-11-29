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

import { AccountsContextProvider } from "./AccountsContext";
import { AnchorProvider } from "./AnchorContext";
import { ConnectionProvider } from "./ConnectionProvider";
import { MaridropProvider } from "./MaridropContext";

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
    <AccountsContextProvider>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <ConnectionProvider>
          <AnchorProvider>
            <MaridropProvider>{children}</MaridropProvider>
          </AnchorProvider>
        </ConnectionProvider>
      </WalletProvider>
    </AccountsContextProvider>
  );
};
