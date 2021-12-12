/* eslint-disable @typescript-eslint/naming-convention */
import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Pool } from "../../domain/pool";
import { Prices } from "services/domain/coinSymbols";

import { franciumPools } from "./config";
import { FranciumPoolsResponse } from "./franciumPool";

const fetchFranciumPools = async (): Promise<FranciumPoolsResponse> => {
  const response = await fetch(`https://francium.io/api/pools/liquidity`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const mapFranciumResponse = (
  franciumResults: FranciumPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(franciumPools).map(
    ([poolkey, incoming]) => {
      let pool = incoming;
      if (pool.providerId) {
        const result = franciumResults.data.lend.find(
          (franciumResult) => franciumResult.id === pool.providerId
        );

        if (result) {
          const { liquidityLocked, apy, available } = result;

          pool.liq = Number(available);
          pool.totalLockedValue = Number(liquidityLocked);
          pool.tradingApy = Number(apy);
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

export const getFrancium = async (prices: Prices) => {
  const results = await fetchFranciumPools();
  return mapFranciumResponse(results, prices);
};

export const francium = {
  fetchPools: getFrancium,
  pools: franciumPools,
};
