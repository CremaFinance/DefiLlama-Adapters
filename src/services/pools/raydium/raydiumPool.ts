// ToDo: add ids in LiquidityPoolIds
// import { LiquidityPoolIds } from "../../domain/liquidityPoolIds";

export interface RaydiumPool {
  name: string;
  pair_id: string;
  lp_mint: string;
  official: boolean;
  liquidity: number;
  market: string;
  volume_24h: number;
  volume_24h_quote: number;
  fee_24h: number;
  v: number;
  volume_7d: number;
  volume_7d_quote: number;
  fee_7d: number;
  fee_7d_quote: number;
  price: number;
  lp_price: number;
  amm_id: string;
  token_amount_coin: number;
  token_amount_pc: number;
  token_amount_lp: number;
  apy: number;
}

export type RaydiumPoolsResponse = RaydiumPool[];
