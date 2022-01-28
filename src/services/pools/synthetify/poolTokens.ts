import { TokenRecord } from "../../domain/token";

import { synthetifyPoolAddress, SynthetifyPoolAddress } from "./poolAddress";

export const synthetifyPoolTokens: TokenRecord<SynthetifyPoolAddress> = {
  [synthetifyPoolAddress.SNY_mSOL]: {
    chainId: 101,
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    symbol: "mSOL",
    name: "Synthetify mSol",
    decimals: 6,
    logoURI: "/pools/sny.png",
    extensions: {},
  },
};
