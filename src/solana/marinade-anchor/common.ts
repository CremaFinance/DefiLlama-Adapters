import * as anchor from "@project-serum/anchor";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";

import { findAssociatedTokenAddress } from "../../utils/web3/find-associated-token-address";

// import JSON IDL (ts can import JSON files)
// import { toastNotification } from "../../utils/notifications";

import * as MarinadeProgramJSON from "./marinade_finance.json";

// Address of the deployed program.
export const programId = new anchor.web3.PublicKey(
  "5HeJRkxvJdYCnZuGnKrUuekFSoH1HKcrJVNPS1zZUXCt"
);
// Address of main state (instance)
export const stateAccountPubKey = new anchor.web3.PublicKey(
  "Aw8kKMxGRsBQxpPcqP45sYbTtFtYte9x42RiUWrdLUCH"
);

// Generate the program client from IDL, on the fly, in memory
export function buildProgram(provider: anchor.Provider) {
  return new anchor.Program(
    MarinadeProgramJSON as anchor.Idl,
    programId,
    provider
  );
}

//---------------------
// -- PDA -------------------
//---------------------
export async function findPDA(
  baseAddressSeed: PublicKey,
  seed: string,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  programId: PublicKey
): Promise<PublicKey> {
  const SEED_AS_BYTES = new TextEncoder().encode(seed);
  const [address] = await PublicKey.findProgramAddress(
    [baseAddressSeed.toBytes(), SEED_AS_BYTES],
    programId
  );
  return address;
}

const RESERVE_PDA_SEED = "reserve";
const LIQ_POOL_SOL_ACCOUNT_SEED = "liq_sol";
const LIQ_POOL_ST_SOL_AUTH_SEED = "liq_st_sol_authority";
const LIQ_POOL_ST_SOL_MINT_AUTH_SEED = "st_mint";
const LIQ_POOL_MINT_AUTHORITY_SEED = "liq_mint";

export async function getPDAs() {
  return {
    // compute some needed PDAs
    reservePDA: await findPDA(stateAccountPubKey, RESERVE_PDA_SEED, programId),

    liqPoolSolAccountPDA: await findPDA(
      stateAccountPubKey,
      LIQ_POOL_SOL_ACCOUNT_SEED,
      programId
    ),

    liqPoolStSolAuth: await findPDA(
      stateAccountPubKey,
      LIQ_POOL_ST_SOL_AUTH_SEED,
      programId
    ),

    liqPoolStSolMintAuth: await findPDA(
      stateAccountPubKey,
      LIQ_POOL_ST_SOL_MINT_AUTH_SEED,
      programId
    ),

    liqMintAuthority: await findPDA(
      stateAccountPubKey,
      LIQ_POOL_MINT_AUTHORITY_SEED,
      programId
    ),
  };
}

/**
 * converts SOL:number into lamports:BigInt
 * @param amount SOL
 * @returns lamports:BigInt
 */
export function SolToLamports(amount: number): JSBI {
  return JSBI.BigInt(Math.round(amount * LAMPORTS_PER_SOL));
}

/**
 * converts lamports:BigInt into SOL:number round to 5 decimals
 * @param amount
 * @returns sol:number
 */
export function LamportsToSol(amount: JSBI): number {
  return (
    JSBI.toNumber(
      JSBI.divide(
        amount,
        JSBI.divide(JSBI.BigInt(LAMPORTS_PER_SOL), JSBI.BigInt(10000))
      )
    ) / 10000
  );
}

export async function getMaxBalance(connection: Connection, pubKey: PublicKey) {
  const balance = await connection.getBalance(pubKey, "confirmed");
  if (balance === undefined) {
    // console.log(`Error getting balance: ${balance}`);
    // todo handle error
    // toastNotification({
    //   title: "Unable to get wallet balance",
    //   description: `Error getting balance: ${balance}`,
    //   status: "warning",
    // });
    throw Error("Unable to fetch balance");
  }
  // console.log(`Balance: ${balance}`);

  return balance;
}

/**
 * gets TokenAccountBalance from the associated token account
 * @param connection
 * @param mainAccount
 */
export async function getTokenBalance(
  connection: Connection,
  walletAddress: PublicKey,
  mint: PublicKey
): Promise<number | null> {
  try {
    const associatedTokenAcc = await findAssociatedTokenAddress(
      walletAddress,
      mint
    );
    const tBalance = await connection.getTokenAccountBalance(
      associatedTokenAcc
    );
    return tBalance.value.uiAmount;
  } catch (ex) {
    // console.error(ex);
    return 0;
  }
}

export function formatKDec(balance: number, dec = 1): string {
  return `${
    Math.sign(balance) * +(Math.abs(balance) / 1000).toFixed(dec)
  }K`.toString();
}

export function formatMDec(labelValue: number, dec = 2) {
  return `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(dec)}M`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(str: any) {
  // if (typeof str != 'string') return false // we only process strings!
  return (
    !Number.isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
