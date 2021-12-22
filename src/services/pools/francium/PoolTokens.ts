import { Token } from "../../domain/token";

import {
  farmPoolAddress,
  FarmPoolAddress,
  lendingPoolAddress,
  LendingPoolAddress,
} from "./PoolAddress";

const logoURI = "/pools/francium.png";

export const farmPoolTokens: Record<FarmPoolAddress, Token> = {
  [farmPoolAddress.FRANCIUM_ORCA_mSOL_SOL]: {
    chainId: 101,
    address: "FRANCIUM_mSOL_SOL",
    symbol: "mSOL/SOL",
    name: "Francium Orca Aquafarm Token (mSOL/SOL)",
    decimals: 6,
    logoURI,
    extensions: {},
  },
  // [poolAddress.FRANCIUM_ORCA_mSOL_whETH]: {
  //   chainId: 101,
  //   address: "FRANCIUM_mSOL_whETH",
  //   symbol: "mSOL/whETH",
  //   name: "Francium Orca mSOL/whETH[aquafarm]",
  //   decimals: 6,
  //   logoURI,
  //   extensions: {},
  // },
  [farmPoolAddress.FRANCIUM_ORCA_BTC_mSOL]: {
    chainId: 101,
    address: "FRANCIUM_BTC_mSOL",
    symbol: "BTC/mSOL",
    name: "Francium Orca BTC/mSOL[aquafarm]",
    decimals: 6,
    logoURI,
    extensions: {},
  },
  [farmPoolAddress.FRANCIUM_ORCA_mSOL_USDT]: {
    chainId: 101,
    address: "FRANCIUM_mSOL_USDT",
    symbol: "mSOL/USDT",
    name: "Francium Orca mSOL/USDT[aquafarm]",
    decimals: 6,
    logoURI,
    extensions: {},
  },
  [farmPoolAddress.FRANCIUM_ORCA_mSOL_USDC]: {
    chainId: 101,
    address: "FRANCIUM_mSOL_USDC",
    symbol: "mSOL/USDC",
    name: "Francium Orca mSOL/USDC[aquafarm]",
    decimals: 6,
    logoURI,
    extensions: {},
  },
  // [poolAddress.FRANCIUM_ORCA_ORCA_mSOL]: {
  //   chainId: 101,
  //   address: "FRANCIUM_ORCA_mSOL",
  //   symbol: "ORCA/mSOL",
  //   name: "Francium Orca mSOL/USDC[aquafarm]",
  //   decimals: 6,
  //   logoURI,
  //   extensions: {},
  // },
};

export const lendingPoolTokens: Record<LendingPoolAddress, Token> = {
  [lendingPoolAddress.FRANCIUM_mSOL]: {
    chainId: 101,
    address: "ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1",
    symbol: "mSOL",
    name: "Francium mSol",
    decimals: 6,
    logoURI: "/pools/francium.png",
    extensions: {},
  },
};
