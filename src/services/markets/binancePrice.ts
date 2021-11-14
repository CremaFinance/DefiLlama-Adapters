import { CoinSymbols, Prices } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { Currency } from "../domain/currency";

export async function fetchBinancePrice(source: CoinSymbols): Promise<Prices> {
  const token = coinTokens[source];

  const response = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${token.symbol.toUpperCase()}BUSD`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return { [source]: { [Currency.usd]: result.price } };
}
