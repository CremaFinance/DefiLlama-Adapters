import { PoolConfig, FetchPools } from "./pool";

/** The provider object that will be exported */
export type Provider = {
  /** All provider pool config records  */
  pools: Record<string, PoolConfig>;
  /** See FetchPools docs for more info */
  fetchPools: FetchPools;
};

export type Providers<P extends string> = Record<P, Provider>;
