import { Flex, Icon, Divider } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FiExternalLink } from "react-icons/fi";

import MLink from "../../atoms/Link";
import colors from "styles/customTheme/colors";

type LevelDividerProps = {
  min: number;
  max: number;
  balance: number;
  disableMin?: boolean;
  disableMax?: boolean;
  last?: boolean;
};

const LevelDivider = ({
  min,
  max,
  balance,
  disableMin = false,
  disableMax = false,
  last = false,
}: LevelDividerProps) => {
  const { t } = useTranslation();
  return (
    <Flex
      ml={{ base: "0px", md: "4px" }}
      mr={{ base: "0px", md: "4px" }}
      width={{ base: "100%", sm: "0" }}
      height={{ base: "auto", sm: "140px" }}
      display={
        (balance < max || disableMax) && (balance >= min || disableMin)
          ? "flex"
          : "none"
      }
    >
      <Divider
        borderColor="gray.200"
        orientation="vertical"
        opacity="1"
        mt="16px"
        display={{ base: "none", md: "flex" }}
      />
      <Divider
        mt="4px"
        mb="30px"
        ml="2px"
        borderColor="gray.200"
        orientation="horizontal"
        opacity="1"
        display={{ base: "flex", md: "none" }}
      />
      <Flex
        marginLeft={{ base: "5px", md: "9px" }}
        height={{ base: "initial", md: last ? "153px" : "inherit" }}
        marginTop="16px"
        position="absolute"
        display="flex"
        flexDirection={["row", "column"]}
        justifyContent="flex-end"
      >
        <MLink
          target="_blank"
          rel="noreferrer noopener"
          fontWeight="bold"
          textAlign="left"
          fontSize="11.52px"
          cursor="pointer"
          lineHeight="13.83px"
          _hover={{ textDecoration: "underline" }}
          _focus={{ boxShadow: "none" }}
          color={colors.marinadeGreen}
          href="https://jup.ag/swap/mSOL-MNDE"
        >
          {t("appPage.mnde.nft-levels.buy-more")}
          <Icon
            as={FiExternalLink}
            width="12px"
            height="12px"
            cursor="pointer"
            marginLeft="2px"
            marginBottom="-1px"
          />
        </MLink>
      </Flex>
    </Flex>
  );
};

export default LevelDivider;
