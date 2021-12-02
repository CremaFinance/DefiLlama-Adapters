/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "services/domain/coinSymbols";
import { MarketPools } from "services/domain/market";
import { getTokensList } from "utils/tokens-list";

import { larixPools } from "./config";
import { LarixPoolsResponse } from "./larixPool";

const fetchLarixPools = async (): Promise<LarixPoolsResponse> => {
  const response = await fetch(`https://api.projectlarix.com/market`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const mapLarixResponse = (
  larixResults: LarixPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(larixPools).map(([poolkey, incoming]) => {
    let pool = incoming;
    if (pool.providerId) {
      const result = larixResults.detail.find(
        (larixResult) => larixResult.mint_id === pool.providerId
      );

      if (result) {
        const { available_value, supply_apy, supply_distribution_apy } = result;

        pool.liq = Number(available_value);
        pool.totalLockedValue = Number(available_value);
        pool.tradingApy =
          Number(supply_apy) * 100 + Number(supply_distribution_apy) * 100;
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

export const getLarix = async (prices: Prices) => {
  const results = await fetchLarixPools();
  return mapLarixResponse(results, prices);
};

export const larix = {
  fetchPools: getLarix,
  pools: larixPools as MarketPools,
  tokenList: getTokensList(Object.values(larixPools)),
};
