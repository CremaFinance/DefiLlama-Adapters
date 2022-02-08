import { Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { useStats } from "../../../contexts/StatsContext";
import type { Pool, PoolConfig } from "../../../services/domain/pool";
import { providerKeys } from "../../../services/pools/index";
import CallToActionSection from "../CallToActionSection";
import PoolRow from "components/molecules/PoolRow";
import { usePools } from "hooks/usePools";

import type { SortingState } from "./constants";
import { COLUMNS, COLUMNS_SORTER } from "./constants";
import DesktopDataHeader from "./DesktopDataHeader";
import MobileDataHeader from "./MobileDataHeader";

const AllPoolsSection = () => {
  const [sorting, setSorting] = useState<SortingState>({
    column: COLUMNS.PROVIDER,
    isInverted: true,
  });

  const { liqPoolBalance } = useStats();
  const results = usePools({
    [providerKeys.MNDE]: { tvl: liqPoolBalance },
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
            <PoolRow pool={pool.pool} />
          </Flex>
        ))}
      </Flex>
      <CallToActionSection />
    </Flex>
  );
};

export default AllPoolsSection;
