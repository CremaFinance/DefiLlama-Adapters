import type { LendingPortPoolIds } from "./lendingPortPoolIds";

export interface PortPool {
  poolId: LendingPortPoolIds;
  ratePerSlot: string;
  poolSize: string;
  ratePerDay: string;
  endSlot: string;
  duration: string;
  owner: string;
  admin: string;
}

export type PortPoolsResponse = PortPool[];

export interface PortReserveResponse {
  reserveId: string;
  assetMintId: string;
  shareMintId: string;
  oracleId: string;
  shareBalanceId: string;
  liquidityBalanceId: string;
  availableLiquidity: string;
  borrowedLiquidity: string;
  totalLiquidity: string;
  issuedShare: string;
  exchangeRatio: string;
  depositApy: string;
  borrowApy: string;
  stakingPool: string;
}
