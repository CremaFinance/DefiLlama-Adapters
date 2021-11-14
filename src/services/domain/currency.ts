export enum Currency {
  usd = "usd",
  euro = "euro",
}

export type Price = {
  [key in Currency]?: number;
};
