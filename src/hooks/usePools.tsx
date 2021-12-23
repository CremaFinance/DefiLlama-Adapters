import { useQueries } from "react-query";

import { CoinSymbols, Prices } from "../services/domain/coinSymbols";
import { fetchCoinPrice } from "../services/markets/coinPrice";
import { providers, ProviderOptions } from "../services/pools";
import { getProviderTokens } from "../utils/tokens-list";

const refetchInterval = 5 * 60 * 1000;

export const usePools = (providerOptions?: ProviderOptions) => {
  const priceTokens = Object.values(providers).reduce((acc, provider) => {
    return acc.concat(getProviderTokens(provider).map((token) => token));
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

  const providerQueries = Object.entries(providers).map(([key, provider]) => {
    return {
      queryKey: ["provider", key],
      queryFn: () => {
        const options = providerOptions ? providerOptions[key] : undefined;
        return provider.fetchPools(prices, options);
      },
      enabled: getProviderTokens(provider).every((t) => prices[t]),
      placeholderData: provider.pools,
      refetchInterval,
    };
  });

  return useQueries(providerQueries);
};
