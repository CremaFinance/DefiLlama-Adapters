import { EventEmitter } from "@solana/wallet-adapter-base";
import { PublicKey, Transaction } from "@solana/web3.js";

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => unknown;
  disconnect: () => unknown;

  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
}
