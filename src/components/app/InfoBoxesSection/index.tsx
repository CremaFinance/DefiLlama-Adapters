import { Flex, IconButton, Progress, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import { usePrice } from "hooks/usePrice";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { numberToShortVersion } from "utils/number-to-short-version";
import { secondsToDhms } from "utils/seconds-to-dmhs";

const InfoBoxesSection = () => {
  const { t } = useTranslation();

  const { data } = usePrice(coinSymbols.SOL);
  const [isEpochTooltiplOpen, setIsEpochTooltipOpen] = useState(false);
  const [isWeekAPYTooltilOpen, setIsWeekAPYTooltipOpen] = useState(false);
  const [isValidatorsTooltipOpen, setIsValidatorsTooltipOpen] = useState(false);

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.24;
  const totalSOLStaked = 2345678;
  const epochProgress = 45;
  const epochRemainingInSec = 221756;
  const weekAPY = 7.16;
  const validators = 411;

  return (
    <>
      <Flex
        display={["none", "flex"]}
        aria-label="info-boxes-section"
        px={{ base: 4, md: "11vw" }}
        justifyContent="center"
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
          mx={2}
        >
          <MText type="text-md">{t("appPage.info-msol-sol-price")}</MText>
          <MHeading type="heading-xsm">{mSOLvsSOLParity} SOL</MHeading>
          <MText type="text-md" pb={2}>
            ≈ ${((data?.sol?.usd ?? 0) * mSOLvsSOLParity).toFixed(2)}
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
          px={6}
          mt={8}
          mx={2}
        >
          <MText type="text-md">{t("appPage.info-total-sol-staked")}</MText>
          <MHeading type="heading-xsm">
            {totalSOLStaked.toLocaleString()}
          </MHeading>
          <MText type="text-md" pb={2}>
            ≈ ${((data?.sol?.usd ?? 0) * totalSOLStaked).toLocaleString()}
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
          mx={2}
        >
          <Flex justifyContent="space-between">
            <MText type="text-md">{t("appPage.info-epoch")}</MText>
            <Tooltip
              hasArrow
              label={t("appPage.info-epoch-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <MHeading type="heading-xsm">{epochProgress}%</MHeading>
            <Progress
              value={epochProgress}
              width="94px"
              height="8px"
              rounded="md"
              mr={3}
              bg={colors.greenLight}
              colorScheme="teal"
            />
          </Flex>
          <MText type="text-md" pb={2}>
            ETA: {secondsToDhms(epochRemainingInSec)}
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
          mx={2}
        >
          <Flex justifyContent="space-between">
            <MText type="text-md">{t("appPage.info-week-apy")}</MText>
            <Tooltip
              hasArrow
              label={t("appPage.info-week-apy-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                variant="link"
                aria-label="Info APY"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
          <MHeading type="heading-xsm">{weekAPY}%</MHeading>
          <MLink font="text-lg" color={colors.marinadeGreen} pb={2}>
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
          mx={2}
        >
          <Flex justifyContent="space-between">
            <MText type="text-md">{t("appPage.info-validators")}</MText>
            <Tooltip
              hasArrow
              label={t("appPage.info-validators-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                variant="link"
                aria-label="Info Validators"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
          <MHeading type="heading-xsm">{validators.toLocaleString()}</MHeading>
          <MLink font="text-lg" color={colors.marinadeGreen} pb={2}>
            {t("appPage.info-validators-action")}
          </MLink>
        </Flex>
      </Flex>
      <Flex
        display={["flex", "none"]}
        bg={colors.white}
        flexDirection="column"
        justifyContent="space-between"
        rounded="lg"
        height="154px"
        zIndex={5}
        pt={5}
        pb={3}
        pr={3}
        pl={5}
        mt={2}
        mx={4}
      >
        <Flex justifyContent="space-between" pr={8}>
          <MText type="text-lg">{t("appPage.info-msol-sol-price")}</MText>
          <MHeading type="heading-2xsm">{mSOLvsSOLParity} SOL</MHeading>
        </Flex>
        <Flex justifyContent="space-between" pr={8}>
          <MText type="text-lg">{t("appPage.info-total-staked")}</MText>
          <MHeading type="heading-2xsm">
            {numberToShortVersion(totalSOLStaked)} SOL
          </MHeading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <MText type="text-lg">{t("appPage.info-epoch")}</MText>
          <Progress
            value={epochProgress}
            width="40vw"
            height="8px"
            rounded="md"
            bg={colors.greenLight}
            colorScheme="teal"
          />
          <Flex>
            <MHeading type="heading-2xsm">{epochProgress}%</MHeading>
            <Tooltip
              hasArrow
              isOpen={isEpochTooltiplOpen}
              label={t("appPage.info-epoch-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                onClick={() => setIsEpochTooltipOpen(true)}
                onMouseEnter={() => setIsEpochTooltipOpen(true)}
                onMouseLeave={() => setIsEpochTooltipOpen(false)}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <MLink font="text-lg" color={colors.marinadeGreen}>
            {t("appPage.info-week-apy")}
          </MLink>
          <Flex>
            <MHeading type="heading-2xsm">{weekAPY}%</MHeading>
            <Tooltip
              hasArrow
              isOpen={isWeekAPYTooltilOpen}
              label={t("appPage.info-week-apy-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                onClick={() => setIsWeekAPYTooltipOpen(true)}
                onMouseEnter={() => setIsWeekAPYTooltipOpen(true)}
                onMouseLeave={() => setIsWeekAPYTooltipOpen(false)}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <MLink font="text-lg" color={colors.marinadeGreen}>
            {t("appPage.info-validators")}
          </MLink>
          <Flex>
            <MHeading type="heading-2xsm">
              {validators.toLocaleString()}
            </MHeading>
            <Tooltip
              hasArrow
              isOpen={isValidatorsTooltipOpen}
              label={t("appPage.info-validators-tooltip")}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <IconButton
                target="_blank"
                onClick={() => setIsValidatorsTooltipOpen(true)}
                onMouseEnter={() => setIsValidatorsTooltipOpen(true)}
                onMouseLeave={() => setIsValidatorsTooltipOpen(false)}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InfoBoxesSection;
