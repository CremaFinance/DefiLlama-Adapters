import { Token } from "../../domain/token";

import {
  lendingFranciumPoolKey,
  LendingFranciumPoolKey,
} from "./lendingFranciumPoolKey";

export const lendingFranciumPoolTokens: Record<LendingFranciumPoolKey, Token> =
  {
    [lendingFranciumPoolKey.FRANCIUM_mSOL]: {
      chainId: 101,
      address: "",
      symbol: "mSOL",
      name: "Francium mSol",
      decimals: 6,
      logoURI: "/pools/francium.png",
      extensions: {},
    },
  };
