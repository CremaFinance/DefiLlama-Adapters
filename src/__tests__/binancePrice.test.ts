import fetch from "jest-fetch-mock";

import { coinSymbols } from "../services/domain/coinSymbols";
import { fetchBinancePriceBySymbol } from "../services/markets/binancePrice";

beforeEach(() => {
  fetch.resetMocks();
});

test("binance returns proper response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ mins: 5, price: 235.83524298 }));

  const data = await fetchBinancePriceBySymbol(coinSymbols.SOL);
  expect(data.SOL?.usd).toEqual(235.83524298);
});
