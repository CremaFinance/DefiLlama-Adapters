import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import MText from "../../atoms/Text";

const TRANSACTIONS = "Transactions";
const STAKES = "Stakes";
const PORTFOLIO = "Portfolio";
const SPL_TOKEN_TXS = "SPL Token TXs";
const DEX_ORDERS = "DEXOrders";

const MENUS = [TRANSACTIONS, STAKES, PORTFOLIO, SPL_TOKEN_TXS, DEX_ORDERS];

const ValidatorsSection = () => {
  const [selectedMenu, setSelectedMenu] = useState(STAKES);

  return (
    <Box
      h="842px"
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
                  <MText type="text-lg" fontWeight="bold" color="#308d8a">
                    {menu}
                  </MText>
                </Box>
              ) : (
                <Box
                  cursor="pointer"
                  px="16px"
                  onClick={() => setSelectedMenu(menu)}
                >
                  <MText type="text-lg" px="0px">
                    {menu}
                  </MText>
                </Box>
              )}
            </Box>
          ))}
        </Flex>

        <Flex
          mr="25px"
          mt="10px"
          border="1px solid #727f96"
          borderRadius="5px"
          height="35px"
          width="90px"
          alignItems="center"
        >
          <Flex>
            <MText ml="5px">BASIC</MText>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ValidatorsSection;
