import { Image, useToast } from "@chakra-ui/react";
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
import { useTranslation } from "next-export-i18n";
import type { FC, ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { DEFAULT_ENDPOINT } from "../utils/web3/endpoints";
import Link from "components/atoms/Link";
import { useTracking } from "hooks/useTracking";

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
  const { t } = useTranslation();
  const { track } = useTracking();

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
      } else if (error.toString().includes("Failed to sign transaction")) {
        toast({
          title: error.name,
          status: "error",
          description: (
            <>
              {error.message}. {t("appPage.ledger-blind-signing")}
              <Link
                href="https://support.ledger.com/hc/en-us/articles/360016265659-Solana-SOL?docs=true"
                isExternal
                fontWeight="bold"
                textDecoration="underline"
                rel="noreferrer noopener"
                display="inline-flex"
                _focus={{ outline: "none" }}
              >
                {t("mndePage.here")}
                <Image
                  src="/icons/external-link-black.svg"
                  width="1rem"
                  marginLeft="5px"
                />
              </Link>
            </>
          ),
          variant: "subtle",
          isClosable: true,
        });

        track({
          event: "Stake SOL Error",
          category: "Basic Staking",
          action: "Stake",
          label: "Error",
          description: error.message,
        });
      }
    },
    [toast, t, track]
  );

  return (
    <WalletProvider wallets={wallets} onError={onError}>
      {children}
    </WalletProvider>
  );
};
