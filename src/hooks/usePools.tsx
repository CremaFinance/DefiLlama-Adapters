import { useQueries, QueryOptions } from "react-query";

import { CoinSymbols, Prices } from "../services/domain/coinSymbols";
import { MarketPools } from "../services/domain/market";
import { providers } from "../services/domain/providers";
import { fetchCoinPrice } from "../services/markets/coinPrice";

const refetchInterval = 10 * 1000;

export const usePools = () => {
  const priceTokens = Object.values(providers).reduce((acc, provider) => {
    return acc.concat(provider.tokenList.map((token) => token));
  }, [] as CoinSymbols[]);

  const uniqPriceTokens = Array.from(new Set(priceTokens));
  const priceQueries = uniqPriceTokens.map((token) => ({
    queryKey: ["price", token],
    queryFn: () => fetchCoinPrice(token),
    refetchInterval,
  }));

  // deliberately fetching individual prices as this will lead to more effective caching
  const priceQueriesResults = useQueries(priceQueries);
  const prices = priceQueriesResults.reduce((acc, result) => {
    const { data } = result;
    return { ...acc, ...data };
  }, {}) as Prices;

  const providerQueries: QueryOptions<MarketPools>[] = Object.entries(
    providers
  ).map(([key, provider]) => {
    return {
      queryKey: ["provider", key],
      queryFn: () => provider.fetchPools(prices),
      enabled: provider.tokenList.every((t) => prices[t]),
      placeholderData: provider.pools,
      refetchInterval,
    };
  });

  return useQueries(providerQueries);
};
