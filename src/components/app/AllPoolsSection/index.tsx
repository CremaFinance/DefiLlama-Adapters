import { Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { Pool, PoolConfig } from "../../../services/domain/pool";
import PoolRow from "components/molecules/PoolRow";
import { usePools } from "hooks/usePools";

import { COLUMNS, COLUMNS_SORTER, SortingState } from "./constants";
import DesktopDataHeader from "./DesktopDataHeader";
import MobileDataHeader from "./MobileDataHeader";

const AllPoolsSection = () => {
  const [sorting, setSorting] = useState<SortingState>({
    column: COLUMNS.PROVIDER,
    isInverted: false,
  });

  const results = usePools();

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
      >
        {sortedPools?.map((pool) => (
          <Flex flexDirection="row" key={`${pool.id}`} justifyContent="center">
            <PoolRow pool={pool.pool} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default AllPoolsSection;
