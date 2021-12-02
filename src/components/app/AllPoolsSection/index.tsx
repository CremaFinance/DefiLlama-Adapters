import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import PoolRow from "components/molecules/PoolRow";
import { usePools } from "hooks/usePools";
import { Pool } from "services/domain/pool";

const AllPoolsSection = () => {
  const { t } = useTranslation();

  const results = usePools();
  const pools = results.reduce(
    (acc, result) =>
      result.data
        ? acc.concat(Object.values(result.data).map((market) => market))
        : acc,
    [] as Pool[]
  );

  return (
    <Flex
      flexDir="column"
      marginX={{ base: "16px", lg: "65px", xl: "170px" }}
      alignItems="stretch"
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        flexDirection="row"
        marginBottom="8px"
        justifyContent="center"
        fontWeight="bold"
        fontSize="14.4px"
        lineHeight="140%"
      >
        <Flex flex={1} maxWidth="1100px" paddingX="1.5rem">
          <Flex flex={1} maxWidth="208px">
            {t("appPage.all-pools-section.pair")}
          </Flex>
          <Flex
            flex={{ base: undefined, lg: 1 }}
            maxWidth="230px"
            minWidth="120px"
          >
            {t("appPage.all-pools-section.apy")}
          </Flex>
          <Flex
            flex={1}
            maxWidth="274px"
            paddingLeft={{ base: "1rem", lg: "0" }}
          >
            {t("appPage.all-pools-section.tvl")}
          </Flex>
          <Flex
            flex={{ base: undefined, lg: 1 }}
            maxWidth="193px"
            marginRight="145px"
          >
            <Flex
              marginLeft={{ base: "1rem", lg: "0" }}
              marginRight={{ base: "8px", xl: "1rem" }}
              width="4rem"
            >
              {t("appPage.all-pools-section.provider")}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir={{ base: "row", lg: "column" }}
        justifyContent="center"
        flexWrap={{ base: "wrap", lg: "nowrap" }}
      >
        {pools?.map((pool) => (
          <Flex
            flexDirection="row"
            key={`${pool.address}`}
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
