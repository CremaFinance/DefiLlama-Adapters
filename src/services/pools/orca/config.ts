import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";

import {
  LiquidityOrcaPoolAddress,
  liquidityOrcaPoolAddress,
} from "./liquidityOrcaPoolAddress";
import {
  LiquidityOrcaPoolIds,
  liquidityOrcaPoolIds,
} from "./liquidityOrcaPoolIds";
import { liquidityPoolTokens } from "./liquidityOrcaPoolTokens";
import { OrcaPool } from "./orcaPool";

const provider = "Orca";
const orcaReward = "Emission";
const mndeReward = "Double Dip";
const actions = [
  { text: "Add Liquidity", url: "https://www.orca.so/pools" },
  { text: "Swap", url: "https://www.orca.so/pools" },
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
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 6144 },
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
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 9831 },
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
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 2457 },
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
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 29494 },
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
          dailyRate: 5634 / 7,
        },
        [coinSymbols.MNDE]: { aprDescription: mndeReward, dailyRate: 29494 },
      },
      actions,
    },
  },
};
