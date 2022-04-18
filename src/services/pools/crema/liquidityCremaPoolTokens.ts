import type { Token } from "../../domain/token";

import type { LiquidityCremaPoolAddress } from "./liquidityCremaPoolAddress";
import { liquidityCremaPoolAddress } from "./liquidityCremaPoolAddress";

const CremaUri =
  "https://i.ibb.co/nmDgg1q/crema.png";

export const liquidityPoolTokensCrema: Record<
  LiquidityCremaPoolAddress,
  Token
> = {
  [liquidityCremaPoolAddress.CREMA_mSOL_SOL]: {
    chainId: 101,
    address: "GL2LxzsNLkttgaD46dQjSWycQSmf252TAPfK4tTuqjg7",
    symbol: "mSOL-SOL",
    name: "Crema mSOL/SOL",
    decimals: 0,
    logoURI: CremaUri,
    tags: ["lp-token"],
  },
};
