import { Flex, Progress, Spinner } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";

import { useStats } from "../../../contexts/StatsContext";
import { useEpochInfo } from "../../../hooks/useEpochInfo";
import { usePrice } from "../../../hooks/usePrice";
import {
  format2Dec,
  numberToShortVersion,
} from "../../../utils/number-to-short-version";
import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import InfoIconWithTooltip from "components/molecules/InfoIconWithTooltip";
import { coinSymbols } from "services/domain/coinSymbols";
import { formatMDec } from "solana/marinade-anchor/common";
import colors from "styles/customTheme/colors";
import { millisecondsToDhms } from "utils/ms-to-dmhs";

const InfoBoxesSection = () => {
  const { t } = useTranslation();

  const { data } = usePrice(coinSymbols.SOL);
  const epochData = useEpochInfo()?.data;

  const { totalStaked } = useStats();

  const totalSOLStaked = totalStaked
    ? Number(format2Dec(totalStaked, LAMPORTS_PER_SOL))
    : undefined;

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.24;

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
          <MHeading type="heading-2xsm">{mSOLvsSOLParity} SOL</MHeading>
          <MText type="text-md" pb={2}>
            ≈ ${((data?.sol?.usd ?? 0) * mSOLvsSOLParity).toFixed(2)}
          </MText>
        </Flex>
        {totalSOLStaked ? (
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
            <MHeading type="heading-2xsm">
              {totalSOLStaked.toLocaleString()}
            </MHeading>
            <MText type="text-md" pb={2}>
              ≈ ${formatMDec((data?.sol?.usd ?? 0) * totalSOLStaked)}
            </MText>
          </Flex>
        ) : (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Spinner size="md" mr={3} />
          </Flex>
        )}
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
            <InfoIconWithTooltip
              tooltipText={t("appPage.info-epoch-tooltip")}
            />
          </Flex>
          {epochData ? (
            <>
              <Flex alignItems="center" justifyContent="space-between">
                <MHeading type="heading-2xsm">
                  {epochData.epochProgress.toFixed(1).replace(/[.,]0$/, "")}%
                </MHeading>
                <Progress
                  value={epochData.epochProgress}
                  flex={1}
                  height="8px"
                  rounded="md"
                  ml={3}
                  mr={3}
                  bg={colors.greenLight}
                  colorScheme="teal"
                />
              </Flex>
              <MText type="text-md" pb={2}>
                ETA: {millisecondsToDhms(epochData.msUntilEpochEnd ?? 0)}
              </MText>
            </>
          ) : (
            <Flex flex={1} alignItems="center" justifyContent="center">
              <Spinner size="md" mr={3} />
            </Flex>
          )}
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
            <InfoIconWithTooltip
              tooltipText={t("appPage.info-week-apy-tooltip")}
            />
          </Flex>
          <MHeading type="heading-2xsm">{weekAPY}%</MHeading>
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
            <InfoIconWithTooltip
              tooltipText={t("appPage.info-validators-tooltip")}
            />
          </Flex>
          <MHeading type="heading-2xsm">{validators.toLocaleString()}</MHeading>
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
        {totalSOLStaked ? (
          <Flex justifyContent="space-between" pr={8}>
            <MText type="text-lg">{t("appPage.info-total-staked")}</MText>
            <MHeading type="heading-2xsm">
              {numberToShortVersion(totalSOLStaked)} SOL
            </MHeading>
          </Flex>
        ) : (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Spinner size="md" mr={3} />
          </Flex>
        )}
        <Flex justifyContent="space-between" alignItems="center">
          <MText type="text-lg">{t("appPage.info-epoch")}</MText>
          {epochData ? (
            <>
              <Progress
                value={epochData.epochProgress}
                width="40vw"
                height="8px"
                rounded="md"
                bg={colors.greenLight}
                colorScheme="teal"
              />
              <Flex>
                <MHeading type="heading-2xsm">
                  {epochData.epochProgress.toFixed(1).replace(/[.,]0$/, "")}%
                </MHeading>
                <InfoIconWithTooltip
                  tooltipText={t("appPage.info-epoch-tooltip")}
                />
              </Flex>
            </>
          ) : (
            <Spinner size="sm" mr={8} />
          )}
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <MLink font="text-lg" color={colors.marinadeGreen}>
            {t("appPage.info-week-apy")}
          </MLink>
          <Flex>
            <MHeading type="heading-2xsm">{weekAPY}%</MHeading>
            <InfoIconWithTooltip
              tooltipText={t("appPage.info-week-apy-tooltip")}
            />
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
            <InfoIconWithTooltip
              tooltipText={t("appPage.info-validators-tooltip")}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InfoBoxesSection;
