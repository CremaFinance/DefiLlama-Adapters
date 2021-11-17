import { useQueries, QueryOptions } from "react-query";

import { CoinSymbols, Prices } from "../services/domain/coinSymbols";
import { MarketPools } from "../services/domain/market";
import { fetchCoinPrice } from "../services/markets/coinPrice";
import { orca } from "../services/pools/orca";

export const providerKeys = {
  ORCA: "orca",
  PORT: "port",
} as const;

export type Providers = typeof providerKeys[keyof typeof providerKeys];

export const providers = {
  [providerKeys.ORCA]: orca,
};

const refetchInterval = 10 * 1000;

// this param will become an optional provider filter in future
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
    const pricesAvailable = provider.tokenList.reduce((acc, token) => {
      if (prices[token] && acc) {
        return true;
      }
      return false;
    }, true);
    return {
      queryKey: ["provider", key],
      queryFn: () => provider.fetchPools(prices),
      enabled: pricesAvailable,
      placeholderData: provider.pools,
      refetchInterval,
    };
  });

  return useQueries(providerQueries);
};
