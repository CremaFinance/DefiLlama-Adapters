import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { Prices } from "../../domain/coinSymbols";
import { FetchPools, Pool } from "../../domain/pool";

import { saberPools, SaberPoolResponse } from "./config";
import { farmPoolAddress } from "./PoolAddress";

export const mapSaberPoolsResponse = (
  saberData: SaberPoolResponse,
  prices: Prices
) => {
  let pool = { ...saberPools[farmPoolAddress.saber_mSOL_SOL] };
  const tokenAPrice = prices[pool.tokenA]?.usd;
  const tokenBPrice = prices[pool.tokenA]?.usd;
  if (saberData && tokenAPrice && tokenBPrice) {
    pool.liq =
      saberData.mSolBalance * tokenAPrice + saberData.solBalance * tokenBPrice;

    pool.totalLockedValue = pool.liq;
    pool.tradingApy = 1;
    pool.apy = 1;
    pool = updatePoolRewards(pool as Pool, prices);
  }

  return { [farmPoolAddress.saber_mSOL_SOL]: pool as Pool };
};

export const getSaber: FetchPools = async (prices, options) => {
  const saberData = options?.saberData as SaberPoolResponse;
  return mapSaberPoolsResponse(saberData, prices);
};

export const saber = {
  fetchPools: getSaber,
  pools: saberPools,
};
