import type { Token } from "../../domain/token";

import type { LiquidityRaydiumPoolAddress } from "./liquidityRaydiumPoolAddress";
import { liquidityRaydiumPoolAddress } from "./liquidityRaydiumPoolAddress";

const raydiumUri =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png";

export const liquidityPoolTokensRaydium: Record<
  LiquidityRaydiumPoolAddress,
  Token
> = {
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_SOL]: {
    chainId: 101,
    address: "5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4",
    symbol: "mSOL-SOL",
    name: "Raydium mSOL/SOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDC]: {
    chainId: 101,
    address: "4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf",
    symbol: "mSOL-USDC",
    name: "Raydium mSOL/USDC",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_USDT]: {
    chainId: 101,
    address: "69NCmEW9mGpiWLjAcAWHq51k4ionJZmzgRfRT3wQaCCf",
    symbol: "mSOL-USDT",
    name: "Raydium mSOL/USDT",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_ETH_mSOL]: {
    chainId: 101,
    address: "HYv3grQfi8QbV7nG7EFgNK1aJSrsJ7HynXJKJVPLL2Uh",
    symbol: "ETH-mSOL",
    name: "Raydium ETH/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_BTC_mSOL]: {
    chainId: 101,
    address: "92bcERNtUmuaJ6mwLSxYHZYSph37jdKxRdoYNxpcYNPp",
    symbol: "BTC-mSOL",
    name: "RaydiumBTC/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_mSOL_RAY]: {
    chainId: 101,
    address: "De2EHBAdkgfc72DpShqDGG42cV3iDWh8wvvZdPsiEcqP",
    symbol: "mSOL-RAY",
    name: "Raydium mSOL/RAY",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
  [liquidityRaydiumPoolAddress.RAYDIUM_MNDE_mSOL]: {
    chainId: 101,
    address: "4bh8XCzTHSbqbWN8o1Jn4ueBdz1LvJFoEasN6K6CQ8Ny",
    symbol: "MNDE-mSOL",
    name: "Raydium MNDE/mSOL",
    decimals: 9,
    logoURI: raydiumUri,
    tags: ["lp-token"],
  },
};
