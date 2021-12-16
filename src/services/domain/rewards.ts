import { CoinSymbols } from "./coinSymbols";

export type RewardConfig = {
  /** Daily reward rate */
  dailyRate: number;
  /** Apr description e.g. 'Emission' , 'Double Dip' */
  aprDescription: string;
  /** calculated when mapped */
  apy?: number;
};

export type Reward = RewardConfig & {
  /** calculated when mapped */
  apy: number;
};

/** keyed on the applicable reward Token coin symbol */
export type Rewards = {
  [key in CoinSymbols]: Reward;
};

/** keyed on the applicable reward Token coin symbol */
export type RewardsConfig = {
  [key in CoinSymbols]: RewardConfig;
};
