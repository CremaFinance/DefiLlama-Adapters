import { coinSymbols, CoinSymbols, Prices } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { Currency } from "../domain/currency";

import { fetchBinancePrice } from "./binancePrice";
import { fetchCoinGeckoPrice } from "./coinGeckoPrice";

export async function fetchCoinPrice(
  source: CoinSymbols,
  target?: Currency
): Promise<Prices | void> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }

  return fetchBinancePrice(source).then(
    (price) => price,
    () =>
      fetchCoinGeckoPrice(coinSymbols.SOL, target).then(
        (price) => price,
        (e) => {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      )
  );
}
