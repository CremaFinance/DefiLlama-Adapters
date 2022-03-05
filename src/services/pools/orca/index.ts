import { updatePoolFromTokens } from "../../../utils/update-pool";
import type { Prices } from "../../domain/coinSymbols";
import type { FetchPools, Pool } from "../../domain/pool";
import type { Provider } from "../../domain/providers";

import type { OrcaPoolsResponse } from "./config";
import { orcaPools } from "./config";
import type { LiquidityOrcaPoolIds } from "./liquidityOrcaPoolIds";

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
      const result = orcaResults[pool.providerId as LiquidityOrcaPoolIds];
      if (result) {
        const { tokenAAmount, tokenBAmount, apy } = result;
        pool = updatePoolFromTokens(
          pool,
          prices,
          tokenAAmount,
          tokenBAmount,
          apy.week
        );
      }
    }
    return { [key]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

export const getOrca: FetchPools = async (prices) => {
  const results = await fetchOrcaPools();
  return mapOrcaPoolsResponse(results, prices);
};

export const orca: Provider = {
  fetchPools: getOrca,
  pools: orcaPools,
};
