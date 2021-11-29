import { Provider } from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

import { useWallet } from "../hooks/useWallet";
import { DEFAULT_ENDPOINT } from "../utils/web3/endpoints";
import { DummyWalletAdapter } from "../wallet-adapters/dummy";

import { useConnection } from "./ConnectionProvider";

export const defaultAnchorProvider = () => {
  return new Provider(
    new Connection(DEFAULT_ENDPOINT.endpoint, "recent"),
    new DummyWalletAdapter(),
    Provider.defaultOptions()
  );
};

const AnchorContext = createContext<{
  anchorProvider: Provider;
}>({
  anchorProvider: defaultAnchorProvider(),
});

export const AnchorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const connection = useConnection();
  const { signTransaction, signAllTransactions, publicKey } = useWallet();

  const anchorProvider = useMemo(
    () =>
      new Provider(
        connection,
        signTransaction && signAllTransactions && publicKey
          ? { signTransaction, signAllTransactions, publicKey }
          : new DummyWalletAdapter(),
        Provider.defaultOptions()
      ),
    [connection, publicKey, signAllTransactions, signTransaction]
  );
  return (
    <AnchorContext.Provider
      value={{
        anchorProvider,
      }}
    >
      {children}
    </AnchorContext.Provider>
  );
};

export function useAnchorProvider(): Provider {
  return useContext(AnchorContext).anchorProvider;
}
