import { Account, Connection } from "@solana/web3.js";
import type { FC, ReactNode } from "react";
import React, { useContext, useEffect, useMemo } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import type { ENV } from "../utils/web3/endpoints";
import { DEFAULT_ENDPOINT, ENDPOINTS } from "../utils/web3/endpoints";

interface ConnectionConfig {
  connection: Connection;
  airdrop: null | {
    connection: Connection;
    maxSOL: number;
  };

  endpoint: string;
  env: ENV;
  setEndpoint: (val: string) => void;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  endpoint: DEFAULT_ENDPOINT.endpoint,
  setEndpoint: () => {},
  connection: new Connection(DEFAULT_ENDPOINT.endpoint, "recent"),
  airdrop: null,
  env: DEFAULT_ENDPOINT.name,
});

export const ConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [endpoint, setEndpoint] = useLocalStorageState(
    "connectionEndpts",
    DEFAULT_ENDPOINT.endpoint
  );

  const connection = useMemo(
    () => new Connection(endpoint, "recent"),
    [endpoint]
  );

  const chain =
    ENDPOINTS.find((end) => end.endpoint === endpoint) || DEFAULT_ENDPOINT;
  const env = chain.name;

  const airdrop = useMemo(() => {
    if (chain.airdropEndpoint === null) {
      return null;
    }

    const airdropConnection =
      chain.endpoint === chain.airdropEndpoint
        ? connection
        : new Connection(chain.airdropEndpoint, "recent");

    return {
      connection: airdropConnection,
      maxSOL: chain.maxAirdrop ? chain.maxAirdrop : 10,
    };
  }, [chain.airdropEndpoint, chain.endpoint, chain.maxAirdrop, connection]);

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    if (connection && endpoint === connection._rpcEndpoint) return;
    const id = connection.onAccountChange(new Account().publicKey, () => {});
    // eslint-disable-next-line consistent-return
    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [connection, endpoint]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    if (connection && endpoint === connection._rpcEndpoint) return;
    const id = connection.onSlotChange(() => null);
    // eslint-disable-next-line consistent-return
    return () => {
      connection.removeSlotChangeListener(id);
    };
  }, [connection, endpoint]);

  return (
    <ConnectionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        endpoint,
        setEndpoint,
        connection,
        airdrop,
        env,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export function useConnection() {
  return useContext(ConnectionContext).connection;
}

export function useAirdrop() {
  return useContext(ConnectionContext).airdrop;
}

export function useChain() {
  const context = useContext(ConnectionContext);
  return ENDPOINTS.find((end) => end.name === context.env) || DEFAULT_ENDPOINT;
}

export function useEndpoint() {
  return useChain().endpoint;
}

export function useKeys() {
  return useChain().keys;
}

/* DANGER: it may rerender in loop because of returning fresh object
export function useConnectionConfig() {
    const context = useContext(ConnectionContext);
    const chain = ENDPOINTS.find(end => end.name === context.env) || DEFAULT;
    return {
        endpoint: context.endpoint,
        setEndpoint: context.setEndpoint,
        env: context.env,
        marinadeProgramId: chain.marinadeProgramId,
        marinadeStateId: chain.marinadeStateId,
    }
} */
