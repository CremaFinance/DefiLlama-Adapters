import { useToast } from "@chakra-ui/react";
import { WalletError } from "@solana/wallet-adapter-base";
import { useWallet as useSolanaWalllet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect } from "react";

export const useWallet = () => {
  const walletContext = useSolanaWalllet();
  const { connected, adapter, wallet, connecting } = walletContext;
  const toast = useToast();
  const tryConnect = useCallback(async () => {
    if (adapter) {
      try {
        // try to force connection to access adpater errors if not installed
        await adapter.connect();
      } catch (e) {
        const error = e as WalletError;
        toast({
          title: error.name,
          status: "warning",
          duration: 100000,
          description: "blblbl",
          variant: "subtle",
          isClosable: true,
        });
      }
    }
  }, [adapter, toast]);

  useEffect(() => {
    if (adapter && !adapter.ready && wallet && !connected && !connecting) {
      tryConnect();
    }
  }, [tryConnect, adapter, wallet, connected, connecting]);

  return walletContext;
};
