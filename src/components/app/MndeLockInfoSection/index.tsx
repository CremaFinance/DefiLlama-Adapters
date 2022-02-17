import { Flex, Text, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import MNDELockStep from "components/molecules/MNDELockStep";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import colors from "styles/customTheme/colors";

const MndeLockInfoSection = () => {
  const { t } = useTranslation();
  const [isLargerThan430] = useMediaQuery("(min-width: 430px)");
  return (
    <Flex
      pb={[8, 8]}
      aria-label="mnde-section"
      position="relative"
      flexDirection="column"
      width="100vw"
    >
      <Flex
        marginTop={{ base: "34px", lg: "50px" }}
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
            lineHeight="33.75px"
            maxWidth="670px"
            marginLeft={{ base: "10px", md: "0px" }}
            marginBottom={{ base: "10px", md: "40px" }}
          >
            {t("appPage.mnde.lock.info-section.header")}
          </Text>
          <TooltipWithContent
            tooltipText={t("appPage.mnde.lock.info-section.description")}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              _focus={{ boxShadow: "none" }}
              variant="link"
              aria-label="Info Lock MNDE"
              size="lg"
              icon={<MdInfoOutline />}
              marginBottom="10px"
              left="-10px"
              padding="0px"
              marginRight="-15px"
            />
          </TooltipWithContent>
        </Flex>
        <Text
          color={colors.black}
          textAlign="center"
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "20px", md: "27px" }}
          maxWidth={{ base: "288px", md: "497px" }}
        >
          {isLargerThan430
            ? t("appPage.mnde.lock.info-section.description")
            : t("appPage.mnde.lock.info-section.mobile-description")}
        </Text>
      </Flex>
      <Flex
        flexDirection="row"
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
          href="/"
        />
      </Flex>
    </Flex>
  );
};

export default MndeLockInfoSection;
