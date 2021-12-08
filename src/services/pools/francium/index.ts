/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "services/domain/coinSymbols";
import { MarketPools } from "services/domain/market";
import { getTokensList } from "utils/tokens-list";

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
          const { available, apy, liquidityLocked } = result;

          pool.liq = Number(available);
          pool.totalLockedValue = Number(available);
          pool.tradingApy = Number(apy) * 100 + Number(liquidityLocked) * 100;
          pool.apy = pool.tradingApy;
          pool = updatePoolRewards(pool, prices);
        }
      }
      return { [poolkey]: pool };
    }
  );

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {}) as MarketPools;
};

export const getFrancium = async (prices: Prices) => {
  const results = await fetchFranciumPools();
  return mapFranciumResponse(results, prices);
};

export const francium = {
  fetchPools: getFrancium,
  pools: franciumPools as MarketPools,
  tokenList: getTokensList(Object.values(franciumPools)),
};
