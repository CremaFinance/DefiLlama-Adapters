import { Flex, Box, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MButton from "../../atoms/Button";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import MTooltip from "../../molecules/InfoIconWithTooltip";
import colors from "styles/customTheme/colors";

const RETRO_DATES = [
  {
    dateRange: "Devnet - Aug 2",
    linkName: "raw data" /* Devnet raw data? */,
    link: "https://marinade.finance/data/wave0.json",
    info: "Devnet participation",
  },
  {
    dateRange: "Aug 2 - Aug 9",
    linkName: "raw data",
    link: "https://marinade.finance/data/wave_1.json",
    info: "Launch - 100k SOL staked",
  },
  {
    dateRange: "Aug 10 - Aug 25",
    linkName: "raw data",
    link: "https://marinade.finance/data/wave_2.json",
    info: "100k - 300k SOL staked",
  },
  {
    dateRange: "Aug 26 - Sep 2",
    linkName: "raw data",
    link: "https://marinade.finance/data/wave_3.json",
    info: "500k - 700k SOL staked",
  },
  {
    dateRange: "Sep 3 - Sep 12",
    linkName: "raw data",
    link: "https://marinade.finance/data/wave_4.json",
    info: "1M - 2M SOL staked",
  },
  {
    dateRange: "Sep 13 - Sep 30",
    linkName: "raw data",
    link: "https://marinade.finance/data/wave_5.json",
    info: "3M SOL staked bonus",
  },
];

const MndeSection = () => {
  const { t } = useTranslation();
  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      height="100vh"
      aria-label="mnde-section"
      position="relative"
      zIndex={1}
      flexDirection="column"
      backgroundColor={colors.greenLight}
      alignItems="stretch"
    >
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
          <Image src="/favicon.svg" boxSize="40px" borderRadius="full" />
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
            <Flex>
              <Image src="/icons/checkmark.svg" boxSize="20px" mr="10px" />
              <MText fontSize="14.4px">{tuple.dateRange}</MText>
            </Flex>

            <Flex alignItems="center" position="relative" left="10px">
              <MLink
                fontSize={{ base: "11px", lg: "14.4px" }}
                fontWeight="700"
                color={colors.marinadeGreen}
                href={tuple.link}
              >
                {tuple.linkName}
              </MLink>
              <Image
                src="/icons/external-link-green.svg"
                boxSize="16px"
                ml="6px"
                mr={{ base: "0px", lg: "5px" }}
              />
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
    </Flex>
  );
};

export default MndeSection;
