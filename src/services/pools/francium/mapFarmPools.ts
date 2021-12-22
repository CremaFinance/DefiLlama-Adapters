/* eslint-disable sonarjs/cognitive-complexity */
import { updatePoolRewardsFromTotalYeildFarmAPR } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { Pool } from "../../domain/pool";

import { franciumFarmPools } from "./config";
import {
  FranciumPoolsResponse,
  FranciumPoolInfoResponse,
} from "./franciumPool";
import { FarmPoolIds, farmPoolIds } from "./PoolIds";

export const mapFarmPools = (
  results: FranciumPoolsResponse,
  poolsinfo: FranciumPoolInfoResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(franciumFarmPools).map(
    ([key, incoming]) => {
      let pool = incoming;
      const ids = farmPoolIds[key as FarmPoolIds];

      if (ids.liquidityId) {
        const result = results.data.farm.find((r) => r.id === ids.liquidityId);
        const poolInfo = poolsinfo.data.find((p) => p.id === ids.infoId);
        if (result && poolInfo) {
          const { lpAmount, liquidityLocked } = result;

          pool.liq = Number(lpAmount);
          pool.totalLockedValue = Number(liquidityLocked);
          pool.tradingApy = poolInfo.tradingFeeAPR;
          pool.apy = pool.tradingApy;
          let bestBorrowApr: number;
          // leverage
          if (pool.leverage) {
            Object.keys(pool.leverage.leverageTokens).forEach((coinSymbol) => {
              const lendingPool = results.data.lend.find(
                (p) => p.id === coinSymbol
              );
              if (lendingPool && pool.leverage) {
                if (!pool.leverage?.leverageAmount) {
                  pool.leverage.leverageAmount =
                    (poolInfo.maxLeverage * poolInfo.minLeverage) /
                      pool.leverage.ratio ?? 2;
                }
                const apr =
                  lendingPool.borrowApr *
                  -1 *
                  (pool.leverage.leverageAmount - 1);
                pool.leverage.leverageTokens[coinSymbol] = {
                  borrowApr: apr,
                };
                if (!bestBorrowApr || apr > bestBorrowApr) {
                  bestBorrowApr = apr;
                  pool.leverage.selectedToken = {
                    symbol: coinSymbol,
                    borrowApr: apr,
                  };
                }
                pool.tradingApy = pool?.leverage?.leverageAmount
                  ? poolInfo.tradingFeeAPR * pool.leverage.leverageAmount
                  : poolInfo.tradingFeeAPR;
                pool.apy = pool.tradingApy + bestBorrowApr;
              }
            });
          }

          pool = updatePoolRewardsFromTotalYeildFarmAPR(
            pool as Pool,
            prices,
            poolInfo.yieldFarmingAPR,
            pool?.leverage?.leverageAmount ? pool.leverage.leverageAmount : 1
          );
        }
      }
      return { [key]: pool as Pool };
    }
  );

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};
