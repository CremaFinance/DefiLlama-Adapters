import { CoinSymbols, Prices } from "../domain/coinSymbols";
import { coinTokens } from "../domain/coinTokens";
import { currency, Currency } from "../domain/currency";
import { Token } from "../domain/token";

// todo - coingecko allows arrays so think about refactoring for that e.g.
// https://api.coingecko.com/api/v3/simple/price?ids=marinade,solana&vs_currencies=usd

export async function fetchCoinGeckoPriceByToken(
  token: Token,
  source: CoinSymbols,
  target?: Currency
): Promise<Prices> {
  if (!token.extensions?.coingeckoId) {
    throw new Error(
      `must configure source.extensions.coingeckoId for ${token.name}`
    );
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      token.extensions?.coingeckoId
    }&vs_currencies=${target ?? currency.usd}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return { [source]: result[token.extensions?.coingeckoId] };
}

export async function fetchCoinGeckoPriceBySymbol(
  source: CoinSymbols,
  target?: Currency
): Promise<Prices> {
  const token = coinTokens[source];
  if (!token) {
    throw new Error(`no config for ${source}`);
  }

  return fetchCoinGeckoPriceByToken(token, source, target);
}
