/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  EventEmitter,
  SendTransactionOptions,
  WalletAdapter,
  WalletAdapterEvents,
} from "@solana/wallet-adapter-base";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

import { DEFAULT_PUBLIC_KEY } from "../utils/web3/ids";

export class DummyWalletAdapter extends EventEmitter implements WalletAdapter {
  ready = () => {
    return Promise.resolve(false);
  };

  connecting = false;

  connected = false;

  sendTransaction(
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  eventNames(): (keyof WalletAdapterEvents)[] {
    return [];
  }

  get publicKey(): PublicKey {
    return DEFAULT_PUBLIC_KEY;
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    throw new Error("Wallet is not connected");
  }

  connect() {
    return Promise.reject(new Error("Please choose wallet"));
  }

  disconnect() {
    return Promise.resolve();
  }

  signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    throw new Error("Wallet is not connected");
  }
}
