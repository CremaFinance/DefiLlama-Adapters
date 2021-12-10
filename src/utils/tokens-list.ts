import { CoinSymbols } from "services/domain/coinSymbols";
import { PoolConfig } from "services/domain/pool";
import { Provider } from "services/domain/providers";

export const getTokensList = (pools: PoolConfig[]): CoinSymbols[] => {
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

export const getProviderTokens = (provider: Provider): CoinSymbols[] => {
  return getTokensList(Object.values(provider.pools));
};
