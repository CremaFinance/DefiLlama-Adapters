import { Connection, PublicKey } from "@solana/web3.js";

import { FetchPools, Pool } from "../../domain/pool";
import { Provider } from "../../domain/providers";
import { coinSymbols, Prices } from "services/domain/coinSymbols";
import { DEFAULT_ENDPOINT } from "utils/web3/endpoints";

import { synthetifyPools } from "./config";
import { SynthetifyStatsResponse } from "./pool";
import { synthetifyPoolAddress } from "./poolAddress";

const connection = new Connection(DEFAULT_ENDPOINT.endpoint, "recent");

const getSynthetifyApiData = async (): Promise<SynthetifyStatsResponse[]> => {
  const response = await fetch(
    `https://api.synthetify.io/stats/${
      DEFAULT_ENDPOINT.name === "mainnet-beta"
        ? "mainnet"
        : DEFAULT_ENDPOINT.name
    }`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const getSynthetifyData: FetchPools = async (prices: Prices) => {
  const apiData = await getSynthetifyApiData();

  const lastApiSnapshot = apiData.at(-1);
  const debt = lastApiSnapshot?.debtPoolUSD ?? 0;

  const snyApr =
    debt === 0 ? 0 : (((10000 * (prices?.SNY?.usd ?? 0)) / debt) * 52) / 100;

  const snyApy = ((snyApr / 52 + 1) ** 52 - 1) * 10000;

  if (DEFAULT_ENDPOINT.name !== "mainnet-beta") {
    return {
      [synthetifyPoolAddress.SNY_mSOL]: {
        ...synthetifyPools[synthetifyPoolAddress.SNY_mSOL],
        totalLockedValue: lastApiSnapshot?.collateralAll ?? 0,
        liq: lastApiSnapshot?.collateralAll ?? 0,
        apy: snyApy,
        tradingApy: snyApy,
        rewards: {},
      } as Pool,
    };
  }

  const rawMSOLBalance = await connection.getTokenAccountBalance(
    new PublicKey(synthetifyPoolAddress.SNY_mSOL)
  );

  const mSOLBalance = rawMSOLBalance.value.uiAmount;

  const mSolTvl =
    mSOLBalance === null ? 0 : mSOLBalance * (prices?.mSOL?.usd ?? 0);

  const mSolApr =
    mSolTvl === 0
      ? 0
      : (((9700 * (prices?.MNDE?.usd ?? 0)) / mSolTvl) * 52) / 100;

  const mSolApy = ((mSolApr / 52 + 1) ** 52 - 1) * 10000;

  return {
    [synthetifyPoolAddress.SNY_mSOL]: {
      ...synthetifyPools[synthetifyPoolAddress.SNY_mSOL],
      totalLockedValue: lastApiSnapshot?.collateralAll ?? 0,
      liq: lastApiSnapshot?.collateralAll ?? 0,
      apy: snyApy + mSolApy,
      tradingApy: snyApy,
      rewards: {
        [coinSymbols.MNDE]: {
          ...(synthetifyPools[synthetifyPoolAddress.SNY_mSOL].rewards?.[
            coinSymbols.MNDE
          ] ?? {}),
          apy: mSolApy,
        },
      },
    } as Pool,
  };
};

export const synthetify: Provider = {
  fetchPools: getSynthetifyData,
  pools: synthetifyPools,
};
