import { Prices } from "./coinSymbols";
import { PoolConfig, Pool } from "./pool";

export type Provider = {
  pools: Record<string, PoolConfig>;
  fetchPools: (prices: Prices) => Promise<Record<string, Pool>>;
};
export type Providers<P extends string> = Record<P, Provider>;
