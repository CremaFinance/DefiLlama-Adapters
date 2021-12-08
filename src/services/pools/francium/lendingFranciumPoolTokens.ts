import { Token } from "../../domain/token";

import {
  lendingFranciumPoolAddress,
  LendingFranciumPoolAddress,
} from "./lendingFranciumPoolAddress";

export const lendingFranciumPoolTokens: Record<
  LendingFranciumPoolAddress,
  Token
> = {
  [lendingFranciumPoolAddress.FRANCIUM_mSOL]: {
    chainId: 101,
    address: "ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1",
    symbol: "mSOL",
    name: "Francium mSol",
    decimals: 6,
    logoURI: "/pools/francium.png",
    extensions: {},
  },
};
