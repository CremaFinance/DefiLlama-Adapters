import { getTokensList } from "../../../utils/tokens-list";
import { updatePool } from "../../../utils/update-pool";
import { Prices } from "../../domain/coinSymbols";
import { MarketPools } from "../../domain/market";

import { orcaPools, OrcaPoolsResponse } from "./config";
import { LiquidityOrcaPoolIds } from "./liquidityOrcaPoolIds";

export async function fetchOrcaPools(): Promise<OrcaPoolsResponse> {
  const response = await fetch(`https://api.orca.so/allpools`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapOrcaPoolsResponse = (
  orcaResults: OrcaPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(orcaPools).map(([key, incoming]) => {
    let pool = incoming;
    if (pool.providerId) {
      const result = orcaResults[pool.providerId as LiquidityOrcaPoolIds]; // map
      if (result) {
        const { tokenAAmount, tokenBAmount, apy } = result;
        pool = updatePool(pool, prices, tokenAAmount, tokenBAmount, apy.day);
      }
    }
    return { [key]: pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {}) as MarketPools;
};

export const getOrca = async (prices: Prices) => {
  const results = await fetchOrcaPools();
  return mapOrcaPoolsResponse(results, prices);
};

export const orca = {
  fetchPools: getOrca,
  pools: orcaPools as MarketPools,
  tokenList: getTokensList(Object.values(orcaPools)),
};
