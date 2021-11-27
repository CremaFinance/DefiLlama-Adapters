import { coinSymbols } from "../../domain/coinSymbols";
import {
  LiquidityPoolAddressOrca,
  liquidityPoolAddressOrca,
} from "../../domain/liquidityPoolAddress";
import {
  LiquidityPoolOrcaIds,
  liquidityPoolOrcaIds,
} from "../../domain/liquidityPoolIds";
import { liquidityPoolTokens } from "../../domain/liquidityPoolTokens";
import { marketTypes } from "../../domain/marketTypes";
import { Pool } from "../../domain/pool";

import { OrcaPool } from "./orcaPool";

const provider = "Orca";
const actions = [
  { text: "Add Liquidity", url: "https://www.orca.so/pools" },
  { text: "Swap", url: "https://www.orca.so/pools" },
];

export type OrcaPoolsResponse = Record<LiquidityPoolOrcaIds, OrcaPool>;

export const orcaPools: Record<LiquidityPoolAddressOrca, Pool> = {
  // only  this first one is fully configured right now
  [liquidityPoolAddressOrca.ORCA_mSOL_SOL]: {
    ...liquidityPoolTokens[liquidityPoolAddressOrca.ORCA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolOrcaIds.ORCA_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.ORCA]: { dailyRate: ((0.125 / 20) * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 6144 },
      },
      actions,
    },
  },
  [liquidityPoolAddressOrca.ORCA_BTC_mSOL]: {
    ...liquidityPoolTokens[liquidityPoolAddressOrca.ORCA_BTC_mSOL],
    ...{
      marketType: marketTypes.LP,
      provider,
      providerId: liquidityPoolOrcaIds.ORCA_BTC_mSOL,
      tokenA: coinSymbols.BTC,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 9831 },
      },
      actions,
    },
  },
  [liquidityPoolAddressOrca.ORCA_MNDE_mSOL]: {
    ...liquidityPoolTokens[liquidityPoolAddressOrca.ORCA_MNDE_mSOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolOrcaIds.ORCA_MNDE_mSOL,
      tokenA: coinSymbols.MNDE,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 2457 },
      },
      actions,
    },
  },
  [liquidityPoolAddressOrca.ORCA_mSOL_USDT]: {
    ...liquidityPoolTokens[liquidityPoolAddressOrca.ORCA_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolOrcaIds.ORCA_mSOL_USDT,
      tokenA: coinSymbols.USDT,
      tokenB: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.ORCA]: undefined, // { dailyRate: (0 * 450000 * 52) / 365 },
        [coinSymbols.MNDE]: { dailyRate: 29494 },
      },
      actions,
    },
  },
  [liquidityPoolAddressOrca.ORCA_mSOL_USDC]: {
    ...liquidityPoolTokens[liquidityPoolAddressOrca.ORCA_mSOL_USDC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolOrcaIds.ORCA_mSOL_USDC,
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
