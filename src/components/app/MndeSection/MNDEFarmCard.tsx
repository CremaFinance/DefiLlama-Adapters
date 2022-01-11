/* eslint-disable complexity */
import {
  Box,
  Flex,
  Icon,
  Image,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BN } from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useCallback, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useWallet } from "../../../hooks/useWallet";
import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import MSolStakeModal from "components/molecules/MSolStakeModal";
import TransactionLink from "components/molecules/TransactionLink";
import { useChain } from "contexts/ConnectionProvider";
import { useQuarryProvider } from "contexts/QuaryContext";
import { useStats } from "contexts/StatsContext";
import { usePrices } from "hooks/usePrices";
import { useTracking } from "hooks/useTracking";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { addCommas } from "utils/add-commas";
import {
  format5Dec,
  numberToShortVersion,
} from "utils/number-to-short-version";

// eslint-disable-next-line sonarjs/cognitive-complexity
const MNDEFarmCard = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { track } = useTracking();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected } = useWallet();
  const {
    mndeTokadaptState,
    farms: { mSOL },
  } = useQuarryProvider();
  const prices = usePrices([coinSymbols.SOL, coinSymbols.MNDE]);
  const chain = useChain();
  const stats = useStats();

  const solUSD =
    prices[coinSymbols.SOL]?.usd && Number(prices[coinSymbols.SOL]?.usd);
  const mSolUSD =
    solUSD && stats?.mSOLvsSOLParity !== null
      ? solUSD * stats.mSOLvsSOLParity
      : undefined;
  const mndeUSD =
    prices[coinSymbols.MNDE]?.usd && Number(prices[coinSymbols.MNDE]?.usd);

  const totalDeposited = mSOL?.quarry?.quarryData?.totalTokensDeposited;
  const poolValueUSD =
    mSolUSD && totalDeposited
      ? (mSolUSD * totalDeposited.toNumber()) / LAMPORTS_PER_SOL
      : undefined;
  const mSOLFarmAnnualRewards =
    mSOL?.quarry?.quarryData?.annualRewardsRate.toNumber();

  const annualRewardsUSD =
    mSOLFarmAnnualRewards &&
    mndeUSD &&
    (mSOLFarmAnnualRewards * mndeUSD) / LAMPORTS_PER_SOL;

  const apr =
    poolValueUSD && annualRewardsUSD
      ? (annualRewardsUSD / poolValueUSD) * 100
      : undefined;

  const [timestamp, setTimestamp] = useState<BN>(
    new BN(Math.round(new Date().getTime() / 1000))
  );

  const userStake = mSOL?.minerData?.balance || new BN(0);
  const rewardsPerTokenPaid = mSOL?.minerData?.rewardsPerTokenPaid || new BN(0);
  const rewardsEarned = mSOL?.minerData?.rewardsEarned || new BN(0);

  const rewards = mSOL?.quarry?.payroll?.calculateRewardsEarned(
    timestamp,
    userStake,
    rewardsPerTokenPaid,
    rewardsEarned
  );

  const weeklyRewardsMNDE =
    ((mSOLFarmAnnualRewards ?? 0) / LAMPORTS_PER_SOL / 365) * 7;

  useEffect(() => {
    const clock = setInterval(() => {
      setTimestamp(new BN(Math.round(new Date().getTime() / 1000)));
    }, 1000);
    return () => clearTimeout(clock);
  }, []);

  const [isClaimProcessing, setIsClaimProcessing] = useState(false);

  // eslint-disable-next-line consistent-return
  const claimHandler = useCallback(() => {
    setIsClaimProcessing(true);
    mSOL
      ?.claim()
      .then(
        (transactionSignature) => {
          toast({
            title: t("mndePage.claim-mnde-confirmed"),
            description: (
              <p>
                {t("mndePage.succesfully-claimed-mnde")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Claim MNDE",
            category: "mSOL Farm",
            action: "Claim",
            label: "Success",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("mndePage.something-went-wrong"),
            description: t("mndePage.error-processing-transaction"),
            status: "warning",
          });
          track({
            event: "Claim MNDE Error",
            category: "mSOL Farm",
            action: "Claim",
            label: "Error",
            description: error.message as string,
          });
        }
      )
      .finally(() => {
        setIsClaimProcessing(false);
      });
  }, [chain.name, mSOL, t, toast, track]);

  return (
    <>
      <Flex
        ml="11.5px"
        mr="11.5px"
        height={{ base: "466px", lg: "476px" }}
        width={{ base: "288px", lg: "360px" }}
        flexDirection="column"
        padding={{ base: "16px", lg: "32px" }}
        mb="16px"
        background="white"
        border="1px solid"
        borderColor={colors.lightGray}
        borderRadius="8px"
        justifyContent="space-between"
        zIndex={6}
      >
        <Box>
          <Flex width="100%" justifyContent="space-between">
            <Flex>
              <Image src="/icons/mSOL.svg" boxSize="24px" mr="4px" />
              <MText ml={1}>MSOL</MText>
            </Flex>
            <Image src="/icons/mnde.svg" boxSize="40px" />
          </Flex>
          {apr ? (
            <>
              <MHeading fontSize="22.5px" mb="4px">
                {`${numberToShortVersion(apr)} % APR`}
              </MHeading>
              <MText type="text-md" mt="1px">{`${addCommas(
                numberToShortVersion(
                  (totalDeposited?.toNumber() ?? 0) / LAMPORTS_PER_SOL
                )
              )} mSOL = $ ${addCommas(
                numberToShortVersion(poolValueUSD ?? 0)
              )} TVL`}</MText>
              <Flex
                height="56px"
                width="100%"
                mt="16px"
                mb="16px"
                borderY="1px solid"
                borderColor={colors.lightGray}
                alignItems="center"
              >
                <Icon
                  as={IoCheckmarkCircle}
                  color={colors.marinadeGreen}
                  width="24px"
                  height="24px"
                  mr="10px"
                />
                <MText>{`${addCommas(
                  numberToShortVersion(weeklyRewardsMNDE)
                )} MNDE/week`}</MText>
              </Flex>
              <Flex
                justifyContent="space-between"
                display={connected ? "flex" : "none"}
              >
                <MText>{t("mndePage.your-deposit")}:</MText>
                <MText>{`${numberToShortVersion(
                  userStake.toNumber() / LAMPORTS_PER_SOL
                )} MSOL`}</MText>
              </Flex>
            </>
          ) : (
            <Flex height="100px" alignItems="center" justifyContent="center">
              <Spinner size="md" />
            </Flex>
          )}
        </Box>
        {connected ? (
          <Flex flexDirection="column" alignItems="center">
            <MButton
              variant="solid"
              width="100%"
              height="48px"
              onClick={() => onOpen()}
            >
              {t("mndePage.manage-deposit-action")}
            </MButton>
            <Flex
              height="60px"
              width="100%"
              marginTop="32px"
              borderBottom="1px solid #EDF2F7"
              borderTop="1px solid #EDF2F7"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Image src="/icons/mnde.svg" boxSize="24px" mr="4px" />
                <MText>{`${format5Dec(
                  rewards ? rewards?.toNumber() : 0,
                  LAMPORTS_PER_SOL
                )} MNDE`}</MText>
              </Flex>
              <MButton
                variant="outline"
                borderColor="gray"
                _hover={{ bg: "gray.100" }}
                color="black"
                width={{ base: "70px", lg: "80px" }}
                fontWeight="600"
                fontSize="14.4px"
                onClick={() => claimHandler()}
                isLoading={isClaimProcessing}
                isDisabled={
                  !mndeTokadaptState ||
                  Number(
                    format5Dec(rewards?.toNumber() ?? 0, LAMPORTS_PER_SOL)
                  ) < 0.00001
                }
              >
                {t("mndePage.claim-action")}
              </MButton>
            </Flex>
          </Flex>
        ) : (
          <ConnectWallet />
        )}
      </Flex>
      <MSolStakeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
export default MNDEFarmCard;
