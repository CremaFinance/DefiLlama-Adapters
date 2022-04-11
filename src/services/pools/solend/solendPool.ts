export interface SolendReserveResponse {
  results: Array<{
    reserve: {
      lastUpdate: {
        slot: string;
      };
      liquidity: {
        borrowedAmountWads: string;
        availableAmount: string;
        marketPrice: string;
        mintDecimals: number;
      };
    };
  }>;
}

export interface SolendRewardResponse {
  [poolAddress: string]: {
    [mintAddress: string]: {
      supply: {
        rewardRates: Array<{
          beginningSlot: number;
          rewardRate: string;
          name?: string;
        }>;
      };
    };
  };
}
