import { useQuery } from "react-query";

import { fetchCoinPrice } from "../services/markets/coinPrice";
import { CoinSymbols } from "services/domain/coinSymbols";

const refetchInterval = 5000;

export const usePrice = (coinSymbol: CoinSymbols) => {
  return useQuery(
    [`price-${coinSymbol}`, coinSymbol],
    () => fetchCoinPrice(coinSymbol),
    { refetchInterval }
  );
};
