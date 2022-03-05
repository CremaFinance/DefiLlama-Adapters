/* eslint-disable sonarjs/cognitive-complexity */
import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import type { Pool } from "../../domain/pool";
import type { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";

import { portPools } from "./config";
import type { PortReserveResponse, PortPoolsResponse } from "./portPool";

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
    let pool = incoming;
    if (pool.providerId) {
      const result = portResults.find(
        (portResult) => portResult.poolId === pool.providerId
      );

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
          pool.tradingApy = Number(depositApy.slice(0, -1));
          pool.apy = pool.tradingApy;

          pool = updatePoolRewards(pool as Pool, prices);
        }
      }
    }
    return { [poolkey]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
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
  pools: portPools,
};
