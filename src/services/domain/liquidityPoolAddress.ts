export const liquidityPoolAddressOrca = {
  ORCA_mSOL_SOL: "9EQMEzJdE2LDAY1hw1RytpufdwAXzatYfQ3M2UuT9b88",
  ORCA_BTC_mSOL: "8DRw5wQE1pyg6RB1UwypGNFgb2Pzp2hpyDDNwo76Lcc8",
  ORCA_MNDE_mSOL: "vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq",
  ORCA_mSOL_USDT: "Afofkb7JTc32rdpqiyc3RDmGF5s9N6W1ujcdYVfGZ5Je",
  ORCA_mSOL_USDC: "Hme4Jnqhdz2jAPUMnS7jGE5zv6Y1ynqrUEhmUAWkXmzn",
} as const;

export type LiquidityPoolAddressOrca =
  typeof liquidityPoolAddressOrca[keyof typeof liquidityPoolAddressOrca];

export const liquidityPoolAddressRaydium = {
  RAYDIUM_mSOL_SOL: "5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4",
  RAYDIUM_mSOL_USDC: "4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf",
  RAYDIUM_mSOL_USDT: "69NCmEW9mGpiWLjAcAWHq51k4ionJZmzgRfRT3wQaCCf",
  // RAYDIUM_ETH_mSOL: "HYv3grQfi8QbV7nG7EFgNK1aJSrsJ7HynXJKJVPLL2Uh",
  RAYDIUM_BTC_mSOL: "92bcERNtUmuaJ6mwLSxYHZYSph37jdKxRdoYNxpcYNPp",
  RAYDIUM_mSOL_RAY: "De2EHBAdkgfc72DpShqDGG42cV3iDWh8wvvZdPsiEcqP",
  RAYDIUM_MNDE_mSOL: "4bh8XCzTHSbqbWN8o1Jn4ueBdz1LvJFoEasN6K6CQ8Ny",
} as const;

export type LiquidityPoolAddressRaydium =
  typeof liquidityPoolAddressRaydium[keyof typeof liquidityPoolAddressRaydium];
