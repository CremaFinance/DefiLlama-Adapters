export const lendingSolendPoolAddress = {
  SOLEND_mSOL: "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",
} as const;

export type LendingSolendPoolAddress =
  typeof lendingSolendPoolAddress[keyof typeof lendingSolendPoolAddress];
