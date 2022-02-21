import { Flex, Text, Icon, Divider } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FiExternalLink } from "react-icons/fi";

import colors from "styles/customTheme/colors";

type LevelDividerProps = {
  min: number;
  max: number;
  balance: number;
  disableMin?: boolean;
  disableMax?: boolean;
};

const LevelDivider = ({
  min,
  max,
  balance,
  disableMin = false,
  disableMax = false,
}: LevelDividerProps) => {
  const { t } = useTranslation();
  return (
    <Flex
      ml={{ base: "0px", md: "4px" }}
      mr={{ base: "0px", md: "4px" }}
      width={{ base: "100%", sm: "0" }}
      display={
        (balance < max || disableMax) && (balance > min || disableMin)
          ? "flex"
          : "none"
      }
    >
      <Divider
        borderColor="gray.200"
        orientation="vertical"
        height="180px"
        opacity="1"
        mt="43px"
        display={{ base: "none", md: "flex" }}
      />
      <Divider
        mt="4px"
        mb="30px"
        ml="2px"
        borderColor="gray.200"
        orientation="horizontal"
        width={{ base: "100%", sm: "340px" }}
        height="10px"
        opacity="1"
        display={{ base: "flex", md: "none" }}
      />
      <Text
        marginLeft={{ base: "5px", md: "9px" }}
        marginTop={{ base: "20px", md: "190px" }}
        position="absolute"
        fontWeight="bold"
        textAlign="left"
        fontSize="9.22px"
        cursor="pointer"
        lineHeight="13.83px"
        color={colors.marinadeGreen}
      >
        {t("appPage.mnde.nft-levels.buy-more")}
        <Icon
          as={FiExternalLink}
          width="10px"
          height="10px"
          cursor="pointer"
          marginLeft="2px"
          marginBottom="-1px"
        />
      </Text>
    </Flex>
  );
};

export default LevelDivider;
