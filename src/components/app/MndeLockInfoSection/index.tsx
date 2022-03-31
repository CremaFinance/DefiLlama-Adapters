import { Flex, Text, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";

import MButton from "../../atoms/Button";
import MNDELockStep from "components/molecules/MNDELockStep";
import colors from "styles/customTheme/colors";

const MndeLockInfoSection = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Flex
      pb={[4, 8]}
      aria-label="mnde-section"
      pt={{ base: "88px", lg: "56px" }}
      position="relative"
      flexDirection="column"
      width="100vw"
    >
      <Flex
        marginTop={{ base: "16px", lg: "24px" }}
        marginBottom={{ base: "16px", lg: "24px" }}
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
            marginBottom={{ base: "16px", md: "40px" }}
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
        >
          {t("appPage.mnde.lock.info-section.description")}
        </Text>
        <MButton
          display="flex"
          font="text-xl"
          variant="link"
          fontWeight="bold"
          mt="8px"
          _hover={{ bg: colors.transparent }}
          color={colors.marinadeGreen}
          justifyContent="space-around"
          flexDirection="row"
          rightIcon={
            <Image
              src="/icons/arrow-right-full-green.svg"
              width="13.33px"
              height="12.99px"
            />
          }
          onClick={() => router.push("/tokens/mnde")}
        >
          {t("appPage.mnde.lock.info-section.learn-more")}
        </MButton>
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
          href="https://vote.marinade.finance/gov/mnde"
        />
      </Flex>
    </Flex>
  );
};

export default MndeLockInfoSection;
