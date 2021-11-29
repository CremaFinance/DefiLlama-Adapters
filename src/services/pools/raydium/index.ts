import { getTokensList } from "../../../utils/tokens-list";
import { updatePool } from "../../../utils/update-pool";
import { Prices } from "../../domain/coinSymbols";
import { MarketPools } from "../../domain/market";

import { raydiumPools } from "./config";
import { RaydiumPoolsResponse } from "./raydiumPool";

export async function fetchRaydiumPools(): Promise<RaydiumPoolsResponse> {
  const response = await fetch(`https://api.raydium.io/pairs`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const mapRaydiumPoolsResponse = (
  raydiumResults: RaydiumPoolsResponse,
  prices: Prices
) => {
  const poolsArray = Object.entries(raydiumPools).map(([poolkey, incoming]) => {
    let pool = incoming;

    if (pool.providerId) {
      const result = raydiumResults.find(
        (raydiumResult) => raydiumResult.name === pool.providerId
      );

      if (result) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { token_amount_pc, token_amount_lp, apy } = result;
        pool = updatePool(
          pool,
          prices,
          token_amount_pc.toString(),
          token_amount_lp.toString(),
          apy.toString()
        );
      }
    }
    return { [poolkey]: pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {}) as MarketPools;
};

export const getRaydium = async (prices: Prices) => {
  const results = await fetchRaydiumPools();
  return mapRaydiumPoolsResponse(results, prices);
};

export const raydium = {
  fetchPools: getRaydium,
  pools: raydiumPools as MarketPools,
  tokenList: getTokensList(Object.values(raydiumPools)),
};
