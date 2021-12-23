import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import { PoolConfig } from "../../domain/pool";
import { orcaPools } from "../orca/config";
import { liquidityOrcaPoolAddress } from "../orca/liquidityOrcaPoolAddress";

import {
  farmPoolAddress,
  FarmPoolAddress,
  LendingPoolAddress,
  lendingPoolAddress,
} from "./PoolAddress";
import { lendingPoolIds } from "./PoolIds";
import { farmPoolTokens, lendingPoolTokens } from "./PoolTokens";

const provider = "Francium";
const lendActions = [
  { text: "Supply", url: "https://francium.io/app/lend", isExternal: true },
  { text: "Borrow", url: "https://francium.io/app/lend", isExternal: true },
];
const farmActions = [
  { text: "Add Liquidity", url: "https://francium.io/app/invest/farm" },
  { text: "Swap", url: "https://francium.io/app/invest/farm" },
];

export const franciumFarmPools: Record<FarmPoolAddress, PoolConfig> = {
  [farmPoolAddress.FRANCIUM_ORCA_BTC_mSOL]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_BTC_mSOL])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_BTC_mSOL],
    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.mSOL]: undefined,
          [coinSymbols.BTC]: undefined,
        },
      },
    },
  },

  [farmPoolAddress.FRANCIUM_ORCA_mSOL_SOL]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_mSOL_SOL])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.mSOL]: undefined,
          [coinSymbols.SOL]: undefined,
        },
      },
    },
  },

  [farmPoolAddress.FRANCIUM_ORCA_ORCA_mSOL]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_ORCA_mSOL])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_ORCA_mSOL],
    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.mSOL]: undefined,
          [coinSymbols.ORCA]: undefined,
        },
      },
    },
  },

  [farmPoolAddress.FRANCIUM_ORCA_mSOL_USDC]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_mSOL_USDC])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_mSOL_USDC],

    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.USDC]: undefined,
          [coinSymbols.mSOL]: undefined,
        },
      },
    },
  },

  [farmPoolAddress.FRANCIUM_ORCA_mSOL_USDT]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_mSOL_USDT])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.USDT]: undefined,
          [coinSymbols.mSOL]: undefined,
        },
      },
    },
  },

  [farmPoolAddress.FRANCIUM_ORCA_mSOL_whETH]: {
    ...JSON.parse(
      JSON.stringify(orcaPools[liquidityOrcaPoolAddress.ORCA_mSOL_whETH])
    ),
    ...farmPoolTokens[farmPoolAddress.FRANCIUM_ORCA_mSOL_whETH],
    ...{
      provider,
      marketType: marketTypes.Leveraged,
      actions: farmActions,
      leverage: {
        ratio: 2,
        leverageTokens: {
          [coinSymbols.mSOL]: undefined,
          [coinSymbols.ETH]: undefined,
        },
      },
    },
  },
};

export const franciumLendingPools: Record<LendingPoolAddress, PoolConfig> = {
  [lendingPoolAddress.FRANCIUM_mSOL]: {
    ...lendingPoolTokens[lendingPoolAddress.FRANCIUM_mSOL],
    ...{
      provider,
      marketType: marketTypes.Lending,
      providerId: lendingPoolIds.FRANCIUM_mSOL,
      tokenA: coinSymbols.mSOL,
      rewards: {
        [coinSymbols.MNDE]: { aprDescription: "Emission", dailyRate: 13736 },
      },
      actions: lendActions,
    },
  },
};
