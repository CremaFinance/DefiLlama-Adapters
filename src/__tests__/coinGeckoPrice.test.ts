import fetch from "jest-fetch-mock";

import { coinSymbols } from "../services/domain/coinSymbols";
import { fetchCoinGeckoPrice } from "../services/markets/coinGeckoPrice";

beforeEach(() => {
  fetch.resetMocks();
});

test("coinGecko returns proper response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ solana: { usd: 239.21 } }));

  const data = await fetchCoinGeckoPrice(coinSymbols.SOL);
  expect(data?.sol?.usd).toEqual(239.21);
});
