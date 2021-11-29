import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

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
const actions = [
  { text: "Add Liquidity", url: "https://www.orca.so/pools" },
  { text: "Swap", url: "https://www.orca.so/pools" },
];

export type OrcaPoolsResponse = Record<LiquidityOrcaPoolIds, OrcaPool>;

export const orcaPools: Record<LiquidityOrcaPoolAddress, Pool> = {
  // only  this first one is fully configured right now
  [liquidityOrcaPoolAddress.ORCA_mSOL_SOL]: {
    ...liquidityPoolTokens[liquidityOrcaPoolAddress.ORCA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityOrcaPoolIds.ORCA_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.ORCA]: { dailyRate: ((0.125 / 20) * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 6144 },
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
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 9831 },
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
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 2457 },
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
      tokenA: coinSymbols.USDT,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 29494 },
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
      tokenA: coinSymbols.USDC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 29494 },
      },
      actions,
    },
  },
};
