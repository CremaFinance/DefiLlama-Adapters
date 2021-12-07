import { Token } from "../../domain/token";

import {
  liquidityAtrixPoolAddress,
  LiquidityAtrixPoolAddress,
} from "./liquidityAtrixPoolAddress";

const atrixUri = "/pools/atrix.svg";

export const liquidityPoolTokensAtrix: Record<
  LiquidityAtrixPoolAddress,
  Token
> = {
  [liquidityAtrixPoolAddress.ATRIX_mSOL_USDC]: {
    chainId: 101,
    address: "J55atXt8BnF99YUC4AmpHY2VuxZ6XbBTjL7dHaePid42",
    symbol: "mSO-USDC",
    name: "Atrix mSOL/USDC",
    decimals: 9,
    logoURI: atrixUri,
    tags: ["lp-token"],
  },
  [liquidityAtrixPoolAddress.ATRIX_mSOL_USDT]: {
    chainId: 101,
    address: "HErPZEJhW5uXYcmfLHiuKPebBc2Gu5UJTTyPiZnmJXW4",
    symbol: "mSOL-USDT",
    name: "Raydium mSOL/USDT",
    decimals: 9,
    logoURI: atrixUri,
    tags: ["lp-token"],
  },
};
