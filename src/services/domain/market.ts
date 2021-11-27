import { LendingPoolAddress } from "./lendingPoolAddress";
import {
  LiquidityPoolAddressOrca,
  LiquidityPoolAddressRaydium,
} from "./liquidityPoolAddress";
import { Pool } from "./pool";

type LPTokens = LiquidityPoolAddressOrca | LiquidityPoolAddressRaydium; // | RadiomTokens etc
type LendingTokens = LendingPoolAddress;

export type MarketTokens = LPTokens | LendingTokens;

// todo better types remove enums
export type LiquidityPools = {
  [key in LPTokens]: Pool;
};

export type MarketPools = {
  [key in MarketTokens]: Pool;
};
