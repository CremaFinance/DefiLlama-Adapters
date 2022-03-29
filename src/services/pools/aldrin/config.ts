import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";

import type { LiquidityAldrinPoolAddress } from "./liquidityAldrinPoolAddress";
import { liquidityAldrinPoolAddress } from "./liquidityAldrinPoolAddress";
import { liquidityPoolAldrinIds } from "./liquidityAldrinPoolIds";
import { liquidityPoolTokensAldrin } from "./liquidityAldrinPoolTokens";

const provider = "Aldrin";

type ActionType = "add_liquidity" | "swap";

type RawAction = {
  text: string;
  type: ActionType;
  url: string;
  isExternal: boolean;
};

const actions: RawAction[] = [
  {
    text: "Add Liquidity",
    type: "add_liquidity",
    url: "https://dex.aldrin.com/pools",
    isExternal: true,
  },
  {
    text: "Swap",
    type: "swap",
    url: "https://dex.aldrin.com/swap",
    isExternal: true,
  },
];

export const getActionUrl = ({
  tokenA,
  tokenB,
  type,
  actionBaseUrl,
}: {
  tokenA: PoolConfig["tokenA"];
  tokenB: PoolConfig["tokenB"];
  type: ActionType;
  actionBaseUrl: string;
}) => {
  return type === "add_liquidity"
    ? `${actionBaseUrl}/${tokenA}_${tokenB}`
    : `${actionBaseUrl}?base=${tokenA}&quote=${tokenB}`;
};

export const aldrinPools: Record<LiquidityAldrinPoolAddress, PoolConfig> = {
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_SOL]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.SOL,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_USDC]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_USDC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_USDC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDC,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.USDC,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_USDT]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_USDT],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_USDT,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.USDT,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.USDT,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_MNGO]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_MNGO],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_MNGO,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.MNGO,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.MNGO,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_ETH]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_ETH],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_ETH,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.ETH,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.ETH,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_BTC]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_BTC],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_BTC,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.BTC,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.BTC,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_NEAR]: {
    ...liquidityPoolTokensAldrin[liquidityAldrinPoolAddress.ALDRIN_mSOL_NEAR],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolAldrinIds.ALDRIN_mSOL_NEAR,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.NEAR,
      actions: actions.map((action) => ({
        text: action.text,
        url: getActionUrl({
          tokenA: coinSymbols.mSOL,
          tokenB: coinSymbols.NEAR,
          type: action.type,
          actionBaseUrl: action.url,
        }),
        isExternal: action.isExternal,
      })),
    },
  },
};
