export const liquidityAldrinPoolAddress = {
  ALDRIN_mSOL_SOL: "CCJ73enCHai27dS79uhqMYMGoehVQsP1YECyDq9xvyt9",
  ALDRIN_mSOL_USDC: "H37kHxy82uLoF8t86wK414KzpVJy7uVJ9Kvt5wYsTGPh",
  ALDRIN_mSOL_USDT: "77qHkg6TEe4FuZAr35bthTEadmT4ueWe1xomFFZkwiGQ",
  ALDRIN_mSOL_MNGO: "EotLYRsnRVqR3euN24P9PMXCqJv1WLsV8kJxR9o1y4U7",
  ALDRIN_mSOL_ETH: "4KeZGuXPq9fyZdt5sfzHMM36mxTf3oSkDaa4Y4gHm9Hz",
  ALDRIN_mSOL_BTC: "9hkYqNM8QSx2vTwspaNg5VvW1LBxKWWgud8pCVdxKYZU",
} as const;

export type LiquidityAldrinPoolAddress =
  typeof liquidityAldrinPoolAddress[keyof typeof liquidityAldrinPoolAddress];
