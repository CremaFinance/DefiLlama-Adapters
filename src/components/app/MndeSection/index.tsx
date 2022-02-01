import { Flex, Text, Image } from "@chakra-ui/react";

import MLink from "../../atoms/Link";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

import MNDEFarmCard from "./MNDEFarmCard";
import MSolLPCard from "./MSolLPCard";

const MndeSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      pt={["100px", "72px"]}
      pb={[12, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      width="100vw"
    >
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
          fontWeight="bold"
          fontSize={["22.5px", "43.95px"]}
          maxWidth="670px"
        >
          {t("appPage.mnde.header")}
        </Text>

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
      <Flex
        flexDirection={["column", "row"]}
        zIndex={10}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        px={{ base: "4px", lg: "6vw" }}
      >
        <>
          <MNDEFarmCard />
          <MSolLPCard />
        </>
      </Flex>
    </Flex>
  );
};

export default MndeSection;
