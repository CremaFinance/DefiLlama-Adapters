export const synthetifyPoolAddress = {
  SNY_mSOL: "13SZwwdsUoU8tkYn2PnCkaB689dB8ZK7RMStFcG3Rgoj",
} as const;

export type SynthetifyPoolAddress =
  typeof synthetifyPoolAddress[keyof typeof synthetifyPoolAddress];
