import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { Pool } from "../../domain/pool";

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
        pool = updatePoolRewards(pool as Pool, prices);
      }
    }
    return { [poolkey]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

export const getRaydium = async (prices: Prices) => {
  const results = await fetchRaydiumPools();
  return mapRaydiumPoolsResponse(results, prices);
};

export const raydium = {
  fetchPools: getRaydium,
  pools: raydiumPools,
};
