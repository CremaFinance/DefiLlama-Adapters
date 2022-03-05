import { coinSymbols } from "../../domain/coinSymbols";
import { marketTypes } from "../../domain/marketTypes";
import type { PoolConfig } from "../../domain/pool";
import type { Token } from "../../domain/token";

import type { FarmPoolAddress } from "./PoolAddress";
import { farmPoolAddress } from "./PoolAddress";
import { farmPoolTokens } from "./PoolTokens";

export type SaberPoolResponse =
  | {
      solBalance: number;
      mSolBalance: number;
    }
  | undefined;

interface PoolStats {
  ammId: string;
  coin: Token;
  lp: Token;
  pc: Token;
  stats: {
    price: number | null;
    tvl_coin: number | null;
    tvl_pc: number | null;
    vol24h: number | null;
  };
}
export type SaberPoolsResponse = { pools: PoolStats[] };

const provider = "Saber";
const actions = [
  {
    text: "Add liquidity",
    url: "https://app.saber.so/#/pools/msol_sol/deposit",
    isExternal: true,
  },
  {
    text: "Withdraw",
    url: "https://app.saber.so/#/pools/msol_sol/withdraw",
    isExternal: true,
  },
];

export const saberPools: Record<FarmPoolAddress, PoolConfig> = {
  [farmPoolAddress.saber_mSOL_SOL]: {
    ...farmPoolTokens[farmPoolAddress.saber_mSOL_SOL],
    ...{
      provider,
      marketType: marketTypes.LP,
      providerId: "Lee1XZJfJ9Hm2K1qTyeCz1LXNc1YBZaKZszvNY4KCDw",
      tokenA: coinSymbols.mSOL,
      tokenB: coinSymbols.SOL,
      rewards: {
        [coinSymbols.SABER]: {
          aprDescription: "SABER",
          dailyRate: 34410.77441 / 7,
          quarry: "7193EeecxsPPv9TMoQATTN8i1eTqEUSNU8aDLuFCQy68",
        },
        [coinSymbols.MNDE]: {
          aprDescription: "MNDE",
          dailyRate: 34410.77441 / 7,
          quarry: "8k36P2RifbC9rYFqfvyYfgLmyq7RgA2JfmtYo57KMBLa",
        },
      },
      actions,
    },
  },
};
