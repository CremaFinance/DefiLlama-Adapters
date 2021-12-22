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

export const updatePoolRewardsFromTotalYeildFarmAPR = (
  poolToUpdate: Pool,
  prices: Prices,
  totalYeildAPR: number,
  leverageMultiplier = 1
) => {
  const pool = poolToUpdate;
  if (pool.rewards) {
    let totalRewards = 0;
    Object.entries(pool.rewards).forEach((entry) => {
      const [rewardKey, reward] = entry;
      const price = prices[rewardKey]?.usd;
      if (price && reward) {
        reward.apy = reward.dailyRate * price;
        totalRewards += reward.apy;
        // pool.apy += reward.apy;
      }
    });
    Object.values(pool.rewards).forEach((rewardToUpdate) => {
      const reward = rewardToUpdate;
      reward.apy =
        (reward.apy / totalRewards) * totalYeildAPR * leverageMultiplier;
      pool.apy += reward.apy;
      return reward;
    });
  }
  return pool;
};
