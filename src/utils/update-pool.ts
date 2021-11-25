/* eslint-disable sonarjs/cognitive-complexity */
import { Prices } from "services/domain/coinSymbols";
import { coinTokens } from "services/domain/coinTokens";
import { Pool } from "services/domain/pool";

export const updatePool = (
  poolToUpdate: Pool,
  prices: Prices,
  tokenAAmount: string,
  tokenBAmount: string,
  apy: string
) => {
  const pool = poolToUpdate;
  const tokenA =
    Number(tokenAAmount) / (1 * 10) ** coinTokens[pool.tokenA].decimals;
  const tokenAPrice = prices[pool.tokenA]?.usd; // potential to make target selectable

  const tokenB =
    Number(tokenBAmount) /
    (1 * 10) ** coinTokens[pool.tokenB as string].decimals;
  const tokenBPrice = prices[pool.tokenB ?? ""]?.usd;

  if (tokenAPrice && tokenBPrice) {
    const liq = tokenA * tokenAPrice + tokenB * tokenBPrice;
    pool.liq = Number.isNaN(liq) ? undefined : liq;
    pool.totalLockedValue = Number.isNaN(liq) ? undefined : liq;
    pool.apy = Number(apy) * 100;

    if (pool.rewards) {
      Object.entries(pool.rewards).forEach((entry) => {
        const [key, reward] = entry;
        const price = prices[key]?.usd;
        if (price && reward && pool.liq) {
          reward.apy = ((reward.dailyRate * price * 365) / pool.liq) * 100;
          pool.apy = pool.apy ? (pool.apy += reward.apy) : undefined;
        }
      });
    }
  }
  return pool;
};
