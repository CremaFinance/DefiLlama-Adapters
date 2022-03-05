import type { Token } from "../../domain/token";

import type { FarmPoolAddress } from "./PoolAddress";
import { farmPoolAddress } from "./PoolAddress";

const logoURI = "/pools/saber.png";

export const farmPoolTokens: Record<FarmPoolAddress, Token> = {
  [farmPoolAddress.saber_mSOL_SOL]: {
    chainId: 101,
    address: farmPoolAddress.saber_mSOL_SOL,
    symbol: "mSOL-SOL",
    name: "Saber mSOL-SOL LP",
    decimals: 9,
    logoURI,
    extensions: {},
  },
};
