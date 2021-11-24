import { CoinSymbols } from "./coinSymbols";

export type Rewards = {
  [key in CoinSymbols]?: { dailyRate: number; apy?: number };
};
