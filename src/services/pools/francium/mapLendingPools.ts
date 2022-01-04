import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { Pool } from "../../domain/pool";

import { franciumLendingPools } from "./config";
import { FranciumPoolsResponse } from "./franciumPool";

export const mapLendingPools = (
  franciumResults: FranciumPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(franciumLendingPools).map(
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
