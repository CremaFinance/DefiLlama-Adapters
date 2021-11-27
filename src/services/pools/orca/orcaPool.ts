import { DWM } from "../../domain/dwm";
import { LiquidityPoolOrcaIds } from "../../domain/liquidityPoolIds";

export interface OrcaPool {
  poolId: LiquidityPoolOrcaIds;
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
