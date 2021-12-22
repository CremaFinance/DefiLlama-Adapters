import { useQueries } from "react-query";

import { fetchCoinPrice } from "../services/markets/coinPrice";
import { CoinSymbols, Prices } from "services/domain/coinSymbols";

const refetchInterval = 5 * 60 * 1000;

export function usePrices(coinSymbols: CoinSymbols[]): Prices {
  const priceQueries = coinSymbols.map((token) => ({
    queryKey: ["price", token],
    queryFn: () => fetchCoinPrice(token),
    refetchInterval,
  }));

  const queries = useQueries(priceQueries);
  return queries.reduce((acc, result) => {
    const { data } = result;
    return { ...acc, ...data };
  }, {}) as Prices;
}
