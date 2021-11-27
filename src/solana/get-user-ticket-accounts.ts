import { Connection, PublicKey } from "@solana/web3.js";
import { deserialize } from "borsh";
import bs58 from "bs58";
import { sha256 } from "js-sha256";

import { Keys } from "./domain/keys";
import { TicketAccount } from "./domain/ticket-account";
import * as marinade from "./marinade-anchor/marinade-finance-schema";

// From anchor code
function accountDiscriminator(name: string): Buffer {
  return Buffer.from(sha256.digest(`account:${name}`)).slice(0, 8);
}

export async function findTicketAccountsByBeneficiary(
  connection: Connection,
  marinadeId: PublicKey,
  stateId: PublicKey,
  beneficiary: PublicKey
): Promise<TicketAccount[]> {
  const data = new Uint8Array(72);
  data.set(accountDiscriminator("TicketAccountData"), 0);
  data.set(stateId.toBytes(), 8);
  data.set(beneficiary.toBytes(), 40);
  const accounts = await connection.getProgramAccounts(marinadeId, {
    filters: [
      { dataSize: 8 + 32 + 32 + 8 + 8 },
      { memcmp: { bytes: bs58.encode(data), offset: 0 } },
    ],
  });

  return accounts
    .map((account) => {
      return {
        key: account.pubkey,
        data: deserialize(
          marinade.MARINADE_BORSH_SCHEMA,
          marinade.TicketAccountData,
          account.account.data.slice(8)
        ),
      } as TicketAccount;
    })
    .sort((a, b) => -a.data.created_epoch.cmp(b.data.created_epoch));
}

// eslint-disable-next-line consistent-return
export async function getUserTicketAccounts(
  keys: Keys,
  walletConnected: boolean,
  connection: Connection,
  walletPubKey: PublicKey
) {
  try {
    return await findTicketAccountsByBeneficiary(
      connection,
      keys.marinadeProgramId,
      keys.marinadeStateId,
      walletPubKey
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
