import type { UseToastOptions } from "@chakra-ui/react";

export function checkMNDEBalance(
  mndeBalance: number,
  fundsNeeded: number
): UseToastOptions | undefined {
  if (fundsNeeded > mndeBalance) {
    return {
      title: "Insufficient funds to run transaction",
      description: `You need at least ${fundsNeeded} MNDE to run the transaction (you have only ${mndeBalance})`,
      status: "warning",
    };
  }

  return undefined;
}
