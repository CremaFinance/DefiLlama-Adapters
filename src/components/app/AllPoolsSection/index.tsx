import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import PoolRow from "components/molecules/PoolRow";

import { exampleData } from "./constants";

const AllPoolsSection = () => {
  const { t } = useTranslation();
  return (
    <Flex
      flexDir="column"
      marginX={{ base: "10px", xl: "170px" }}
      marginTop="40px"
      alignItems="stretch"
    >
      <Flex
        flexDirection="row"
        marginBottom="14px"
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
      {exampleData.map((props) => (
        <Flex
          flexDirection="row"
          // eslint-disable-next-line react/prop-types
          key={`${props.currencies.left}-${props.currencies?.right}`}
          marginBottom="14px"
          justifyContent="center"
        >
          <PoolRow {...props} />
        </Flex>
      ))}
    </Flex>
  );
};

export default AllPoolsSection;
