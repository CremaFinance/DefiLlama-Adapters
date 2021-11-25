import { LendingPoolAddress } from "./lendingPoolAddress";
import { LiquidityPoolAddress } from "./liquidityPoolAddress";
import { Pool } from "./pool";

type LPTokens = LiquidityPoolAddress; // | RadiomTokens etc
type LendingTokens = LendingPoolAddress;

export type MarketTokens = LPTokens | LendingTokens;

// todo better types remove enums
export type LiquidityPools = {
  [key in LPTokens]: Pool;
};

export type MarketPools = {
  [key in MarketTokens]: Pool;
};
