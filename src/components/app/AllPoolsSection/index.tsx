import { Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { usePools } from "../../../hooks/usePools";
import PoolRow from "components/molecules/PoolRow";
import { Pool } from "services/domain/pool";

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
              ? acc.concat(Object.values(result.data).map((market) => market))
              : acc,
          [] as Pool[]
        )
        .sort((a, b) => {
          const ratio = COLUMNS_SORTER[sorting.column](a, b);
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
          <Flex
            flexDirection="row"
            key={`${pool.address}-${pool.provider}`}
            justifyContent="center"
          >
            <PoolRow pool={pool} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default AllPoolsSection;
