import { CoinSymbols } from "./coinSymbols";
import { MarketTypes } from "./marketTypes";
import { Rewards, RewardsConfig } from "./rewards";
import { Token } from "./token";

export type Action = { text: string; url: string };

/**
 * An interface that extends [[`Token`]] and adds more properties.
 *
 * These properties should be declared at dev time
 *
 */
export interface PoolConfig extends Token {
  marketType: MarketTypes;
  /* Name of Provider e.g. 'Orca', 'Radium' */
  provider: string;
  providerId?: string;
  // for UI
  actions: Action[];
  rewards?: RewardsConfig;
  tradingApy?: number;
  apy?: number;
  totalLockedValue?: number;
  liq?: number;
  tokenA: CoinSymbols;
  tokenB?: CoinSymbols;
}

export interface Pool extends PoolConfig {
  rewards?: Rewards;
  tradingApy: number;
  apy: number;
  totalLockedValue: number;
  liq: number;
}
