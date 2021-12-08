export const lendingFranciumPoolIds = {
  FRANCIUM_mSOL: "mSOL",
} as const;

export type LendingFranciumPoolIds =
  typeof lendingFranciumPoolIds[keyof typeof lendingFranciumPoolIds];
