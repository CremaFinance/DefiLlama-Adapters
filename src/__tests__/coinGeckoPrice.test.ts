import fetch from "jest-fetch-mock";

import { coinSymbols } from "../services/domain/coinSymbols";
import { fetchCoinGeckoPriceBySymbol } from "../services/markets/coinGeckoPrice";

beforeEach(() => {
  fetch.resetMocks();
});

test("coinGecko returns proper response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ solana: { usd: 239.21 } }));

  const data = await fetchCoinGeckoPriceBySymbol(coinSymbols.SOL);
  expect(data.SOL?.usd).toEqual(239.21);
});
