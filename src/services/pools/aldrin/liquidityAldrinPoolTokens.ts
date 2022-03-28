import type { Token } from "../../domain/token";

import type { LiquidityAldrinPoolAddress } from "./liquidityAldrinPoolAddress";
import { liquidityAldrinPoolAddress } from "./liquidityAldrinPoolAddress";

const aldrinUri =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp/logo.png";

export const liquidityPoolTokensAldrin: Record<
  LiquidityAldrinPoolAddress,
  Token
> = {
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_SOL]: {
    chainId: 101,
    address: "CCJ73enCHai27dS79uhqMYMGoehVQsP1YECyDq9xvyt9",
    symbol: "mSOL-SOL",
    name: "Aldrin mSOL/SOL",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_USDC]: {
    chainId: 101,
    address: "H37kHxy82uLoF8t86wK414KzpVJy7uVJ9Kvt5wYsTGPh",
    symbol: "mSOL-USDC",
    name: "Aldrin mSOL/USDC",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_USDT]: {
    chainId: 101,
    address: "77qHkg6TEe4FuZAr35bthTEadmT4ueWe1xomFFZkwiGQ",
    symbol: "mSOL-USDT",
    name: "Aldrin mSOL/USDT",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_MNGO]: {
    chainId: 101,
    address: "EotLYRsnRVqR3euN24P9PMXCqJv1WLsV8kJxR9o1y4U7",
    symbol: "mSOL-MNGO",
    name: "Aldrin mSOL/MNGO",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_ETH]: {
    chainId: 101,
    address: "4KeZGuXPq9fyZdt5sfzHMM36mxTf3oSkDaa4Y4gHm9Hz",
    symbol: "mSOL-ETH",
    name: "Aldrin mSOL/ETH",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_BTC]: {
    chainId: 101,
    address: "9hkYqNM8QSx2vTwspaNg5VvW1LBxKWWgud8pCVdxKYZU",
    symbol: "mSOL-BTC",
    name: "Aldrin mSOL/BTC",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
  [liquidityAldrinPoolAddress.ALDRIN_mSOL_NEAR]: {
    chainId: 101,
    address: "J57SuGbMCMuRaQHxiuVChXZeMSTN6ZNqx4GufrY7rzY3",
    symbol: "NEAR-mSOL",
    name: "Aldrin NEAR/mSOL",
    decimals: 0,
    logoURI: aldrinUri,
    tags: ["lp-token"],
  },
};
