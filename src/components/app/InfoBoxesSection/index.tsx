import { Flex, IconButton, Progress } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";
import { numberWithCommas } from "utils/number-with-commas";
import { secondsToDhms } from "utils/seconds-to-dmhs";

const InfoBoxesSection = () => {
  const { t } = useTranslation();

  // TODO: Use actual values from services
  const solPrice = 193;
  const mSOLvsSOLParity = 1.24;
  const totalSOLStaked = 2345678;
  const epochProgress = 45;
  const epochRemainingInSec = 221756;
  const weekAPY = 7.16;
  const validators = 411;

  return (
    <Flex
      aria-label="info-boxes-section"
      px={{ base: 4, md: "11vw" }}
      justifyContent="space-around"
      flexWrap="wrap"
    >
      <Flex
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        width="207px"
        height="139px"
        zIndex={5}
        py={5}
        px={6}
        mt={8}
      >
        <MText type="text-md">{t("appPage.info-msol-sol-price")}</MText>
        <MText type="heading-xsm">{mSOLvsSOLParity} SOL</MText>
        <MText type="text-md">≈ ${solPrice * mSOLvsSOLParity}</MText>
      </Flex>
      <Flex
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        width="207px"
        height="139px"
        zIndex={5}
        py={5}
        px={6}
        mt={8}
      >
        <MText type="text-md">{t("appPage.info-total-sol-staked")}</MText>
        <MText type="heading-xsm">{numberWithCommas(totalSOLStaked)}</MText>
        <MText type="text-md">
          ≈ ${numberWithCommas(solPrice * totalSOLStaked)}
        </MText>
      </Flex>
      <Flex
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        width="207px"
        height="139px"
        zIndex={5}
        py={5}
        pr={3}
        pl={6}
        mt={8}
      >
        <Flex justifyContent="space-between">
          <MText type="text-md">{t("appPage.info-epoch")}</MText>
          <IconButton
            variant="link"
            aria-label="Info epoch"
            size="sm"
            icon={<MdInfoOutline />}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <MText type="heading-xsm">{epochProgress}%</MText>
          <Progress
            value={epochProgress}
            width="94px"
            height="8px"
            rounded="md"
            mr={3}
            colorScheme="green"
          />
        </Flex>
        <MText type="text-md">ETA: {secondsToDhms(epochRemainingInSec)}</MText>
      </Flex>
      <Flex
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        width="207px"
        height="139px"
        zIndex={5}
        py={5}
        pr={3}
        pl={6}
        mt={8}
      >
        <Flex justifyContent="space-between">
          <MText type="text-md">{t("appPage.info-week-apy")}</MText>
          <IconButton
            variant="link"
            aria-label="Info APY"
            size="sm"
            icon={<MdInfoOutline />}
          />
        </Flex>
        <MText type="heading-xsm">{weekAPY}%</MText>
        <MLink font="text-lg" colorScheme="green">
          {t("appPage.info-see-performance-action")}
        </MLink>
      </Flex>
      <Flex
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        width="207px"
        height="139px"
        zIndex={5}
        py={5}
        pr={3}
        pl={6}
        mt={8}
      >
        <Flex justifyContent="space-between">
          <MText type="text-md">{t("appPage.info-validators")}</MText>
          <IconButton
            variant="link"
            aria-label="Info Validators"
            size="sm"
            icon={<MdInfoOutline />}
          />
        </Flex>
        <MText type="heading-xsm">{numberWithCommas(validators)}</MText>
        <MLink font="text-lg" color={colors.green}>
          {t("appPage.info-validators-action")}
        </MLink>
      </Flex>
    </Flex>
  );
};

export default InfoBoxesSection;
