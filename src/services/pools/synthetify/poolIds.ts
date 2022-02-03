export const synthetifyPoolIds = {
  SNY_mSOL: "mSOL",
} as const;

export type SynthetifyPoolIds =
  typeof synthetifyPoolIds[keyof typeof synthetifyPoolIds];
