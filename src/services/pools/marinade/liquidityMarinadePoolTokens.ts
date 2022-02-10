import type { Token } from "../../domain/token";

import type { LiquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";
import { liquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";

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
    logoURI: "/pools/mnde.png",
    tags: ["lp-token"],
  },
};
