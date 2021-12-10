import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { Pool } from "../../domain/pool";

import { AtrixPoolsResponse } from "./atrixPool";
import { atrixPools } from "./config";

export async function fetchAtrixPools(): Promise<AtrixPoolsResponse> {
  const response = await fetch(`https://api.atrix.finance/api/tvl`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapAtrixPoolsResponse = (
  atrixResults: AtrixPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(atrixPools).map(([poolkey, incoming]) => {
    let pool = incoming;

    if (pool.providerId) {
      const result = atrixResults.farms.find(
        (atrixResult) => atrixResult.key === pool.address
      );

      if (result) {
        const { tvl, apy } = result;
        pool.liq = Number.isNaN(tvl) ? undefined : tvl;
        pool.totalLockedValue = Number.isNaN(tvl) ? undefined : tvl;
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

export const getAtrix = async (prices: Prices) => {
  const results = await fetchAtrixPools();
  return mapAtrixPoolsResponse(results, prices);
};

export const atrix = {
  fetchPools: getAtrix,
  pools: atrixPools,
};
