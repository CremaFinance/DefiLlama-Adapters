export const marketTypes = {
  LP: "LiquidityPool",
  Lending: "Lending",
  Leveraged: "Leveraged",
} as const;

export type MarketTypes = typeof marketTypes[keyof typeof marketTypes];
