export const liquidityOrcaPoolAddress = {
  ORCA_mSOL_SOL: "9EQMEzJdE2LDAY1hw1RytpufdwAXzatYfQ3M2UuT9b88",
  ORCA_BTC_mSOL: "8DRw5wQE1pyg6RB1UwypGNFgb2Pzp2hpyDDNwo76Lcc8",
  ORCA_MNDE_mSOL: "vjHagYsgZwG9icyFLHu2xWHWdtiS5gfeNzRhDcPt5xq",
  ORCA_mSOL_USDT: "Afofkb7JTc32rdpqiyc3RDmGF5s9N6W1ujcdYVfGZ5Je",
  ORCA_mSOL_USDC: "Hme4Jnqhdz2jAPUMnS7jGE5zv6Y1ynqrUEhmUAWkXmzn",
  ORCA_ORCA_mSOL: "49tTgthTYLMPEqozZNyEQifqkGYxHqqDie9YxVczS3iB",
  ORCA_mSOL_whETH: "A71DQffTzgxBSzXjPL3tmf8XXTNtS5mR2D78Y8rmV2hk",
} as const;

export type LiquidityOrcaPoolAddress =
  typeof liquidityOrcaPoolAddress[keyof typeof liquidityOrcaPoolAddress];
