export const lendingPortPoolIds = {
  PORT_mSOL: "GoNeG1rhoZMuLqy6aUNfzyHjkCe9dwFuWTFwENPfU3q8",
} as const;

export type LendingPortPoolIds =
  typeof lendingPortPoolIds[keyof typeof lendingPortPoolIds];
