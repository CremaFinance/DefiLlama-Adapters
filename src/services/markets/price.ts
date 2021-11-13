import { CoinSymbols } from "../domain/coinSymbols";
import { Currency } from "../domain/currency";
import { coinTokens } from "services/domain/coinTokens";

export type Price = {
  [key in Currency]?: number;
};
export type Prices = {
  [key in CoinSymbols]?: Price;
};

// todo fallback mechanism for binance etc
// mapper etc

// todo - coingecko allows arrays so think about refactoring for that e.g.
// https://api.coingecko.com/api/v3/simple/price?ids=marinade,solana&vs_currencies=usd

export async function fetchCoinGeckoPrice(
  source: CoinSymbols,
  target?: Currency
): Promise<Prices> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }
  if (!token.extensions?.coingeckoId) {
    throw new Error(
      `must configure source.extensions.coingeckoId for ${token.name}`
    );
  }
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      token.extensions?.coingeckoId
    }&vs_currencies=${target ?? Currency.usd}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();

  return { [source]: result[token.extensions?.coingeckoId] };
}
