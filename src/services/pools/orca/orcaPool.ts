import { DWM } from "../../domain/dwm";

import { LiquidityOrcaPoolIds } from "./liquidityOrcaPoolIds";

export interface OrcaPool {
  poolId: LiquidityOrcaPoolIds;
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
