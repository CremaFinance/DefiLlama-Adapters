// import { PhoneIcon } from "@chakra-ui/icons";
import { Flex, Box, Image, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FiExternalLink } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

import MButton from "../../atoms/Button";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import MTooltip from "../../molecules/InfoIconWithTooltip";
import colors from "styles/customTheme/colors";

const RetroMnde = () => {
  const { t } = useTranslation();

  const RETRO_DATES = [
    {
      dateRange: t("Devnet - Aug 2"),
      linkName: t("raw data") /* Devnet raw data? */,
      link: "https://marinade.finance/data/wave0.json",
      info: t("Devnet participation"),
    },
    {
      dateRange: t("Aug 2 - Aug 9"),
      linkName: t("raw data"),
      link: "https://marinade.finance/data/wave_1.json",
      info: t("Launch - 100k SOL staked"),
    },
    {
      dateRange: t("Aug 10 - Aug 25"),
      linkName: t("raw data"),
      link: "https://marinade.finance/data/wave_2.json",
      info: t("100k - 300k SOL staked"),
    },
    {
      dateRange: t("Aug 26 - Sep 2"),
      linkName: t("raw data"),
      link: "https://marinade.finance/data/wave_3.json",
      info: t("500k - 700k SOL staked"),
    },
    {
      dateRange: t("Sep 3 - Sep 12"),
      linkName: t("raw data"),
      link: "https://marinade.finance/data/wave_4.json",
      info: t("1M - 2M SOL staked"),
    },
    {
      dateRange: t("Sep 13 - Sep 30"),
      linkName: t("raw data"),
      link: "https://marinade.finance/data/wave_5.json",
      info: t("3M SOL staked bonus"),
    },
  ];

  return (
    <Box
      ml="auto"
      mr="auto"
      height={{ base: "466px", lg: "476px" }}
      width={{ base: "288px", lg: "360px" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={{ base: "16px", lg: "32px" }}
      background="white"
      border="1px solid #E2E8F0"
      box-boxSizing="border-box"
      borderRadius="8px"
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <MText fontSize="22.5px" fontWeight="700">
          {t("mndePage.retro-title")}
        </MText>

        <Box
          bg={colors.marinadeGreen}
          borderRadius="full"
          boxSize="40px"
          display="grid"
          placeItems="center"
        >
          <Image
            src="/icons/Marinade-icon-white.svg"
            boxSize="27px"
            bg={colors.cyan}
          />
        </Box>
      </Flex>

      <MText mt="16px" mb="16px" fontSize="14.3px">
        {t("mndePage.retro-info")}
      </MText>

      {RETRO_DATES.map((tuple, ind) => (
        <Flex
          justifyContent="space-between"
          width="100%"
          height="34px"
          borderTop={ind === 0 ? "1px solid #EDF2F7" : ""}
          borderBottom="1px solid #EDF2F7"
          alignItems="center"
        >
          <Flex alignItems="center">
            <Icon
              as={IoCheckmarkCircle}
              color={colors.marinadeGreen}
              width="20px"
              height="20px"
              mr="10px"
            />

            <MText fontSize="14.4px">{tuple.dateRange}</MText>
          </Flex>

          <Flex alignItems="center" position="relative" left="10px">
            <MLink
              fontSize={{ base: "11px", lg: "14.4px" }}
              fontWeight="700"
              color={colors.marinadeGreen}
              href={tuple.link}
              rel="noreferrer noopener"
              isExternal
            >
              <Flex alignItems="center">
                {tuple.linkName}
                <Icon
                  as={FiExternalLink}
                  width="16px"
                  height="16px"
                  ml="6px"
                  mr={{ base: "3px", lg: "5px" }}
                  cursor="pointer"
                />
              </Flex>
            </MLink>

            <MTooltip tooltipText={tuple.info} iconSize="md" />
          </Flex>
        </Flex>
      ))}
      <Flex
        height="60px"
        width="100%"
        marginTop="32px"
        borderBottom="1px solid #EDF2F7"
        borderTop="1px solid #EDF2F7"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Image src="/icons/mSOL.svg" boxSize="24px" mr="4px" />
          <MText>0.00035 MNDE</MText>
        </Flex>
        <MButton
          variant="outline"
          borderColor="gray"
          color="black"
          width={{ base: "70px", lg: "80px" }}
          fontWeight="500"
          fontSize="14.4px"
        >
          {t("Claim")}
        </MButton>
      </Flex>
    </Box>
  );
};

export default RetroMnde;
