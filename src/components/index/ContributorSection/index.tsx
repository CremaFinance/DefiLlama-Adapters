import { Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const ContributorSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      pb={{ base: "24px", md: "32px" }}
      pt={{ base: 16, md: "104px" }}
      as="section"
      aria-label="contributor-section"
      flexDirection={{ base: "column-reverse", lg: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        width={{ base: "88vw", md: "496px" }}
        mr={{ base: 0, lg: 24 }}
        mb={{ base: 0, md: 8 }}
      >
        <MHeading textAlign="center" my={4} type="heading-md">
          {t("indexPage.contributor-section-title")}
        </MHeading>
        <MText
          type="text-2xl"
          alignSelf="center"
          textAlign="center"
          color={colors.black}
          mt={2}
        >
          {t("indexPage.contributor-section-subtitle")}
        </MText>
        <MButton
          font="text-xl"
          rounded="md"
          bg={colors.green}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.green}
          color={colors.white}
          mt={8}
          mb={8}
          p="24px"
        >
          {t("indexPage.contributor-section-action")}
        </MButton>
        <Flex mt={[0, 8]} mb={16}>
          <Link target="_blank" mr={4} href="https://discord.gg/mGqZA5pjRN">
            <Image
              cursor="pointer"
              src="/icons/discord-drawn.svg"
              alt="Discord Logo"
              width="48px"
            />
          </Link>
          <Link
            target="_blank"
            ml={2}
            href="https://twitter.com/MarinadeFinance"
          >
            <Image
              cursor="pointer"
              src="/icons/twitter-drawn.svg"
              alt="Twitter Logo"
              width="56px"
            />
          </Link>
        </Flex>
      </Flex>

      <Image
        src="/ilustrations/chefs.svg"
        width={{ base: "88vw", lg: "504px" }}
        height={{ base: "320px", lg: 480 }}
        mb={8}
      />
    </Flex>
  );
};

export default ContributorSection;
