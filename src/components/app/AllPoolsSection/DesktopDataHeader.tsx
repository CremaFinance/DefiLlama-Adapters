import { Flex } from "@chakra-ui/react";

import { useTranslation } from "../../../hooks/useTranslation";

import type { DataHeaderProps } from "./constants";
import { COLUMNS } from "./constants";
import DesktopSortingColumn from "./DesktopSortingColumn";

const DesktopDataHeader = ({ sorting, setSorting }: DataHeaderProps) => {
  const { t } = useTranslation();
  return (
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
        <DesktopSortingColumn
          flex={1}
          maxWidth="208px"
          column={COLUMNS.PAIR}
          setSorting={setSorting}
          sorting={sorting}
        >
          {t("appPage.all-pools-section.pair")}
        </DesktopSortingColumn>
        <DesktopSortingColumn
          flex={{ base: undefined, lg: 1 }}
          maxWidth="230px"
          minWidth="120px"
          column={COLUMNS.APY}
          setSorting={setSorting}
          sorting={sorting}
        >
          {t("appPage.all-pools-section.apy")}
        </DesktopSortingColumn>
        <DesktopSortingColumn
          flex={1}
          maxWidth="274px"
          paddingLeft={{ base: "1rem", lg: "0" }}
          column={COLUMNS.TLV}
          setSorting={setSorting}
          sorting={sorting}
        >
          {t("appPage.all-pools-section.tvl")}
        </DesktopSortingColumn>
        <Flex
          flex={{ base: undefined, lg: 1 }}
          maxWidth="193px"
          marginRight="145px"
        >
          <DesktopSortingColumn
            marginLeft={{ base: "1rem", lg: "0" }}
            marginRight={{ base: "8px", xl: "1rem" }}
            width="4rem"
            column={COLUMNS.PROVIDER}
            setSorting={setSorting}
            sorting={sorting}
          >
            {t("appPage.all-pools-section.provider")}
          </DesktopSortingColumn>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DesktopDataHeader;
