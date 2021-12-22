import { PublicKey } from "@solana/web3.js";

export interface TokadaptState {
  adminAuthority: PublicKey;
  inputMint: PublicKey;
  outputStorage: PublicKey;
  outputStorageAuthorityBump: PublicKey;
}
