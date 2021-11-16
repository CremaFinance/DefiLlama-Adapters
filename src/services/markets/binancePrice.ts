import { CoinSymbols, Prices } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { currency } from "../domain/currency";
import { Token } from "../domain/token";

export async function fetchBinancePriceByToken(token: Token): Promise<Prices> {
  const response = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${token.symbol.toUpperCase()}BUSD`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return { [token.symbol]: { [currency.usd]: result.price } };
}

export async function fetchBinancePriceBySymbol(
  source: CoinSymbols
): Promise<Prices> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }

  return fetchBinancePriceByToken(token);
}
