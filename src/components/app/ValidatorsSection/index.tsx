import { Box, Flex, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import MText from "../../atoms/Text";

import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import ValidatorTable from "./ValidatorTable";

const ValidatorsSection = () => {
  const { t } = useTranslation();

  const TRANSACTIONS = t("appPage.validators-menu-transactions");
  const STAKES = t("appPage.validators-menu-stakes");
  const PORTFOLIO = t("appPage.validators-menu-portfolio");
  const SPL_TOKEN_TXS = t("appPage.validators-menu-spl-token-txs");
  const DEX_ORDERS = t("appPage.validators-menu-dex-orders");
  const MENU_ITEMS = [
    TRANSACTIONS,
    STAKES,
    PORTFOLIO,
    SPL_TOKEN_TXS,
    DEX_ORDERS,
  ];
  const [selectedMenu, setSelectedMenu] = useState(STAKES);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ base: "90vw", xl: "1100px" }}
      height={{ base: "90vh", xl: "770px" }}
      maxHeight="770px"
      bg="white"
      marginLeft="auto"
      marginRight="auto"
      border="1px solid #e2e8f0"
      borderRadius="8px"
      overflow="auto"
    >
      <Flex
        direction="row"
        mt="25px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Menu Items Section */}
        <Flex direction="row" alignItems="center">
          <Menu
            MENUS={MENU_ITEMS}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
          <MobileMenu
            MENUS={MENU_ITEMS}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </Flex>

        <Flex
          mr="15px"
          mt="10px"
          border={{ base: "none", lg: "1px solid #727f96" }}
          borderRadius="5px"
          height="35px"
          width="90px"
          alignItems="center"
        >
          {/* Desktop button */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="basic-advanged-toggle" fontSize="14px">
                <MText fontWeight="700" fontSize="14.4px" ml="10px" mt="8px">
                  {t("appPage.validators-button-basic")}
                </MText>
              </FormLabel>
              <BsChevronDown />
            </FormControl>
          </Flex>

          {/* Mobile Button */}
          <Flex
            display={{ base: "flex", lg: "none" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            marginLeft={{ base: "25px", sm: "10px" }}
          >
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="basic-advanged-toggle" fontSize="14px">
                {t("appPage.validators-button-basic")}
              </FormLabel>
              <Switch id="basic-advanged-toggle" mb="5px" />
            </FormControl>
          </Flex>
        </Flex>
      </Flex>

      <ValidatorTable />
    </Box>
  );
};

export default ValidatorsSection;
