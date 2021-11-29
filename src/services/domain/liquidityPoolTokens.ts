/* eslint-disable sonarjs/no-duplicate-string */
import {
  liquidityPoolAddressOrca,
  LiquidityPoolAddressOrca,
  liquidityPoolAddressRaydium,
  LiquidityPoolAddressRaydium,
} from "./liquidityPoolAddress";
import { Token } from "./token";

export const liquidityPoolTokens: Record<LiquidityPoolAddressOrca, Token> = {
  [liquidityPoolAddressOrca.ORCA_mSOL_SOL]: {
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
  [liquidityPoolAddressOrca.ORCA_BTC_mSOL]: {
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
  [liquidityPoolAddressOrca.ORCA_MNDE_mSOL]: {
    chainId: 101,
    address: "vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq",
    symbol: "MNDE/mSOL",
    name: "Orca MNDE/mSOL[aquafarm]",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FMpVEhvxiFxhfideFUMNxCoUZK3TfhezzajoHGTQKP2/logo.svg",
    tags: ["lp-token"],
  },
  [liquidityPoolAddressOrca.ORCA_mSOL_USDT]: {
    chainId: 101,
    address: "Afofkb7JTc32rdpqiyc3RDmGF5s9N6W1ujcdYVfGZ5Je",
    symbol: "mSOL/USDT",
    name: "mSOL/USDT[aquafarm]",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7iKG16aukdXXw43MowbfrGqXhAoYe51iVR9u2Nf2dCEY/logo.svg",
    tags: ["lp-token"],
  },
  [liquidityPoolAddressOrca.ORCA_mSOL_USDC]: {
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

const raydiumUri =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png";

export const liquidityPoolTokensRaydium: Record<
  LiquidityPoolAddressRaydium,
  Token
> = {
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_SOL]: {
    chainId: 101,
    address: "5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4",
    symbol: "mSOL-SOL",
    name: "Raydium mSOL/SOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDC]: {
    chainId: 101,
    address: "4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf",
    symbol: "mSOL-USDC",
    name: "Raydium mSOL/USDC",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_USDT]: {
    chainId: 101,
    address: "69NCmEW9mGpiWLjAcAWHq51k4ionJZmzgRfRT3wQaCCf",
    symbol: "mSOL-USDT",
    name: "Raydium mSOL/USDT",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_ETH_mSOL]: {
    chainId: 101,
    address: "HYv3grQfi8QbV7nG7EFgNK1aJSrsJ7HynXJKJVPLL2Uh",
    symbol: "ETH-mSOL",
    name: "Raydium ETH/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_BTC_mSOL]: {
    chainId: 101,
    address: "92bcERNtUmuaJ6mwLSxYHZYSph37jdKxRdoYNxpcYNPp",
    symbol: "BTC-mSOL",
    name: "RaydiumBTC/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_mSOL_RAY]: {
    chainId: 101,
    address: "De2EHBAdkgfc72DpShqDGG42cV3iDWh8wvvZdPsiEcqP",
    symbol: "mSOL-RAY",
    name: "Raydium mSOL/RAY",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityPoolAddressRaydium.RAYDIUM_MNDE_mSOL]: {
    chainId: 101,
    address: "4bh8XCzTHSbqbWN8o1Jn4ueBdz1LvJFoEasN6K6CQ8Ny",
    symbol: "MNDE-mSOL",
    name: "Raydium MNDE/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
};
