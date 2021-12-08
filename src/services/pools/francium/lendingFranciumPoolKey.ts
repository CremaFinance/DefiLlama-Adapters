export const lendingFranciumPoolKey = {
  FRANCIUM_mSOL: "mSOL",
} as const;

export type LendingFranciumPoolKey =
  typeof lendingFranciumPoolKey[keyof typeof lendingFranciumPoolKey];
