/* eslint-disable sonarjs/cognitive-complexity */
import { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";
import { LendingPoolIds } from "services/domain/lendingPoolIds";
import { MarketPools } from "services/domain/market";
import { getTokensList } from "utils/tokens-list";

import { PortPoolsResponse, portPools } from "./config";
import { PortReserveResponse } from "./portPool";

const fetchPortPools = async (): Promise<PortPoolsResponse> => {
  const response = await fetch(
    `https://api-v1.port.finance/activeStakingPools`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const fetchPortReserve = async (): Promise<PortReserveResponse> => {
  const response = await fetch(
    `https://api-v1.port.finance/reserve/9gDF5W94RowoDugxT8cM29cX8pKKQitTp2uYVrarBSQ7`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const mapPortResponse = (
  portResults: PortPoolsResponse,
  reserve: PortReserveResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(portPools).map(([poolkey, incoming]) => {
    const pool = incoming;
    if (pool.providerId) {
      const result = portResults[pool.providerId as LendingPoolIds];

      // todo refactor this if more pools from port are added (should call reserve fetch here)
      if (result) {
        const { poolSize } = result;
        const { depositApy } = reserve;
        const tokenA =
          Number(poolSize) / (1 * 10) ** coinTokens[pool.tokenA].decimals;
        const tokenAprice = prices[pool.tokenA]?.usd;
        if (tokenAprice) {
          pool.liq = tokenA * tokenAprice;
          pool.totalLockedValue = tokenA * tokenAprice;
          pool.apy = Number(depositApy.slice(0, -1));

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

export const getPort = async (prices: Prices) => {
  const [reserve, results] = await Promise.all([
    fetchPortReserve(),
    fetchPortPools(),
  ]);
  return mapPortResponse(results, reserve, prices);
};

export const port = {
  fetchPools: getPort,
  pools: portPools as MarketPools,
  tokenList: getTokensList(Object.values(portPools)),
};
