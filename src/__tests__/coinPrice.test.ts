import fetch from "jest-fetch-mock";

import { coinSymbols } from "../services/domain/coinSymbols";
import { fetchCoinPrice } from "../services/markets/coinPrice";

beforeEach(() => {
  fetch.resetMocks();
});

test("coinPrice returns binance response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ mins: 5, price: 235.83524298 }));

  const data = await fetchCoinPrice(coinSymbols.SOL);
  expect(data?.SOL?.usd).toEqual(235.83524298);
});

test("coinPrice returns coingecko response", async () => {
  fetch
    .mockResponseOnce(JSON.stringify({}), { status: 404 })
    .mockResponseOnce(JSON.stringify({ solana: { usd: 239.21 } }));

  const data = await fetchCoinPrice(coinSymbols.SOL);
  expect(data?.SOL?.usd).toEqual(239.21);
});
