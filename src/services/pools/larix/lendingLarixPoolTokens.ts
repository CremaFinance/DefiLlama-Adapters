import { Token } from "../../domain/token";

import {
  lendingLarixPoolAddress,
  LendingLarixPoolAddress,
} from "./lendingLarixPoolAddress";

export const lendingLarixPoolTokens: Record<LendingLarixPoolAddress, Token> = {
  [lendingLarixPoolAddress.LARIX_mSOL]: {
    chainId: 101,
    address: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
    symbol: "mSOL",
    name: "Larix mSol",
    decimals: 6,
    logoURI: "/pools/larix.png",
    extensions: {},
  },
};
