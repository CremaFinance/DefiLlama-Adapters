export const lendingPoolIds = {
  PORT_mSOL: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
} as const;

export type LendingPoolIds = typeof lendingPoolIds[keyof typeof lendingPoolIds];
