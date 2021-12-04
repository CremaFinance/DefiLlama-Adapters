export const lendingLarixPoolIds = {
  LARIX_mSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
} as const;

export type LendingLarixPoolIds =
  typeof lendingLarixPoolIds[keyof typeof lendingLarixPoolIds];
