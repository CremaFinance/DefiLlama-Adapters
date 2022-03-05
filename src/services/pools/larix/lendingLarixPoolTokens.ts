import type { TokenRecord } from "../../domain/token";

import type { LendingLarixPoolAddress } from "./lendingLarixPoolAddress";
import { lendingLarixPoolAddress } from "./lendingLarixPoolAddress";

export const lendingLarixPoolTokens: TokenRecord<LendingLarixPoolAddress> = {
  [lendingLarixPoolAddress.LARIX_mSOL]: {
    chainId: 101,
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    symbol: "mSOL",
    name: "Larix mSol",
    decimals: 6,
    logoURI: "/pools/larix.png",
    extensions: {},
  },
};
