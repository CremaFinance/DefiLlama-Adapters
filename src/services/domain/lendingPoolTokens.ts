import { lendingPoolAddress, LendingPoolAddress } from "./lendingPoolAddress";
import { Token } from "./token";

export const lendingPoolTokens: Record<LendingPoolAddress, Token> = {
  [lendingPoolAddress.PORT_mSOL]: {
    chainId: 101,
    address: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
    symbol: "mSOL",
    name: "Port mSol",
    decimals: 6,
    logoURI:
      "https://marinade.finance/static/eac2cd9ccef341c9bc12484fc94682f6/08f35/port.avif",
    extensions: {},
  },
};
