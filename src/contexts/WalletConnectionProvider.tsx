import { useToast } from "@chakra-ui/react";
import type {
  WalletAdapterNetwork,
  WalletError,
} from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
  SolflareWalletAdapter,
  Coin98WalletAdapter,
  SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import type { FC, ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { DEFAULT_ENDPOINT } from "../utils/web3/endpoints";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = DEFAULT_ENDPOINT.name as WalletAdapterNetwork;

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new Coin98WalletAdapter(),
      new SlopeWalletAdapter(),
    ],
    [network]
  );

  const toast = useToast();

  const onError = useCallback(
    (error: WalletError) => {
      if (
        error.name !== "WalletNotFoundError" &&
        error.name !== "WalletNotReadyError" &&
        error.name !== "WalletSignTransactionError"
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
