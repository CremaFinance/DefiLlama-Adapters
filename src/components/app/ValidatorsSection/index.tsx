import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import MText from "../../atoms/Text";

import ValidatorTable from "./ValidatorTable";

const ValidatorsSection = () => {
  const { t } = useTranslation();
  const TRANSACTIONS = t("appPage.validators-menu-transactions");
  const STAKES = t("appPage.validators-menu-stakes");
  const PORTFOLIO = t("appPage.validators-menu-portfolio");
  const SPL_TOKEN_TXS = t("appPage.validators-menu-spl-token-txs");
  const DEX_ORDERS = t("appPage.validators-menu-dex-orders");
  const MENUS = [TRANSACTIONS, STAKES, PORTFOLIO, SPL_TOKEN_TXS, DEX_ORDERS];
  const [selectedMenu, setSelectedMenu] = useState(STAKES);

  return (
    <Box
      display="flex"
      flexDirection="column"
      w="1100px"
      bg="white"
      marginLeft="auto"
      marginRight="auto"
      mt="100px"
      mb="100px"
      border="1px solid #e2e8f0"
      borderRadius="8px"
    >
      <Flex
        direction="row"
        mt="25px"
        mx="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex direction="row" alignItems="center">
          {MENUS.map((menu) => (
            <Box height="10px">
              {menu === selectedMenu ? (
                <Box
                  cursor="pointer"
                  px="16px"
                  borderBottom="3px solid #308d8a"
                  transition="ease-in"
                  transitionDuration="0.1s"
                >
                  <MText fontSize="18px" fontWeight="bold" color="#308d8a">
                    {menu}
                  </MText>
                </Box>
              ) : (
                <Box
                  cursor="pointer"
                  px="16px"
                  onClick={() => setSelectedMenu(menu)}
                >
                  <MText fontSize="18px" color="#4A5568">
                    {menu}
                  </MText>
                </Box>
              )}
            </Box>
          ))}
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
