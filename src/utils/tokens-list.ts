import { CoinSymbols } from "services/domain/coinSymbols";
import { Pool } from "services/domain/pool";

// Don't like this file here
export const getTokensList = (pools: Pool[]) => {
  const tokens: CoinSymbols[] = [];

  pools.forEach((pair) => {
    tokens.push(pair.tokenA);
    if (pair.marketType === "LiquidityPool" && pair.tokenB) {
      tokens.push(pair.tokenB);
    }
    if (pair.rewards) {
      Object.keys(pair.rewards).forEach((reward) => {
        tokens.push(reward as CoinSymbols);
      });
    }
  });

  return tokens;
};
