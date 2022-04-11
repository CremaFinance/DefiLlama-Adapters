/* eslint-disable sonarjs/cognitive-complexity */
import BigNumber from "bignumber.js";

import { updatePoolRewards } from "../../../utils/update-pool-rewards";
import { coinSymbols } from "../../domain/coinSymbols";
import type { Pool } from "../../domain/pool";
import type { Prices } from "services/domain/coinSymbols";

import { solendPools } from "./config";
import type { SolendReserveResponse, SolendRewardResponse } from "./solendPool";

const WAD = "1".concat(Array(18 + 1).join("0"));

const fetchSolendExternalRewards = async (): Promise<SolendRewardResponse> => {
  const response = await fetch(
    `https://api.solend.fi/liquidity-mining/external-reward-stats-v2`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const fetchSolendRewards = async (): Promise<SolendRewardResponse> => {
  const response = await fetch(
    `https://api.solend.fi/liquidity-mining/reward-stats-v2`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const fetchSolendReserve = async (): Promise<SolendReserveResponse> => {
  const response = await fetch(
    `https://api.solend.fi/v1/reserves/?ids=CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const mapSolendResponse = (
  rewards: {
    slndRewards: string;
    externalRewards: string;
  },
  reserve: SolendReserveResponse["results"][0]["reserve"],
  prices: Prices
) => {
  const poolsArray = Object.entries(solendPools).map(([poolkey, incoming]) => {
    let pool = incoming;
    if (pool.providerId) {
      const price = new BigNumber(reserve.liquidity.marketPrice).dividedBy(WAD);
      const poolSize = new BigNumber(reserve.liquidity.availableAmount)
        .plus(
          new BigNumber(reserve.liquidity.borrowedAmountWads).dividedBy(WAD)
        )
        .dividedBy(10 ** reserve.liquidity.mintDecimals);
      const tvl = new BigNumber(reserve.liquidity.availableAmount).dividedBy(
        10 ** reserve.liquidity.mintDecimals
      );

      pool.liq = poolSize.multipliedBy(price).toNumber();
      pool.totalLockedValue = tvl.multipliedBy(price).toNumber();
      pool.rewards = {
        [coinSymbols.MNDE]: {
          aprDescription: "Emission",
          dailyRate: new BigNumber(rewards.externalRewards)
            .dividedBy(10 ** 36)
            .dividedBy(365)
            .toNumber(),
        },
        [coinSymbols.SLND]: {
          aprDescription: "Liquidity Mining",
          dailyRate: new BigNumber(rewards.slndRewards)
            .dividedBy(10 ** 36)
            .dividedBy(365)
            .toNumber(),
        },
      };
      pool.apy = 0;
      pool = updatePoolRewards(pool as Pool, prices);
    }
    return { [poolkey]: pool as Pool };
  });

  // convert to map
  return poolsArray.reduce((acc, pool) => {
    return { ...acc, ...pool };
  }, {});
};

function getLatestRewardRate(
  rewardRates: Array<{
    beginningSlot: number;
    rewardRate: string;
    name?: string;
  }>,
  slot: number
) {
  return rewardRates
    .filter((rr) => slot >= rr.beginningSlot)
    .reduce((v1, v2) => (v1.beginningSlot > v2.beginningSlot ? v1 : v2), {
      beginningSlot: 0,
      rewardRate: "0",
    });
}

export const getSolend = async (prices: Prices) => {
  const [reserve, slndRewards, externalRewards] = await Promise.all([
    fetchSolendReserve(),
    fetchSolendRewards(),
    fetchSolendExternalRewards(),
  ]);

  const reserveData = reserve.results[0].reserve;

  const lastSlot = Number(reserveData.lastUpdate.slot);

  const rewards = {
    slndRewards: getLatestRewardRate(
      slndRewards["4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY"]
        .mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So.supply.rewardRates,
      lastSlot
    ).rewardRate,
    externalRewards: getLatestRewardRate(
      externalRewards["4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY"]
        .mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So.supply.rewardRates,
      lastSlot
    ).rewardRate,
  };

  return mapSolendResponse(rewards, reserveData, prices);
};

export const solend = {
  fetchPools: getSolend,
  pools: solendPools,
};
