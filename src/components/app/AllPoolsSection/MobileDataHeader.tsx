import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";

import type { DataHeaderProps, SortingState } from "./constants";
import { COLUMNS } from "./constants";

const MobileDataHeader = ({ setSorting }: DataHeaderProps) => {
  const { t } = useTranslation();

  const tPrefix = "appPage.all-pools-section.mobile-sorter";

  const sortingOptions: Record<
    string,
    { label: string | undefined; config: SortingState }
  > = useMemo(
    () => ({
      APYASC: {
        label: t(`${tPrefix}.apy-asc`),
        config: {
          column: COLUMNS.APY,
          isInverted: false,
        },
      },
      APYDSC: {
        label: t(`${tPrefix}.apy-dsc`),
        config: {
          column: COLUMNS.APY,
          isInverted: true,
        },
      },
      PAIR: {
        label: t(`${tPrefix}.pair`),
        config: {
          column: COLUMNS.PAIR,
          isInverted: false,
        },
      },
      PROVIDER: {
        label: t(`${tPrefix}.provider`),
        config: {
          column: COLUMNS.PROVIDER,
          isInverted: false,
        },
      },
      TLVASC: {
        label: t(`${tPrefix}.tlv-asc`),
        config: {
          column: COLUMNS.TLV,
          isInverted: false,
        },
      },
      TLVDSC: {
        label: t(`${tPrefix}.tlv-dsc`),
        config: {
          column: COLUMNS.TLV,
          isInverted: true,
        },
      },
    }),
    [t]
  );

  const [sortingKey, setSortingKey] = useState<string>("PROVIDER");

  useEffect(() => {
    setSorting?.(sortingOptions[sortingKey].config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingKey]);

  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      fontWeight="bold"
      fontSize="14.4px"
      lineHeight="140%"
      marginBottom="24px"
      zIndex={7}
    >
      <Text marginLeft="2px" fontWeight="normal">
        {t(`${tPrefix}.label`)}
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          flex={1}
          bg={colors.white}
          borderRadius="6px"
          border="1px solid #E2E8F0"
          _focus={{ boxShadow: "none" }}
          rightIcon={<BsChevronDown />}
        >
          <Text textAlign="left" fontWeight="500">
            {sortingOptions[sortingKey]?.label}
          </Text>
        </MenuButton>
        <MenuList>
          {Object.entries(sortingOptions).map(([key, val]) => (
            <MenuItemOption
              key={key}
              onClick={() => setSortingKey(key)}
              bg={key === sortingKey ? "gray.100" : "white"}
              _hover={{}}
              isFocusable={false}
              isChecked={key === sortingKey}
            >
              {val.label}
            </MenuItemOption>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MobileDataHeader;
