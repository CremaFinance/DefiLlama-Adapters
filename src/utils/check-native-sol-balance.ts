import { UseToastOptions } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { format5Dec } from "./number-to-short-version";

const BUFFER = LAMPORTS_PER_SOL / 100; // 0.01 SOL

export function checkNativeSOLBalance(
  nativeSOLBalance: number,
  fundsNeeded: number
): UseToastOptions | undefined {
  const title = "Insufficient funds to run transaction";
  const warning = "warning";

  if (fundsNeeded > nativeSOLBalance) {
    return {
      title,
      description: `You need at least ${format5Dec(
        fundsNeeded + BUFFER,
        LAMPORTS_PER_SOL
      )} SOL to run the transaction (you have only ${
        nativeSOLBalance && format5Dec(nativeSOLBalance, LAMPORTS_PER_SOL)
      })`,
      status: warning,
    };
  }

  if (fundsNeeded > nativeSOLBalance - BUFFER) {
    return {
      title,
      description: `Marinade requires a minimum remaining balance of 0.01 SOL to allow for further transactions. You need at least ${format5Dec(
        fundsNeeded + BUFFER,
        LAMPORTS_PER_SOL
      )} SOL to run the transaction (you have only ${
        nativeSOLBalance && format5Dec(nativeSOLBalance, LAMPORTS_PER_SOL)
      })`,
      status: warning,
    };
  }

  return undefined;
}
