import { CoinSymbols } from "./coinSymbols";

/** keyed on the applicable borrow Token coin symbol */
export type LeverageTokens = {
  [key in CoinSymbols]: { borrowApr?: number } | undefined;
};

export type LeverageConfig = {
  /** amount of leverage e.g. 2, by default at the moment we use average of max and min */
  ratio: number;
  leverageAmount?: number;
  /* tokens that can be borrowed to create leverage */
  leverageTokens: LeverageTokens;
  selectedToken?: { symbol: CoinSymbols; borrowApr?: number };
};

export type Leverage = LeverageConfig & {
  /** amount of leverage e.g. 2, by default at the moment we use average of max and min */
  ratio: number;
  /* selected leverage token */
  selectedToken: { symbol: CoinSymbols; borrowApr?: number };
};
