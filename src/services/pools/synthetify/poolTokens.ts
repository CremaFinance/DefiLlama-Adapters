import { TokenRecord } from "../../domain/token";

import { synthetifyPoolAddress, SynthetifyPoolAddress } from "./poolAddress";

export const synthetifyPoolTokens: TokenRecord<SynthetifyPoolAddress> = {
  [synthetifyPoolAddress.SNY_mSOL]: {
    chainId: 101,
    address: "13SZwwdsUoU8tkYn2PnCkaB689dB8ZK7RMStFcG3Rgoj",
    symbol: "mSOL",
    name: "Synthetify mSol",
    decimals: 6,
    logoURI: "/pools/synthetify.png",
    extensions: {},
  },
};
