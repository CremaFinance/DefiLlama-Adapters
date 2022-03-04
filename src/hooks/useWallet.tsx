import {
  useAnchorWallet,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import type { Transaction } from "@solana/web3.js";
import { useContext } from "react";

import { AccountsContext } from "../contexts/AccountsContext";

export const useWallet = () => {
  const anchorWalletContext = useAnchorWallet();
  const walletContext = useSolanaWallet();
  const { transactionSignedAction } = useContext(AccountsContext);
  return {
    ...walletContext,
    ...anchorWalletContext,
    signTransaction: anchorWalletContext
      ? (transaction: Transaction) => {
          return anchorWalletContext
            ?.signTransaction(transaction)
            .then((signature) => {
              transactionSignedAction(true);
              return signature;
            });
        }
      : undefined,
  };
};
