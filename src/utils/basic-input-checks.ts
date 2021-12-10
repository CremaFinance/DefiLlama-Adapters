import { UseToastOptions } from "@chakra-ui/react";

export function checkIsPositive(value: number): UseToastOptions | undefined {
  if (Number.isNaN(value) || value <= 0.0001) {
    return {
      title: "Invalid amount",
      description: "Please input a valid amount",
      status: "warning",
    };
  }
  return undefined;
}

export function checkWallet(
  isWalletConnected: boolean
): UseToastOptions | undefined {
  if (!isWalletConnected) {
    return {
      title: "Wallet is not connected",
      description: "Please connect your wallet",
      status: "warning",
    };
  }
  return undefined;
}

export function basicInputChecks(
  value: number,
  isWalletConnected: boolean
): UseToastOptions | undefined {
  const isWalletConnectedError = checkWallet(isWalletConnected);
  if (isWalletConnectedError) return isWalletConnectedError;
  const isPositiveError = checkIsPositive(value);
  if (isPositiveError) return isPositiveError;
  return undefined;
}
