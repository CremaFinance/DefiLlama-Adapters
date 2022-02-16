import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";
import MarinadePoolRowExtension from "components/molecules/MarinadePoolRowExtension";

import type { LiquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";
import { liquidityMarinadePoolAddress } from "./liquidityMarinadePoolAddress";
import type { LiquidityPoolMarinadeIds } from "./liquidityMarinadePoolIds";
import { liquidityPoolMarinadeIds } from "./liquidityMarinadePoolIds";
import { liquidityPoolTokensMarinade } from "./liquidityMarinadePoolTokens";
import type { MarinadePool } from "./marinadePool";

const provider = "Marinade";
const actions = [
  {
    text: "Manage deposit",
    url: "https://marinade.finance",
    isExternal: false,
  },
];

export type MarinadePoolsResponse = Record<
  LiquidityPoolMarinadeIds,
  MarinadePool
>;

export const marinadePools: Record<LiquidityMarinadePoolAddress, PoolConfig> = {
  [liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP]: {
    ...liquidityPoolTokensMarinade[
      liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolMarinadeIds.MNDE_mSOL_SOL_LP,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.MNDE]: {
          aprDescription: "daily MNDE",
          dailyRate: 51616.16162 / 7,
        },
      },
      actions,
      RowExtensionComponent: MarinadePoolRowExtension,
    },
  },
};
