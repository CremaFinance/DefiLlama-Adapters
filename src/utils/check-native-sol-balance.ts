import { UseToastOptions } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { format5Dec } from "./number-to-short-version";

export function checkNativeSOLBalance(
  nativeSOLBalance: number,
  fundsNeeded: number
): UseToastOptions | undefined {
  if (fundsNeeded > nativeSOLBalance) {
    return {
      title: "Insufficient funds to run transaction",
      description: `You need at least ${format5Dec(
        fundsNeeded + 1e4,
        LAMPORTS_PER_SOL
      )} SOL to run transaction (have only ${
        nativeSOLBalance && format5Dec(nativeSOLBalance, LAMPORTS_PER_SOL)
      })`,
      status: "warning",
    };
  }
  return undefined;
}
