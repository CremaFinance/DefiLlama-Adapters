import { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";
import { Pool, PoolConfig } from "services/domain/pool";

import { updatePoolRewards } from "./update-pool-rewards";

export const updatePoolFromTokens = (
  poolConfig: PoolConfig,
  prices: Prices,
  tokenAAmount: string,
  tokenBAmount: string,
  apy: string
): Pool | PoolConfig => {
  const tokenA =
    Number(tokenAAmount) / (1 * 10) ** coinTokens[poolConfig.tokenA].decimals;
  const tokenAPrice = prices[poolConfig.tokenA]?.usd; // potential to make target selectable

  const tokenB =
    Number(tokenBAmount) /
    (1 * 10) ** coinTokens[poolConfig.tokenB as string].decimals;
  const tokenBPrice = prices[poolConfig.tokenB ?? ""]?.usd;

  if (tokenAPrice && tokenBPrice) {
    const liq = tokenA * tokenAPrice + tokenB * tokenBPrice;
    const pool = {
      ...poolConfig,
      ...{
        liq: Number.isNaN(liq) ? undefined : liq,
        totalLockedValue: Number.isNaN(liq) ? undefined : liq,
        tradingApy: Number(apy) * 100,
        apy: Number(apy) * 100,
      },
    };
    return updatePoolRewards(pool as Pool, prices);
  }
  return poolConfig;
};
