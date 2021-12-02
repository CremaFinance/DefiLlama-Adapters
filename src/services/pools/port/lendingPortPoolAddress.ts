export const lendingPortPoolAddress = {
  PORT_mSOL: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
} as const;

export type LendingPortPoolAddress =
  typeof lendingPortPoolAddress[keyof typeof lendingPortPoolAddress];
