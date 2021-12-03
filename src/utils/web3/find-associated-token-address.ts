import { PublicKey } from "@solana/web3.js";

import { findProgramAddress } from "./find-program-address";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "./ids";

/**
 * find the associated token address (canonical)
 * given the main user's address (wallet) and the Token Mint
 * @param walletAddress
 * @param tokenMintAddress
 * @returns AssocTokenAccount PublicKey
 */
export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
) {
  const { publicKey } = await findProgramAddress(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return publicKey;
}
