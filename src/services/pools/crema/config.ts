import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";
import { poolCategories } from "services/domain/poolsCategories";

import type { LiquidityCremaPoolAddress } from "./liquidityCremaPoolAddress";
import { liquidityCremaPoolAddress } from "./liquidityCremaPoolAddress";
import { liquidityPoolCremaIds } from "./liquidityCremaPoolIds";
import { liquidityPoolTokensCrema } from "./liquidityCremaPoolTokens";

const provider = "Crema";

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
    url: "https://dex.crema.com/pools",
    isExternal: true,
  },
  {
    text: "Swap",
    type: "swap",
    url: "https://dex.crema.com/swap",
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

export const cremaPools: Record<LiquidityCremaPoolAddress, PoolConfig> = {
  [liquidityCremaPoolAddress.CREMA_mSOL_SOL]: {
    ...liquidityPoolTokensCrema[liquidityCremaPoolAddress.CREMA_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: liquidityPoolCremaIds.CREMA_mSOL_SOL,
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      category: poolCategories.LIQUIDITY,
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
  }
};
