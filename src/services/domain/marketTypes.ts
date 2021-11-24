export const marketTypes = {
  LP: "LiquidityPool",
  Lending: "Lending",
} as const;

export type MarketTypes = typeof marketTypes[keyof typeof marketTypes];
