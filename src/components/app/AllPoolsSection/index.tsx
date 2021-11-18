import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import Heading from "components/atoms/Heading";
import PoolRow from "components/molecules/PoolRow";
import { usePools } from "hooks/usePools";

const AllPoolsSection = () => {
  const { t } = useTranslation();

  const pools = usePools();

  return (
    <Flex
      flexDir="column"
      marginX={{ base: "16px", lg: "65px", xl: "170px" }}
      marginTop="40px"
      alignItems="stretch"
    >
      <Flex marginBottom="22px" justifyContent="center">
        <Heading type="heading-xsm">
          {t("appPage.all-pools-section.title")}
        </Heading>
      </Flex>
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
            marginBottom="14px"
            justifyContent="center"
          >
            <PoolRow
              {...pool}
              provider={{ logo: pool.logoURI ?? "", shortName: pool.provider }}
              rewardPerDay={{ marinade: 0, provider: 0 }}
              currencies={{
                left: { logo: pool.tokenA, shortName: pool.tokenA },
                right: {
                  logo: pool?.tokenB ?? "",
                  shortName: pool?.tokenB ?? "",
                },
              }}
              anualPercentageYield={{ trading: 0, emission: 0, doubleDip: 0 }}
              onMainClick={() => {}}
              onSecondaryClick={() => {}}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default AllPoolsSection;
