import { Flex } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useMemo, useState } from "react";

import type { Stats } from "../../../contexts/StatsContext";
import { useStats } from "../../../contexts/StatsContext";
import type { Pool, PoolConfig } from "../../../services/domain/pool";
import { providerKeys } from "../../../services/pools/index";
import CallToActionSection from "../CallToActionSection";
import MemoPoolRow from "components/molecules/PoolRow";
import { useQuarryProvider } from "contexts/QuaryContext";
import { usePools } from "hooks/usePools";
import { usePrices } from "hooks/usePrices";
import type { Prices } from "services/domain/coinSymbols";
import { coinSymbols } from "services/domain/coinSymbols";
import type { Farm } from "services/domain/farm";

import type { SortingState } from "./constants";
import { COLUMNS, COLUMNS_SORTER } from "./constants";
import DesktopDataHeader from "./DesktopDataHeader";
import MobileDataHeader from "./MobileDataHeader";

const mLPRowStats = (mLP: Farm, prices: Prices, stats: Stats) => {
  const solPrice = prices[coinSymbols.SOL]?.usd;
  const mSOLPrice =
    solPrice &&
    stats?.mSOLvsSOLParity !== null &&
    solPrice * stats.mSOLvsSOLParity;
  const mndePrice = prices[coinSymbols.MNDE]?.usd;

  const MSOL_SOL_TVL =
    solPrice &&
    stats?.liqPoolBalance !== null &&
    stats?.liqPoolMSolAmount !== null &&
    mSOLPrice &&
    mSOLPrice !== null &&
    (stats.liqPoolBalance * solPrice + stats.liqPoolMSolAmount * mSOLPrice) /
      LAMPORTS_PER_SOL;
  const mLPFarmAnnualRewards =
    mLP?.quarry?.quarryData.annualRewardsRate.toNumber();
  const annualRewardsUSD =
    mLPFarmAnnualRewards !== undefined &&
    mndePrice &&
    (mLPFarmAnnualRewards * mndePrice) / LAMPORTS_PER_SOL;

  const MSOL_SOL_APR =
    annualRewardsUSD && MSOL_SOL_TVL && (annualRewardsUSD / MSOL_SOL_TVL) * 100;

  return { MSOL_SOL_TVL, MSOL_SOL_APR };
};

const mSolRowStats = (mSOL: Farm, prices: Prices, stats: Stats) => {
  const solUSD =
    prices[coinSymbols.SOL]?.usd && Number(prices[coinSymbols.SOL]?.usd);
  const mSolUSD =
    solUSD && stats?.mSOLvsSOLParity !== null
      ? solUSD * stats.mSOLvsSOLParity
      : undefined;

  const mndeUSD =
    prices[coinSymbols.MNDE]?.usd && Number(prices[coinSymbols.MNDE]?.usd);
  const totalDeposited = mSOL?.quarry?.quarryData?.totalTokensDeposited;

  const MSOL_TVL =
    mSolUSD && totalDeposited
      ? (mSolUSD * totalDeposited.toNumber()) / LAMPORTS_PER_SOL
      : undefined;
  const mSOLFarmAnnualRewards =
    mSOL?.quarry?.quarryData?.annualRewardsRate.toNumber();

  const annualRewardsUSD =
    mSOLFarmAnnualRewards &&
    mndeUSD &&
    (mSOLFarmAnnualRewards * mndeUSD) / LAMPORTS_PER_SOL;
  const MSOL_APR =
    MSOL_TVL && annualRewardsUSD ? (annualRewardsUSD / MSOL_TVL) * 100 : 0;
  return { MSOL_TVL, MSOL_APR };
};

const AllPoolsSection = () => {
  const [sorting, setSorting] = useState<SortingState>({
    column: COLUMNS.PROVIDER,
    isInverted: true,
  });

  const {
    farms: { mLP, mSOL },
  } = useQuarryProvider();
  const prices = usePrices([coinSymbols.SOL, coinSymbols.MNDE]);
  const stats = useStats();

  const results = usePools({
    [providerKeys.MNDE]: {
      tvl: stats.liqPoolBalance,
      ...mLPRowStats(mLP, prices, stats),
      ...mSolRowStats(mSOL, prices, stats),
    },
  });

  const sortedPools = useMemo(
    () =>
      results
        .reduce(
          (acc, result) =>
            result.data
              ? acc.concat(
                  Object.entries(result.data).map(([key, pool]) => {
                    return { id: key, pool };
                  })
                )
              : acc,
          [] as { id: string; pool: Pool | PoolConfig }[]
        )
        .sort((a, b) => {
          const ratio = COLUMNS_SORTER[sorting.column](a.pool, b.pool);
          return sorting.isInverted ? ratio : -ratio;
        }),
    [results, sorting]
  );

  return (
    <Flex
      flexDir="column"
      marginX={{ base: "16px", lg: "65px", xl: "170px" }}
      alignItems="stretch"
    >
      <DesktopDataHeader sorting={sorting} setSorting={setSorting} />
      <MobileDataHeader sorting={sorting} setSorting={setSorting} />
      <Flex
        flexDir={{ base: "row", lg: "column" }}
        justifyContent="center"
        flexWrap={{ base: "wrap", lg: "nowrap" }}
        zIndex={6}
      >
        {sortedPools?.map((pool) => (
          <Flex
            flexDirection="row"
            key={`${pool.id}`}
            justifyContent="center"
            width="100%"
          >
            <MemoPoolRow pool={pool.pool} />
          </Flex>
        ))}
      </Flex>
      <CallToActionSection />
    </Flex>
  );
};

export default AllPoolsSection;
