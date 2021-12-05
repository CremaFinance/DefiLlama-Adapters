import {
  Box,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import MText from "../../atoms/Text";

import DesktopMenu from "./Menu";
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
      height={{ base: "min(90vh, 100vh - 120px)", xl: "770px" }}
      maxHeight="770px"
      bg="white"
      marginLeft="auto"
      marginRight="auto"
      marginTop="80px"
      border="1px solid #e2e8f0"
      borderRadius="8px"
    >
      <Flex
        direction="row"
        mt="25px"
        mb={{ base: "10px", xl: "none" }}
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Menu Items Section */}
        <Flex direction="row" alignItems="center">
          <DesktopMenu
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
            <Menu>
              <MenuButton
                variant="unstyled"
                as={Button}
                width="200px"
                height="40px"
                border="1px solid #727f96"
                borderRadius="5px"
                rightIcon={
                  <Box position="relative" right="10px">
                    <BsChevronDown />
                  </Box>
                }
                fontSize="16px"
                fontWeight="normal"
                fontFamily="Maven Pro"
                display="flex"
              >
                <MText> {t("appPage.validators-button-basic")}</MText>
              </MenuButton>
              <MenuList>
                <MenuItem>{t("Basic")}</MenuItem>
                <MenuItem>{t("Advanced")}</MenuItem>
              </MenuList>
            </Menu>
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

      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#CCCCCC",
            borderRadius: "24px",
          },
          "&::-webkit-scrollbar:horizontal": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track::horizontal": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb::horizontal": {
            background: "#CCCCCC",
            borderRadius: "24px",
          },
        }}
        pt={{ base: "0px", xl: "none" }}
      >
        <ValidatorTable />
      </Box>
    </Box>
  );
};

export default ValidatorsSection;
