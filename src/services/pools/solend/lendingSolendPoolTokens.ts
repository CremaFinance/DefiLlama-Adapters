import type { Token } from "../../domain/token";

import type { LendingSolendPoolAddress } from "./lendingSolendPoolAddress";
import { lendingSolendPoolAddress } from "./lendingSolendPoolAddress";

export const lendingSolendPoolTokens: Record<LendingSolendPoolAddress, Token> =
  {
    [lendingSolendPoolAddress.SOLEND_mSOL]: {
      chainId: 101,
      address: "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",
      symbol: "mSOL",
      name: "Solend mSol",
      decimals: 6,
      logoURI: "/pools/slnd.png",
      extensions: {},
    },
  };
