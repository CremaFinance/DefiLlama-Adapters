/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";
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
    const pool = incoming;
    if (pool.providerId) {
      const result = larixResults.detail.find(
        (larixResult) => larixResult.mint_id === pool.providerId
      );

      // todo refactor this if more pools from larix are added (should call reserve fetch here)
      if (result) {
        const { available_value } = result;
        const { borrow_apy } = result;
        const tokenA =
          Number(available_value) /
          (1 * 10) ** coinTokens[pool.tokenA].decimals;
        const tokenAprice = prices[pool.tokenA]?.usd;

        if (tokenAprice) {
          pool.liq = tokenA * tokenAprice;
          pool.totalLockedValue = tokenA * tokenAprice;
          pool.tradingApy = Number(borrow_apy);
          pool.apy = Number(pool.tradingApy);

          if (pool.rewards) {
            Object.entries(pool.rewards).forEach((entry) => {
              const [key, reward] = entry;
              const price = prices[key]?.usd;
              if (price && reward && pool.liq) {
                reward.apy =
                  ((reward.dailyRate * price * 365) / pool.liq) * 100;
                pool.apy = pool.apy ? (pool.apy += reward.apy) : undefined;
              }
            });
          }
        }
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
