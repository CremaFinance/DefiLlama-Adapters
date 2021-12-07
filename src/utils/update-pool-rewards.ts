import { Prices } from "services/domain/coinSymbols";
import { Pool } from "services/domain/pool";

export const updatePoolRewards = (poolToUpdate: Pool, prices: Prices) => {
  const pool = poolToUpdate;
  if (pool.rewards) {
    Object.entries(pool.rewards).forEach((entry) => {
      const [key, reward] = entry;
      const price = prices[key]?.usd;
      if (price && reward && pool.liq) {
        reward.apy = ((reward.dailyRate * price * 365) / pool.liq) * 100;
        pool.apy += reward.apy;
      }
    });
  }
  return pool;
};
