import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MNDELockStep from "components/molecules/MNDELockStep";
import colors from "styles/customTheme/colors";

const MndeLockInfoSection = () => {
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
        marginBottom={{ base: "24px", lg: "40px" }}
        marginX="8px"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Text
            color={colors.black}
            textAlign="center"
            fontWeight="bold"
            fontSize={["22.5px", "43.95px"]}
            maxWidth="670px"
            mb="4px"
          >
            {t("appPage.mnde.lock.info-section.header")}
          </Text>
        </Flex>
        <Text
          color={colors.black}
          textAlign="center"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "27px" }}
          maxWidth={{ base: "288px", md: "497px" }}
          display={{ base: "none", xl: "flex" }}
        >
          {t("appPage.mnde.lock.info-section.description")}
        </Text>
      </Flex>
      <Flex
        flexDirection={["column", "row"]}
        zIndex={10}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        px={{ base: "4px", lg: "6vw" }}
      >
        <MNDELockStep
          stepTitle={t("appPage.mnde.lock.info-section.steps.first")}
          stepIllustrationPath="/ilustrations/lock.svg"
        />
        <MNDELockStep
          stepTitle={t("appPage.mnde.lock.info-section.steps.second")}
          stepIllustrationPath="/ilustrations/NFT.svg"
        />
        <MNDELockStep
          stepTitle={t("appPage.mnde.lock.info-section.steps.third")}
          stepIllustrationPath="/ilustrations/vote.svg"
          stepLinkEnabled
        />
      </Flex>
    </Flex>
  );
};

export default MndeLockInfoSection;
