import { getTokensList } from "../../../utils/tokens-list";
import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { MarketPools } from "../../domain/market";

import { raydiumPools } from "./config";
import { RaydiumPoolsResponse } from "./raydiumPool";

export async function fetchRaydiumPools(): Promise<RaydiumPoolsResponse> {
  const response = await fetch(`https://api.raydium.io/pairs`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapRaydiumPoolsResponse = (
  raydiumResults: RaydiumPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(raydiumPools).map(([poolkey, incoming]) => {
    let pool = incoming;

    if (pool.providerId) {
      const result = raydiumResults.find(
        (raydiumResult) => raydiumResult.name === pool.providerId
      );

      if (result) {
        const { liquidity, apy } = result;
        pool.liq = Number.isNaN(liquidity) ? undefined : liquidity;
        pool.totalLockedValue = Number.isNaN(liquidity) ? undefined : liquidity;
        pool.tradingApy = Number(apy);
        pool.apy = pool.tradingApy;
        pool = updatePoolRewards(pool, prices);
      }
    }
    return { [poolkey]: pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {}) as MarketPools;
};

export const getRaydium = async (prices: Prices) => {
  const results = await fetchRaydiumPools();
  return mapRaydiumPoolsResponse(results, prices);
};

export const raydium = {
  fetchPools: getRaydium,
  pools: raydiumPools as MarketPools,
  tokenList: getTokensList(Object.values(raydiumPools)),
};
