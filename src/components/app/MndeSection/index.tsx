import { Flex, Text, Image } from "@chakra-ui/react";

import MLink from "../../atoms/Link";
import InfoBoxesSection from "../InfoBoxesSection";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

import MNDEFarmCard from "./MNDEFarmCard";
import RetroMnde from "./RetroMnde";

const MndeSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      alignItems="stretch"
    >
      <InfoBoxesSection />

      <Flex
        marginTop={{ base: "24px", lg: "40px" }}
        marginBottom={{ base: "24px", lg: "80px" }}
        marginX="8px"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          color={colors.black}
          textAlign="center"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "27px" }}
          maxWidth={{ base: "288px", md: "670px" }}
        >
          {t("appPage.mnde.description")}
        </Text>
        <MLink
          variant="link"
          as="a"
          color={colors.marinadeGreen}
          href={t("appPage.mnde.docs-link")}
          target="_blank"
          _focus={{ boxShadow: "none" }}
          rel="noreferrer noopener"
          display="flex"
          alignItems="center"
          font="text-xl"
        >
          {t("appPage.tooltip-time-to-unstake-read-more")}
          <Image src="/icons/external-link-green.svg" width="1rem" ml={2} />
        </MLink>
      </Flex>
      <Flex flexDirection={["column", "row"]}>
        <MNDEFarmCard />
        <RetroMnde />
      </Flex>
    </Flex>
  );
};

export default MndeSection;