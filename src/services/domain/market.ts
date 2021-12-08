import { LendingLarixPoolAddress } from "../pools/larix/lendingLarixPoolAddress";
import { LiquidityOrcaPoolAddress } from "../pools/orca/liquidityOrcaPoolAddress";
import { LendingPortPoolAddress } from "../pools/port/lendingPortPoolAddress";
import { LiquidityRaydiumPoolAddress } from "../pools/raydium/liquidityRaydiumPoolAddress";
import { LiquidityAtrixPoolAddress } from "services/pools/atrix/liquidityAtrixPoolAddress";
import { LendingFranciumPoolAddress } from "services/pools/francium/lendingFranciumPoolAddress";

import { Pool } from "./pool";

type LPTokens =
  | LiquidityOrcaPoolAddress
  | LiquidityRaydiumPoolAddress
  | LiquidityAtrixPoolAddress; // | RadiomTokens etc
type LendingTokens =
  | LendingPortPoolAddress
  | LendingLarixPoolAddress
  | LendingFranciumPoolAddress;

export type MarketTokens = LPTokens | LendingTokens;

// todo better types remove enums
export type LiquidityPools = {
  [key in LPTokens]: Pool;
};

export type MarketPools = {
  [key in MarketTokens]: Pool;
};
