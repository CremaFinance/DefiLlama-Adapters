export interface AldrinPool {
  name: string;
  providerId: string;
  pair: string;
  pairLink: string;
  logo: string;
  tradingAPY: number;
  famingAPY: number;
  totalAPY: number;
  tokensInPoolRewards: string[];
  poolRewardsInfo: {
    farmingTokenSymbol: string;
    farmingTokenMint: string;
    farmingDaily: number;
    farmingDailyUSD: number;
    apy: number;
  }[];
  rewards: {
    [key: string]: { apy: number; dailyRate: number; aprDescription: string };
  };
  tvlUSD: number;
}

export type AldrinPoolsResponse = AldrinPool[];
