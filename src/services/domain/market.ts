import { LiquidityPoolAddress } from "./liquidityPoolAddress";
import { Pool } from "./pool";

type LPtokens = LiquidityPoolAddress; // | RadiomTokens etc

export type MarketTokens = LPtokens;

// todo better types remove enums
export type LiquidityPools = {
  [key in LPtokens]: Pool;
};

export type MarketPools = {
  [key in MarketTokens]: Pool;
};
