import { DWM } from "../../domain/dwm";
import { LiquidityPoolIds } from "../../domain/liquidityPoolIds";

export interface OrcaPool {
  poolId: LiquidityPoolIds;
  poolAccount: string;
  tokenAAmount: string;
  tokenBAmount: string;
  poolTokenSupply: string;
  apy: DWM;
  volume: DWM;
  riskLevel: string;
  riskLevelVolatility?: number;
  riskLevelModifiedTime?: number;
}
