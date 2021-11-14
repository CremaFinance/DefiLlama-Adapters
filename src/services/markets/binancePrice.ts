import { CoinSymbols } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { Currency } from "../domain/currency";

export type Price = {
  [key in Currency]?: number;
};
export type Prices = {
  [key in CoinSymbols]?: Price;
};

// mapper etc

export async function fetchBinancePrice(source: CoinSymbols): Promise<Prices> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }

  const response = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${source.toUpperCase()}BUSD`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return { [source]: { [Currency.usd]: result.price } };
}
