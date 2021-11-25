import { useToast } from "@chakra-ui/react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  Account,
  Commitment,
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { FC, ReactNode, useContext, useEffect, useMemo } from "react";

import TransactionLink from "../components/molecules/TransactionLink";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useWallet } from "../hooks/useWallet";
import { DEFAULT_ENDPOINT, ENDPOINTS, ENV } from "../utils/web3/endpoints";

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

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  // wait for all confirmation before getting transaction
  await connection.confirmTransaction(txid, "max");

  const tx = await connection.getParsedConfirmedTransaction(txid);

  const errors: string[] = [];
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log) => {
      const regex = /Error: (.*)/gm;
      let m;
      // eslint-disable-next-line no-cond-assign
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          // eslint-disable-next-line no-plusplus
          regex.lastIndex++;
        }

        if (m.length > 1) {
          errors.push(m[1]);
        }
      }
    });
  }

  return errors;
};

export const sendTransaction = async (
  connection: Connection,
  instructions: TransactionInstruction[],
  signers: Account[],
  awaitConfirmation = true
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chain = useChain();

  let transaction = new Transaction();
  instructions.forEach((instruction) => transaction.add(instruction));
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash("max")
  ).blockhash;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { publicKey, signTransaction } = useWallet();

  if (!publicKey) throw new WalletNotConnectedError();
  if (!signTransaction)
    throw new Error("Wallet does not support transaction signing!");

  transaction.setSigners(
    // fee payed by the wallet owner
    publicKey,
    ...signers.map((s) => s.publicKey)
  );
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  transaction = await signTransaction(transaction);

  const rawTransaction = transaction.serialize();
  const options = {
    skipPreflight: true,
    commitment: "singleGossip",
  };

  const txid = await connection.sendRawTransaction(rawTransaction, options);

  if (awaitConfirmation) {
    const status = (
      await connection.confirmTransaction(
        txid,
        options && (options.commitment as Commitment)
      )
    ).value;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toast = useToast();
    if (status?.err) {
      const errors = await getErrorForTransaction(connection, txid);
      toast({
        title: "Transaction failed",
        status: "error",
        duration: 10000,
        description: (
          <>
            {errors.map((err) => (
              <div>{err}</div>
            ))}
            <TransactionLink chainName={chain.name} transactionid={txid} />
          </>
        ),
      });
      throw new Error(
        `Raw transaction ${txid} failed (${JSON.stringify(status)})`
      );
    }
  }

  return txid;
};
