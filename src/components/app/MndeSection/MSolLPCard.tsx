/* eslint-disable complexity */
import { Box, Flex, Icon, Image, Spinner, useToast } from "@chakra-ui/react";
import { BN } from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useCallback, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useWallet } from "../../../hooks/useWallet";
import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import { Wallet } from "../../molecules/Wallet";
import TransactionLink from "components/molecules/TransactionLink";
import { useChain } from "contexts/ConnectionProvider";
import { useMarinade } from "contexts/MarinadeContext";
import { useQuarryProvider } from "contexts/QuaryContext";
import { usePrices } from "hooks/usePrices";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { addCommas } from "utils/add-commas";
import { format2Dec, format5Dec } from "utils/number-to-short-version";

const MSolLPCard = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { connected } = useWallet();
  const {
    mndeTokadaptState,
    farms: { mLP },
  } = useQuarryProvider();
  const prices = usePrices([coinSymbols.SOL, coinSymbols.MNDE]);
  const { marinadeState } = useMarinade();
  const chain = useChain();

  const mLPFarmAnnualRewards = parseFloat(
    mLP?.quarry?.computeAnnualRewardsRate()?.toString()
  );

  const totalDeposited = mLP?.quarry?.quarryData?.totalTokensDeposited;

  const mSOLvsSOLParity = marinadeState?.state?.st_sol_price
    ? marinadeState?.state?.st_sol_price?.toNumber() / 0x1_0000_0000
    : 0;
  const solUSD = prices[coinSymbols.SOL]?.usd;
  const mSolUSD = Number(format2Dec(solUSD ?? 0 * mSOLvsSOLParity));
  const totalDepositValue =
    (Math.round((totalDeposited?.toNumber() / LAMPORTS_PER_SOL) * 1e2) / 1e2) *
    mSolUSD;

  const apr = 10.6; // TODO: calculate the APR

  const [timestamp, setTimestamp] = useState<BN>(
    new BN(Math.round(new Date().getTime() / 1000))
  );

  const userStake = mLP?.minerData?.balance || new BN(0);
  const rewardsPerTokenPaid = mLP?.minerData?.rewardsPerTokenPaid || new BN(0);
  const rewardsEarned = mLP?.minerData?.rewardsEarned || new BN(0);

  const rewards = mLP?.quarry?.payroll?.calculateRewardsEarned(
    timestamp,
    userStake,
    rewardsPerTokenPaid,
    rewardsEarned
  );

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
    mLP
      .claim()
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
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("mndePage.something-went-wrong"),
            description: t("mndePage.error-processing-transaction"),
            status: "warning",
          });
        }
      )
      .finally(() => {
        setIsClaimProcessing(false);
      });
  }, [chain.name, mLP, t, toast]);

  return (
    <Flex
      ml="auto"
      mr="auto"
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
    >
      <Box>
        <Flex width="100%" justifyContent="space-between">
          <Flex>
            <Image src="/icons/mSOL-SOL-LP.png" boxSize="24px" mr="4px" />
            <MText ml={1}>MSOL-SOL LP</MText>
          </Flex>
          <Image src="/icons/mnde.svg" boxSize="40px" />
        </Flex>
        {apr ? (
          <>
            <MHeading fontSize="22.5px" mb="4px">
              {`${apr} % APR`}
            </MHeading>
            <MText type="text-md" mt="1px">{`${addCommas(
              format2Dec(totalDeposited?.toNumber(), LAMPORTS_PER_SOL)
            )} mSOL = $ ${addCommas(
              format2Dec(totalDepositValue)
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
                format2Dec(mLPFarmAnnualRewards * 7, LAMPORTS_PER_SOL * 365)
              )} MNDE/week`}</MText>
            </Flex>
            <Flex
              justifyContent="space-between"
              display={connected ? "flex" : "none"}
            >
              <MText>{t("mndePage.your-deposit")}:</MText>
              <MText>{`${format2Dec(
                userStake.toNumber(),
                LAMPORTS_PER_SOL
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
          <MButton variant="solid" width="142px" height="40px">
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
                rewards?.toNumber(),
                LAMPORTS_PER_SOL
              )} MNDE`}</MText>
            </Flex>
            <MButton
              variant="outline"
              borderColor="gray"
              color="black"
              width={{ base: "70px", lg: "80px" }}
              fontWeight="500"
              fontSize="14.4px"
              onClick={() => claimHandler()}
              isLoading={isClaimProcessing}
              isDisabled={
                !mndeTokadaptState ||
                Number(format5Dec(rewards?.toNumber(), LAMPORTS_PER_SOL)) <
                  0.00001
              }
            >
              {t("mndePage.claim-action")}
            </MButton>
          </Flex>
        </Flex>
      ) : (
        <Wallet />
      )}
    </Flex>
  );
};
export default MSolLPCard;
