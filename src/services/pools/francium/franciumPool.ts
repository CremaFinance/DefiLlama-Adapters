export interface FranciumLendingPool {
  id: string;
  apy: number;
  borrowApr: number;
  liquidityLocked: number;
  available: number;
}

export interface FranciumLeveragedPool {
  id: string;
  lpAmount: number;
  liquidityLocked: number;
}

export type FranciumPoolsResponse = {
  data: {
    lend: FranciumLendingPool[];
    farm: FranciumLeveragedPool[];
  };
};

export interface FranciumPoolInfo {
  id: string;
  strategyName: string;
  pair: string;
  author: string;
  from: string;
  yieldFarmingAPR: number;
  strategyAPR: number;
  tradingFeeAPR: number;
  borrowAPR: number;
  maxLeverage: number;
  minLeverage: number;
  lpDecimal: number;
  marketCap: number;
  token0: string;
  token1: string;
  status: string;
  version: number;
  borrowList: string[];
  isNew: boolean;
  alias: string;
  lyfType: string;
  stable?: boolean;
}

export interface FranciumPoolInfoResponse {
  code: number;
  message: string;
  data: FranciumPoolInfo[];
}
