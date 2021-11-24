export const lendingPoolAddress = {
  PORT_mSOL: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
} as const;

export type LendingPoolAddress =
  typeof lendingPoolAddress[keyof typeof lendingPoolAddress];
