import { Connection, PublicKey } from "@solana/web3.js";

import { findStakeAccountsByOwner } from "./find-stake-accounts-by-owner";

// eslint-disable-next-line consistent-return
export async function getUserStakeAccounts(
  connection: Connection,
  walletPubKey: PublicKey
) {
  try {
    return await findStakeAccountsByOwner(connection, walletPubKey);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
