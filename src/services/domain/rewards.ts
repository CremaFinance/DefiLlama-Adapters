import { CoinSymbols } from "./coinSymbols";

export type Rewards = {
  [key in CoinSymbols]?: {
    /**
     * Daily reward rate
     *
     * @category Config
     */
    dailyRate: number;
    /**
     * Apr description e.g. 'Emission' , 'Double Dip'
     *
     * @category Config
     */
    aprDescription: string;
    // calculated when mapped
    apy?: number;
  };
};
