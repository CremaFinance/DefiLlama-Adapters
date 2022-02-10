import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { LiquidityOrcaPoolAddress } from "./liquidityOrcaPoolAddress";
import { liquidityOrcaPoolAddress } from "./liquidityOrcaPoolAddress";
import type { LiquidityOrcaPoolIds } from "./liquidityOrcaPoolIds";
import { liquidityOrcaPoolIds } from "./liquidityOrcaPoolIds";
import { liquidityPoolTokens } from "./liquidityOrcaPoolTokens";
import type { OrcaPool } from "./orcaPool";

const provider = "Orca";
const orcaReward = "Emission";
const mndeReward = "Double Dip";
const actions = [
  { text: "Add Liquidity", url: "https://www.orca.so/pools", isExternal: true },
];

export type OrcaPoolsResponse = Record<LiquidityOrcaPoolIds, OrcaPool>;

export const orcaPools: Record<LiquidityOrcaPoolAddress, PoolConfig> = {
  [liquidityOrcaPoolAddress.ORCA_mSOL_SOL]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 17205.38721 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_BTC_mSOL]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_BTC_mSOL],
    ...{
      marketType: marketTypes.LP,
      provider,
      providerId: liquidityOrcaPoolIds.ORCA_BTC_mSOL,
      tokenA: coinSymbols.BTC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 34410.77441 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_MNDE_mSOL]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_MNDE_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_MNDE_mSOL,
      tokenA: coinSymbols.MNDE,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 1408 / 7,
        },
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 17205.38721 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDT]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,

      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2817 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDC]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_mSOL_USDC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 776.57,
        },
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 94629.62963 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_ORCA_mSOL]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_ORCA_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_ORCA_mSOL,
      tokenA: coinSymbols.ORCA,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 1359 / 7,
        },
      },
      actions,
    },
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_whETH]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_mSOL_whETH],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_mSOL_whETH,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.ETH,
      rewards: {
        [coinSymbols.ORCA]: {
          aprDescription: orcaReward,
          dailyRate: 2718 / 7,
        },
        [coinSymbols.MNDE]: {
          aprDescription: mndeReward,
          dailyRate: 34410.77441 / 7,
        },
      },
      actions,
    },
  },
};
