import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { FetchPools, Pool } from "../../domain/pool";

import { marinadePools } from "./config";
import { MarinadePool } from "./marinadePool";

export async function fetchMarinadePools(): Promise<MarinadePool> {
  const response = await fetch(`https://api.marinade.finance/lp/apy/7d`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapMarinadePoolsResponse = (
  marinadeResults: MarinadePool,
  prices: Prices,
  options: Record<string, unknown> | undefined
) => {
  const poolsArray = Object.entries(marinadePools).map(
    ([poolkey, incoming]) => {
      let pool = incoming;
      if (pool.providerId) {
        const result = marinadeResults;
        if (result) {
          const { value } = result;
          pool.liq = Number.isNaN(value) ? undefined : value;
          pool.totalLockedValue = Number.isNaN(options?.tvl)
            ? undefined
            : Number(options?.tvl);
          pool.tradingApy = Number(value) * 100;
          pool.apy = pool.tradingApy;
          pool = updatePoolRewards(pool as Pool, prices);
        }
      }
      return { [poolkey]: pool as Pool };
    }
  );

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

export const getMarinade: FetchPools = async (prices, options) => {
  const results = await fetchMarinadePools();
  return mapMarinadePoolsResponse(results, prices, options);
};

export const marinade = {
  fetchPools: getMarinade,
  pools: marinadePools,
};
