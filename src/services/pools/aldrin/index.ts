import type { Prices } from "../../domain/coinSymbols";
import type { Pool } from "../../domain/pool";

import type { AldrinPoolsResponse } from "./aldrinPool";
import { aldrinPools } from "./config";

export async function fetchAldrinPools(): Promise<AldrinPoolsResponse> {
  const response = await fetch(
    `https://api.aldrin.com/api/amm/v1/poolsInfoExtended`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapAldrinPoolsResponse = (
  aldrinResults: AldrinPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(aldrinPools).map(([poolkey, incoming]) => {
    const pool = incoming;

    if (pool.providerId) {
      const result = aldrinResults.find(
        (aldrinResult) => aldrinResult.providerId === pool.providerId
      );

      if (result && prices) {
        const { tvlUSD, tradingAPY, famingAPY, rewards } = result;
        pool.liq = Number.isNaN(tvlUSD) ? undefined : tvlUSD;
        pool.totalLockedValue = Number.isNaN(tvlUSD) ? undefined : tvlUSD;
        pool.tradingApy = tradingAPY;
        pool.apy = tradingAPY + famingAPY;
        pool.rewards = rewards;
      }
    }
    return { [poolkey]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

export const getAldrin = async (prices: Prices) => {
  const results = await fetchAldrinPools();
  return mapAldrinPoolsResponse(results, prices);
};

export const aldrin = {
  fetchPools: getAldrin,
  pools: aldrinPools,
};
