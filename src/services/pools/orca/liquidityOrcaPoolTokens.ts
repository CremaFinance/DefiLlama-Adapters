/* eslint-disable sonarjs/no-duplicate-string */
import { Token } from "../../domain/token";

import {
  liquidityOrcaPoolAddress,
  LiquidityOrcaPoolAddress,
} from "./liquidityOrcaPoolAddress";

export const liquidityPoolTokens: Record<LiquidityOrcaPoolAddress, Token> = {
  [liquidityOrcaPoolAddress.ORCA_mSOL_SOL]: {
    chainId: 101,
    address: "9EQMEzJdE2LDAY1hw1RytpufdwAXzatYfQ3M2UuT9b88",
    symbol: "mSOL/SOL",
    name: "Orca Aquafarm Token (mSOL/SOL)",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3RTGL7gPF4V1ns1AeGFApT7cBEGVDfmJ77DqQi9AC6uG/logo.svg",
    tags: ["lp-token"],
    extensions: {},
  },
  [liquidityOrcaPoolAddress.ORCA_BTC_mSOL]: {
    chainId: 101,
    address: "8DRw5wQE1pyg6RB1UwypGNFgb2Pzp2hpyDDNwo76Lcc8",
    symbol: "BTC/mSOL",
    name: "Orca BTC/mSOL[aquafarm]",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6uA1ADUJbvwYJZpzUn9z9LuyKoRVngBKcQTKdXsSivA8/logo.svg",
    tags: ["lp-token"],
    extensions: {
      website: "https://www.orca.so",
      twitter: "https://twitter.com/orca_so",
    },
  },
  [liquidityOrcaPoolAddress.ORCA_MNDE_mSOL]: {
    chainId: 101,
    address: "vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq",
    symbol: "MNDE/mSOL",
    name: "Orca MNDE/mSOL[aquafarm]",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FMpVEhvxiFxhfideFUMNxCoUZK3TfhezzajoHGTQKP2/logo.svg",
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDT]: {
    chainId: 101,
    address: "Afofkb7JTc32rdpqiyc3RDmGF5s9N6W1ujcdYVfGZ5Je",
    symbol: "mSOL/USDT",
    name: "mSOL/USDT[aquafarm]",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7iKG16aukdXXw43MowbfrGqXhAoYe51iVR9u2Nf2dCEY/logo.svg",
    tags: ["lp-token"],
  },
  [liquidityOrcaPoolAddress.ORCA_mSOL_USDC]: {
    chainId: 101,
    address: "Hme4Jnqhdz2jAPUMnS7jGE5zv6Y1ynqrUEhmUAWkXmzn",
    symbol: "mSOL/USDC[aquafarm]",
    name: "Orca mSOL/USDC[aquafarm]",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7iKG16aukdXXw43MowbfrGqXhAoYe51iVR9u2Nf2dCEY/logo.svg",
    tags: ["lp-token"],
  },
};
