import { CoinSymbols, Prices } from "./coinSymbols";
import { LeverageConfig } from "./leverage";
import { MarketTypes } from "./marketTypes";
import { Rewards, RewardsConfig } from "./rewards";
import { Token } from "./token";

/**
 * Text and link for the 'Actions' available on a pool row in the UI
 *
 */
export type Action = { text: string; url: string };

/**
 * An interface that extends [[`Token`]] and adds more properties to support integration
 *
 * The required properties should be declared at dev time
 *
 */
export interface PoolConfig extends Token {
  marketType: MarketTypes;
  /* Name of Provider e.g. 'Orca', 'Radium' */
  provider: string;
  /* provider specific id for reference or mapping - not always token address */
  providerId?: string;
  /* for UI */
  actions: Action[];
  rewards?: RewardsConfig;
  tradingApy?: number; // todo double check think this is actually apr
  apr?: number;
  apy?: number; // todo we are actually showing apr need to calc apy
  totalLockedValue?: number;
  liq?: number;
  tokenA: CoinSymbols;
  tokenB?: CoinSymbols;
  leverage?: LeverageConfig;
}

/**
 * The Pool object returned from fetchPools async mapper function
 *
 */
export interface Pool extends PoolConfig {
  rewards?: Rewards;
  tradingApy: number;
  apy: number;
  totalLockedValue: number;
  liq: number;
}

/**
 * An async function that is reponsible for fetching the providers pools, mapping the values to a Pool type and returning them.
 * Check the existing integrations for examples, but feel free to use own implementation, as long as the returned map is Record<string, Pool> (with string being the unique pool token address)
 * some utilites that may be helpful:
 * - src/utils/update-pool-rewards.ts
 * - src/utils/update-pool.ts
 */
export type FetchPools = (prices: Prices) => Promise<Record<string, Pool>>;
