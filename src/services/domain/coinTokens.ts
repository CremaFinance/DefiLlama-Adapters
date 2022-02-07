import { coinSymbols, CoinSymbols } from "./coinSymbols";
import { TokenRecord } from "./token";

/** All cointokens used by marinade */
export const coinTokens: TokenRecord<CoinSymbols> = {
  [coinSymbols.MNDE]: {
    chainId: 101,
    address: "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey",
    symbol: "mnde",
    name: "Marinade",
    decimals: 9,
    logoURI: "",
    tags: [],
    extensions: {
      coingeckoId: "marinade",
    },
  },
  [coinSymbols.ORCA]: {
    chainId: 101,
    address: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    symbol: "ORCA",
    name: "Orca",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
    tags: [],
    extensions: {
      website: "https://orca.so",
      telegram: "https://t.me/orca_so",
      medium: "https://orca-so.medium.com",
      discord: "https://discord.com/invite/nSwGWn5KSG",
      coingeckoId: "orca",
      serumV3Usdc: "8N1KkhaCYDpj3awD58d85n973EwkpeYnRp84y1kdZpMX",
    },
  },
  [coinSymbols.mSOL]: {
    chainId: 101,
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    symbol: "mSOL",
    name: "Marinade staked SOL (mSOL)",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
    tags: [],
    extensions: {
      coingeckoId: "msol",
      website: "https://marinade.finance",
      twitter: "https://twitter.com/MarinadeFinance",
      discord: "https://discord.com/invite/6EtUf4Euu6",
      medium: "https://medium.com/marinade-finance",
      github: "https://github.com/marinade-finance",
      serumV3Usdc: "6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy",
    },
  },
  [coinSymbols.SOL]: {
    chainId: 101,
    address: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Wrapped SOL",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    tags: [],
    extensions: {
      website: "https://solana.com/",
      serumV3Usdc: "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT",
      serumV3Usdt: "HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1",
      coingeckoId: "solana",
      binanceId: "SOL",
    },
  },
  [coinSymbols.USDC]: {
    chainId: 101,
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    tags: ["stablecoin"],
    extensions: {
      website: "https://www.centre.io/",
      coingeckoId: "usd-coin",
      binanceId: "USDC",
      serumV3Usdt: "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
    },
  },
  [coinSymbols.USDT]: {
    chainId: 101,
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    symbol: "USDT",
    name: "USDT",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    tags: ["stablecoin"],
    extensions: {
      website: "https://tether.to/",
      coingeckoId: "tether",
      serumV3Usdc: "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
    },
  },
  [coinSymbols.BTC]: {
    chainId: 101,
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    symbol: "BTC",
    name: "Wrapped Bitcoin (Sollet)",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
    tags: ["wrapped-sollet", "ethereum"],
    extensions: {
      bridgeContract:
        "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      serumV3Usdc: "A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw",
      serumV3Usdt: "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4",
      coingeckoId: "bitcoin",
      binanceId: "BTC",
    },
  },
  [coinSymbols.whETH]: {
    chainId: 101,
    address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    symbol: "ETH",
    name: "Wrapped Ethereum (Sollet)",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png",
    tags: ["wrapped-sollet", "ethereum"],
    extensions: {
      bridgeContract:
        "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      serumV3Usdc: "4tSvZvnbyzHXLMTiFonMyxZoHmFqau1XArcRCVHLZ5gX",
      serumV3Usdt: "7dLVkUfBVfCGkFhSXDCq1ukM9usathSgS716t643iFGF",
      coingeckoId: "ethereum",
      binanceId: "ETH",
    },
  },
  [coinSymbols.PORT]: {
    chainId: 101,
    address: "??",
    symbol: "port",
    name: "PORT",
    decimals: 9,
    logoURI: "",
    tags: [],
    extensions: {
      coingeckoId: "port-finance",
    },
  },
  [coinSymbols.RAYDIUM]: {
    chainId: 101,
    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    symbol: "RAY",
    name: "Raydium",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    tags: [],
    extensions: {
      coingeckoId: "raydium",
      binanceId: "RAY",
    },
  },
  [coinSymbols.ETH]: {
    chainId: 101,
    address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    symbol: "ETH",
    name: "Wrapped Ethereum",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png",
    tags: [],
    extensions: {
      coingeckoId: "ethereum",
      binanceId: "ETH",
    },
  },
  [coinSymbols.LARIX]: {
    chainId: 101,
    address: "Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC",
    symbol: "LARIX",
    name: "Larix",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC/logo.jpg",
    tags: [],
    extensions: {
      coingeckoId: "larix",
    },
  },
  [coinSymbols.ATRIX]: {
    chainId: 101,
    address: "9JK1KNvGdWvZUX783nULvDZaZMVhdzohL2dKUUkjW2jZ",
    symbol: "ATRIX",
    name: "Atrix",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FgX1WD9WzMU3yLwXaFSarPfkgzjLb2DZCqmkx9ExpuvJ/logo.png",
    tags: [],
    extensions: {
      coingeckoId: "atrix",
    },
  },
  [coinSymbols.FRANCIUM]: {
    chainId: 101,
    address: "",
    symbol: "FRANCIUM",
    name: "Francium",
    decimals: 9,
    logoURI: "",
    tags: [],
  },
  [coinSymbols.ALDRIN]: {
    chainId: 101,
    address: "E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp",
    symbol: "RIN",
    name: "Aldrin",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp/logo.png",
    tags: [],
    extensions: {
      coingeckoId: "aldrin",
      website: "https://aldrin.com",
      twitter: "https://twitter.com/Aldrin_Exchange",
      discord: "https://discord.gg/4VZyNxT2WU",
      medium: "https://blog.aldrin.com",
      telegram: "https://t.me/Aldrin_Exchange",
      github: "https://github.com/aldrin-exchange",
      serumV3Usdc: "7gZNLDbWE73ueAoHuAeFoSu7JqmorwCLpNTBXHtYSFTa",
    },
  },
  [coinSymbols.MNGO]: {
    chainId: 101,
    address: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
    symbol: "MNGO",
    name: "Mango",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png",
    extensions: {
      coingeckoId: "mango-markets",
      discord: "https://discord.gg/67jySBhxrg",
      serumV3Usdc: "3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc",
      twitter: "https://twitter.com/mangomarkets",
      website: "https://mango.markets/",
    },
  },
  [coinSymbols.SABER]: {
    chainId: 101,
    address: "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1",
    symbol: "SBR",
    name: "Saber Protocol Token",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1/logo.svg",
    extensions: {
      coingeckoId: "saber",
      discord: "https://chat.saber.so",
      github: "https://github.com/saber-hq",
      medium: "https://blog.saber.so",
      serumV3Usdc: "HXBi8YBwbh4TXF6PjVw81m8Z3Cc4WBofvauj5SBFdgUs",
      website: "https://saber.so",
    },
  },
  [coinSymbols.SNY]: {
    chainId: 101,
    address: "4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y",
    symbol: "SNY",
    name: "Synthetify",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png",
    extensions: {
      coingeckoId: "synthetify-token",
      serumV3Usdc: "DPfj2jYwPaezkCmUNm5SSYfkrkz8WFqwGLcxDDUsN3gA",
      twitter: "https://twitter.com/synthetify",
      website: "https://synthetify.io/",
    },
  },
};
