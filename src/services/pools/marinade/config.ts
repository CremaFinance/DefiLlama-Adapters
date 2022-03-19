import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";
import MarinadePoolRowExtension from "components/molecules/MarinadePoolRowExtension";
import MsolSolLPRowExtension from "components/molecules/MsolSolLPRowExtension";

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
      componentAction: "mSOLSOLLiquidityModal",
    },
  },
  [liquidityMarinadePoolAddress.MSOL_FARM]: {
    ...liquidityPoolTokensMarinade[liquidityMarinadePoolAddress.MSOL_FARM],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolMarinadeIds.MSOL_FARM,
      tokenA: coinSymbols.mSOL,
      actions,
      RowExtensionComponent: MarinadePoolRowExtension,
      componentAction: "mSOLStakeModal",
    },
  },
  [liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP_FARM]: {
    ...liquidityPoolTokensMarinade[
      liquidityMarinadePoolAddress.MNDE_mSOL_SOL_LP_FARM
    ],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolMarinadeIds.MNDE_mSOL_SOL_LP_FARM,
      tokenA: "mSOL-SOL-LP",
      actions,
    },
    RowExtensionComponent: MsolSolLPRowExtension,
    componentAction: "mSolSolLPFarmModal",
  },
};
