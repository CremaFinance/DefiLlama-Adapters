import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

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
      width={{ base: "85vw", xl: "1100px" }}
      height={{ base: "90vh", xl: "770px" }}
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
          border="1px solid #727f96"
          borderRadius="5px"
          height="35px"
          width="90px"
          alignItems="center"
        >
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <MText fontWeight="700" fontSize="14.4px" ml="10px">
              {t("appPage.validators-button-basic")}
            </MText>
            <Box transform="rotate(90deg)" mr="13px">
              <IoIosArrowForward fontSize="16px" />
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <ValidatorTable />
    </Box>
  );
};

export default ValidatorsSection;
