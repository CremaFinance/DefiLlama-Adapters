export const poolCategories = {
  STAKING: "staking",
  LIQUIDITY: "liquidity",
  LENDING: "lending",
  FARMING: "farming",
} as const;
export type PoolCategories = typeof poolCategories[keyof typeof poolCategories];
