import { Connection, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

import { STAKE_PROGRAM_ID } from "./ids";

export async function findStakeAccountsByOwner(
  connection: Connection,
  owner: PublicKey
): Promise<unknown[]> {
  // const data = new Uint8Array(32 + 8 + 8 + 32)
  // LMT, some stake-accounts have lockup.custodian set even if lockup.timestamp=0 & lockup.epoch=0 (Solflare dos that)
  const data = new Uint8Array(32);
  data.set(owner.toBytes(), 0);

  return connection.getParsedProgramAccounts(new PublicKey(STAKE_PROGRAM_ID), {
    filters: [
      {
        memcmp: {
          bytes: bs58.encode(new Uint8Array([2, 0, 0, 0])),
          offset: 0,
        },
      },
      { memcmp: { bytes: bs58.encode(data), offset: 44 } },
    ],
  });
}
