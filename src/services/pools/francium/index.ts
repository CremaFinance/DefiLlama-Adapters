import type { Prices } from "../../domain/coinSymbols";
import type { Provider } from "../../domain/providers";

import { franciumFarmPools, franciumLendingPools } from "./config";
import type {
  FranciumPoolsResponse,
  FranciumPoolInfoResponse,
} from "./franciumPool";
import { mapFarmPools } from "./mapFarmPools";
import { mapLendingPools } from "./mapLendingPools";

export async function fetchFranciumPools(): Promise<FranciumPoolsResponse> {
  const response = await fetch(`https://francium.io/api/pools/liquidity`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function fetchFranciumPoolsList(): Promise<FranciumPoolInfoResponse> {
  const response = await fetch(`https://francium.io/api/pools/list`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const getFrancium = async (prices: Prices) => {
  const [results, poolsinfo] = await Promise.all([
    fetchFranciumPools(),
    fetchFranciumPoolsList(),
  ]);
  const farms = mapFarmPools(results, poolsinfo, prices);
  const lending = mapLendingPools(results, prices);
  return { ...farms, ...lending };
};

export const francium: Provider = {
  fetchPools: getFrancium,
  pools: { ...franciumFarmPools, ...franciumLendingPools },
};
