export const currency: { [key: string]: string } = {
  usd: "usd",
  euro: "euro",
} as const;

export type Currency = typeof currency[keyof typeof currency];
export type Price = {
  [key in Currency]?: number;
};
