import { CoinSymbols } from "./coinSymbols";

type RewardConfig = {
  /**
   * Daily reward rate
   */
  dailyRate: number;
  /**
   * Apr description e.g. 'Emission' , 'Double Dip'
   */
  aprDescription: string;
  apy?: number;
};

type Reward = RewardConfig & {
  /** calculated when mapped */
  apy: number;
};

export type Rewards = {
  [key in CoinSymbols]: Reward;
};

export type RewardsConfig = {
  [key in CoinSymbols]: RewardConfig;
};
