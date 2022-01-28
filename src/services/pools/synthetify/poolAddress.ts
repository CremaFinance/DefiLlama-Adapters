export const synthetifyPoolAddress = {
  SNY_mSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
} as const;

export type SynthetifyPoolAddress =
  typeof synthetifyPoolAddress[keyof typeof synthetifyPoolAddress];
