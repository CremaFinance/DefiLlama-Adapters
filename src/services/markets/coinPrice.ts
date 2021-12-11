import { promiseRace } from "../../utils/promise-race";
import { CoinSymbols, Prices } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { Currency } from "../domain/currency";

import { fetchBinancePriceByToken } from "./binancePrice";
import { fetchCoinGeckoPriceByToken } from "./coinGeckoPrice";

export async function fetchCoinPrice(
  source: CoinSymbols,
  target?: Currency
): Promise<Prices | void> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }
  const pricePromises = [];

  if (token.extensions?.binanceId) {
    pricePromises.push(fetchBinancePriceByToken(token, source ?? ""));
  }
  if (token.extensions?.coingeckoId) {
    pricePromises.push(fetchCoinGeckoPriceByToken(token, source ?? "", target));
  }

  return promiseRace(pricePromises);
}
