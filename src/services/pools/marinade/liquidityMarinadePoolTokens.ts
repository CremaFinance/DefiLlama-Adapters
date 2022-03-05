import type { Token } from "../../domain/token";

import type { LiquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";
import { liquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";

const logoURI = "/pools/mnde.png";

export const liquidityPoolTokensMarinade: Record<
  LiquidityMarinadePoolAddress,
  Token
> = {
  [liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP]: {
    chainId: 101,
    address: "Ce9AfYapbQRzJKLjvfXbKLivrjmcrvZgYfGo8uyCARLB",
    symbol: "mSO-SOL-LP",
    name: "MNDE mSOL/SOL",
    decimals: 9,
    logoURI,
    tags: ["lp-token"],
  },
  [liquidityMarinadePoolAddress.MSOL_FARM]: {
    chainId: 101,
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7SoFARM",
    symbol: "mSOL",
    name: "Marinade staked SOL (mSOL) Farm",
    decimals: 9,
    logoURI,
    tags: [],
  },
  [liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP_FARM]: {
    chainId: 101,
    address: "Ce9AfYapbQRzJKLjvfXbKLivrjmcrvZgYfGo8uyCARLBFARM",
    symbol: "mSOL",
    name: "mSOL/SOL LP Farm",
    decimals: 9,
    logoURI,
    tags: [],
  },
};
