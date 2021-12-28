import {
  useAnchorWallet,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";

export const useWallet = () => {
  const anchorWalletContext = useAnchorWallet();
  const walletContext = useSolanaWallet();
  return { ...walletContext, ...anchorWalletContext };
};
