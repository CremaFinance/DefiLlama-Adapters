import { CoinSymbols } from "./coinSymbols";
import { MarketTypes } from "./marketTypes";
import { Rewards } from "./rewards";
import { Token } from "./token";

export type Action = { text: string; url: string };

export interface Pool extends Token {
  marketType: MarketTypes;
  provider: string;
  providerId?: string;
  // for UI
  actions: Action[];
  rewards?: Rewards;
  tradingApy?: number;
  apy?: number;
  totalLockedValue?: number;
  liq?: number;
  tokenA: CoinSymbols;
  tokenB?: CoinSymbols;
}
