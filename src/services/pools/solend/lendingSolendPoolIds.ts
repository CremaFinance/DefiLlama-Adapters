export const lendingSolendPoolIds = {
  SOLEND_mSOL: "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",
} as const;

export type LendingSolendPoolIds =
  typeof lendingSolendPoolIds[keyof typeof lendingSolendPoolIds];
