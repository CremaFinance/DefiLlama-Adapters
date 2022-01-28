import { useToast } from "@chakra-ui/react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
  SolflareWalletAdapter,
  SolflareWebWalletAdapter,
  Coin98WalletAdapter,
  SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useCallback, useMemo } from "react";

import { DEFAULT_ENDPOINT } from "../utils/web3/endpoints";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const network = DEFAULT_ENDPOINT.name as WalletAdapterNetwork;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new SolflareWalletAdapter(),
      new SolflareWebWalletAdapter(),
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
