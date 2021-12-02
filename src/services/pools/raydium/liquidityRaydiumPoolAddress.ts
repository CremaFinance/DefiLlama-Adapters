export const liquidityRaydiumPoolAddress = {
  RAYDIUM_mSOL_SOL: "5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4",
  RAYDIUM_mSOL_USDC: "4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf",
  RAYDIUM_mSOL_USDT: "69NCmEW9mGpiWLjAcAWHq51k4ionJZmzgRfRT3wQaCCf",
  RAYDIUM_ETH_mSOL: "HYv3grQfi8QbV7nG7EFgNK1aJSrsJ7HynXJKJVPLL2Uh",
  RAYDIUM_BTC_mSOL: "92bcERNtUmuaJ6mwLSxYHZYSph37jdKxRdoYNxpcYNPp",
  RAYDIUM_mSOL_RAY: "De2EHBAdkgfc72DpShqDGG42cV3iDWh8wvvZdPsiEcqP",
  RAYDIUM_MNDE_mSOL: "4bh8XCzTHSbqbWN8o1Jn4ueBdz1LvJFoEasN6K6CQ8Ny",
} as const;

export type LiquidityRaydiumPoolAddress =
  typeof liquidityRaydiumPoolAddress[keyof typeof liquidityRaydiumPoolAddress];
