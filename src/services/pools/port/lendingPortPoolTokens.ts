import { Token } from "../../domain/token";

import {
  lendingPortPoolAddress,
  LendingPortPoolAddress,
} from "./lendingPortPoolAddress";

export const lendingPortPoolTokens: Record<LendingPortPoolAddress, Token> = {
  [lendingPortPoolAddress.PORT_mSOL]: {
    chainId: 101,
    address: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
    symbol: "mSOL",
    name: "Port mSol",
    decimals: 6,
    logoURI: "/pools/PORT.svg",
    extensions: {},
  },
};
