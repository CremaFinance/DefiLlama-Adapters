import { StableSwap } from "@saberhq/stableswap-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { request, gql } from "graphql-request";

import { APYFromAPR } from "../../../utils/apy-from-apr";
import { updatePoolQuarryRewards } from "../../../utils/update-pool-quarry-rewards";
import { DEFAULT_ENDPOINT } from "../../../utils/web3/endpoints";
import type { Prices } from "../../domain/coinSymbols";
import type { FetchPools, Pool } from "../../domain/pool";

import type { SaberPoolsResponse } from "./config";
import { saberPools } from "./config";
import { farmPoolAddress } from "./PoolAddress";

// note: only works on mainnet
const connection = new Connection(DEFAULT_ENDPOINT.endpoint, "recent");

const STATS_QUERY = gql`
  query AllPoolStats {
    pools {
      ammId
      name
      coin {
        chainId
        address
        name
        decimals
        symbol
        logoURI
      }
      pc {
        chainId
        address
        name
        decimals
        symbol
        logoURI
      }
      lp {
        chainId
        address
        name
        decimals
        symbol
        logoURI
      }
      stats {
        tvl_pc
        tvl_coin
        price
        vol24h
      }
    }
  }
`;

export async function fetchPools(): Promise<{
  saberData: SaberPoolsResponse;
  apr: number | undefined;
}> {
  const saberData = await request<SaberPoolsResponse>(
    "https://saberqltest.aleph.cloud/",
    STATS_QUERY
  );

  const swap = saberPools[farmPoolAddress.saber_mSOL_SOL].providerId
    ? await StableSwap.load(
        connection,
        new PublicKey(
          saberPools[farmPoolAddress.saber_mSOL_SOL].providerId ?? ""
        )
      )
    : undefined;

  return { saberData, apr: swap?.state.fees.trade.asFraction.asNumber };
}

export const mapSaberPoolsResponse = async (
  saberData: SaberPoolsResponse,
  prices: Prices,
  apr?: number
) => {
  let pool = { ...saberPools[farmPoolAddress.saber_mSOL_SOL] };
  const tokenAPrice = prices[pool.tokenA]?.usd;
  const tokenBPrice = pool.tokenB ? prices[pool.tokenB]?.usd : undefined;
  const result = saberData.pools.find((p) => p.lp.address === pool.address);

  if (
    result &&
    result.stats.tvl_coin &&
    result.stats.tvl_pc &&
    tokenAPrice &&
    tokenBPrice
  ) {
    pool.liq =
      result.stats.tvl_coin * tokenAPrice + result.stats.tvl_pc * tokenBPrice;

    pool.totalLockedValue = pool.liq;

    const vol24HUSD = result.stats.vol24h
      ? result.stats.vol24h * tokenAPrice
      : 0;
    const fees24HUSD = apr ? vol24HUSD * apr : 0;
    pool.tradingApy = APYFromAPR(fees24HUSD / pool.liq);
    pool.apy = pool.tradingApy;
    pool = await updatePoolQuarryRewards(pool as Pool, prices);
  }

  return { [farmPoolAddress.saber_mSOL_SOL]: pool as Pool };
};

export const getSaber: FetchPools = async (prices) => {
  const { saberData, apr } = await fetchPools();
  // eslint-disable-next-line @typescript-eslint/return-await
  return await mapSaberPoolsResponse(saberData, prices, apr);
};

export const saber = {
  fetchPools: getSaber,
  pools: saberPools,
};
