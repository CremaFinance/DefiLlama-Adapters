import { useToast, Link } from "@chakra-ui/react";
import { WalletError } from "@solana/wallet-adapter-base";
import { useWallet as useSolanaWalllet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect } from "react";

import { useTranslation } from "./useTranslation";

export const useWallet = () => {
  const { t } = useTranslation();
  const walletContext = useSolanaWalllet();
  const { connected, adapter, wallet, connecting } = walletContext;
  const toast = useToast();
  const msg = t("appPage.wallet-missing").replace("{{wallet}}", wallet?.name);
  const tryConnect = useCallback(async () => {
    if (adapter) {
      try {
        // try to force connection to access adpater errors if not installed
        await adapter.connect();
      } catch (e) {
        const error = e as WalletError;
        if (error.name === "WalletNotFoundError") {
          toast({
            title: "Wallet extension not detected",
            status: "error",
            description: (
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href={wallet?.url}
              >
                {msg}
              </Link>
            ),
            variant: "subtle",
            isClosable: true,
          });
        }
      }
    }
  }, [adapter, toast, msg, wallet?.url]);

  useEffect(() => {
    if (adapter && !adapter.ready && wallet && !connected && !connecting) {
      tryConnect();
    }
  }, [tryConnect, adapter, wallet, connected, connecting]);

  return walletContext;
};
