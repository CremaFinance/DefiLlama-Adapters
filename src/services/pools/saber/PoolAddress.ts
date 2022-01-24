export const farmPoolAddress = {
  saber_mSOL_SOL: "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz",
} as const;

export type FarmPoolAddress =
  typeof farmPoolAddress[keyof typeof farmPoolAddress];
