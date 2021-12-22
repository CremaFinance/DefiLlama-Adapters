import * as quarry from "@quarryprotocol/quarry-sdk";
import * as st from "@saberhq/token-utils";
import { TransactionSignature } from "@solana/web3.js";

export interface Farm {
  token: st.Token;
  quarry: quarry.QuarryWrapper;
  miner?: quarry.MinerWrapper;
  minerData?: quarry.MinerData;

  stake(uiAmount: string): Promise<TransactionSignature>;
  withdraw(uiAmount: string): Promise<TransactionSignature>;
  claim(): Promise<TransactionSignature>;
}
