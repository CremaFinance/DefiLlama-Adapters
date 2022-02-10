/* eslint-disable sonarjs/no-duplicate-string */
import type { TokenRecord } from "../../domain/token";

import type { LiquidityOrcaPoolAddress } from "./liquidityOrcaPoolAddress";
import { liquidityOrcaPoolAddress } from "./liquidityOrcaPoolAddress";

const orcaUri = "/pools/orca.png";

export const liquidityPoolTokens: TokenRecord<LiquidityOrcaPoolAddress> = {
  [liquidityOrcaPoolAddress.ORCA_mSOL_SOL]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_BTC_mSOL,
    symbol: "mSOL/SOL",
    name: "Orca Aquafarm Token (mSOL/SOL)",
    decimals: 6,
    logoURI: orcaUri,
    tags: ["lp-token"],
    extensions: {},
  },
  [liquidityOrcaPoolAddress.ORCA_BTC_mSOL]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_BTC_mSOL,
    symbol: "BTC/mSOL",
    name: "Orca BTC/mSOL[aquafarm]",
    decimals: 6,
    logoURI: orcaUri,
    tags: ["lp-token"],
    extensions: {
      website: "https://www.orca.so",
      twitter: "https://twitter.com/orca_so",
    },
  },
  [liquidityOrcaPoolAddress.ORCA_MNDE_mSOL]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_MNDE_mSOL,
    symbol: "MNDE/mSOL",
    name: "Orca MNDE/mSOL[aquafarm]",
    decimals: 6,
    logoURI: orcaUri,
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDT]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_mSOL_USDT,
    symbol: "mSOL/USDT",
    name: "mSOL/USDT[aquafarm]",
    decimals: 9,
    logoURI: orcaUri,
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDC]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_mSOL_USDC,
    symbol: "mSOL/USDC[aquafarm]",
    name: "Orca mSOL/USDC[aquafarm]",
    decimals: 9,
    logoURI: orcaUri,
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_ORCA_mSOL]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_ORCA_mSOL,
    symbol: "ORCA/mSOL",
    name: "Orca ORCA/mSOL[aquafarm]",
    decimals: 6,
    logoURI: orcaUri,
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_whETH]: {
    chainId: 101,
    address: liquidityOrcaPoolAddress.ORCA_mSOL_whETH,
    symbol: "mSOL/whETH[aquafarm]",
    name: "Orca mSOL/whETH[aquafarm]",
    decimals: 6,
    logoURI: orcaUri,
    tags: ["lp-token"],
  },
};
