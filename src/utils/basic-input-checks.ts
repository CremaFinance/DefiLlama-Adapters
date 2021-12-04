/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from "@chakra-ui/react";

export function checkIsPositive(value: number) {
  if (!Number.isNaN(value) || value <= 0.0001) {
    const toast = useToast();
    toast({
      title: "Invalid amount",
      description: "Please input a valid amount",
      status: "warning",
    });
    return false;
  }
  return true;
}

export function checkWallet(isWalletConnected: boolean): boolean {
  if (!isWalletConnected) {
    const toast = useToast();
    toast({
      title: "Wallet is not connected",
      description: "Please connect your wallet",
      status: "warning",
    });
    return false;
  }
  return true;
}

export function basicInputChecks(
  value: number,
  isWalletConnected: boolean
): boolean {
  if (!checkWallet(isWalletConnected)) return false;
  if (!checkIsPositive(value)) return false;
  return true;
}
