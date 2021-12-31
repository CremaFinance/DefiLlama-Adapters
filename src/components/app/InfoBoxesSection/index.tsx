import {
  Flex,
  Progress,
  Spinner,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import { useMarinade } from "../../../contexts/MarinadeContext";
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
import ValidatorsTable from "../ValidatorsSection";
import InfoIconWithTooltip from "components/molecules/InfoIconWithTooltip";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { millisecondsToDhms } from "utils/ms-to-dmhs";

const scrollbarProps = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#CCCCCC",
    borderRadius: "24px",
  },
  "&::-webkit-scrollbar:horizontal": {
    height: "4px",
  },
  "&::-webkit-scrollbar-track:horizontal": {
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb:horizontal": {
    background: "#CCCCCC",
    borderRadius: "24px",
  },
};

const InfoBoxesSection = () => {
  const { t } = useTranslation();

  const { data } = usePrice(coinSymbols.SOL);

  const epochData = useEpochInfo()?.data;

  const { totalStaked, totalValidatorsCount } = useStats();

  const { marinadeState } = useMarinade();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalSOLStaked = totalStaked
    ? Number(format2Dec(totalStaked, LAMPORTS_PER_SOL))
    : undefined;

  const mSOLvsSOLParity = marinadeState?.state?.st_sol_price
    ? marinadeState?.state?.st_sol_price?.toNumber() / 0x1_0000_0000
    : 0;

  const solUSD = data ? data[coinSymbols.SOL]?.usd : 0;

  const mSolUSD = Number(format2Dec(solUSD ?? 0 * mSOLvsSOLParity));

  // TODO: Use actual values from services
  const weekAPY = 7.16;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay w="100vw" />
        <ModalContent
          maxW="min(95vw, 1300px)"
          maxH="min(85vh, 900px)"
          backgroundColor="white"
          overflow="auto"
          css={scrollbarProps}
        >
          <ModalHeader>Validators</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflow="auto" css={scrollbarProps}>
              <ValidatorsTable />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
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
          <MHeading type="heading-2xsm">
            {mSOLvsSOLParity.toFixed(5)} SOL
          </MHeading>
          <MText type="text-md" pb={2}>
            ≈ ${mSolUSD}
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
          {totalSOLStaked ? (
            <>
              <MHeading type="heading-2xsm">
                {numberToShortVersion(totalSOLStaked)}
              </MHeading>
              <MText type="text-md" pb={2}>
                ≈ ${numberToShortVersion((solUSD ?? 0) * totalSOLStaked)}
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
          zIndex={6}
          py={5}
          pr={3}
          pl={6}
          mt={8}
          mx={2}
        >
          <Flex justifyContent="space-between">
            <MText type="text-md">{t("appPage.info-epoch")}</MText>
            <TooltipWithContent
              tooltipText={t("appPage.info-epoch-tooltip")}
              link={t("appPage.info-epoch-tooltip-docs-link")}
            >
              <IconButton
                _focus={{ boxShadow: "none" }}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
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
            <TooltipWithContent
              tooltipText={t("appPage.info-validators-tooltip")}
              link={t("appPage.info-validators-tooltip-docs-link")}
            >
              <IconButton
                _focus={{ boxShadow: "none" }}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
          </Flex>
          <MHeading type="heading-2xsm">{totalValidatorsCount}</MHeading>

          {/* Place Modal here */}
          <MLink
            font="text-lg"
            color={colors.marinadeGreen}
            pb={2}
            onClick={() => onOpen()}
          >
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
          {totalSOLStaked ? (
            <MHeading type="heading-2xsm">
              {numberToShortVersion(totalSOLStaked)} SOL
            </MHeading>
          ) : (
            <Spinner size="sm" mr={3} />
          )}
        </Flex>
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
                <TooltipWithContent
                  tooltipText={t("appPage.info-epoch-tooltip")}
                  link={t("appPage.info-epoch-tooltip-docs-link")}
                >
                  <IconButton
                    _focus={{ boxShadow: "none" }}
                    variant="link"
                    aria-label="Info epoch"
                    size="sm"
                    icon={<MdInfoOutline />}
                  />
                </TooltipWithContent>
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
          <MLink
            onClick={() => onOpen()}
            font="text-lg"
            color={colors.marinadeGreen}
          >
            {t("appPage.info-validators")}
          </MLink>
          <Flex>
            <MHeading type="heading-2xsm">{totalValidatorsCount}</MHeading>
            <TooltipWithContent
              tooltipText={t("appPage.info-validators-tooltip")}
              link={t("appPage.info-validators-tooltip-docs-link")}
            >
              <IconButton
                _focus={{ boxShadow: "none" }}
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default InfoBoxesSection;
