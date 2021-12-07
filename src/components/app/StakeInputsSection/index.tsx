/* eslint-disable complexity */
import { Flex, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdArrowDownward, MdInfoOutline } from "react-icons/md";

import { useChain } from "../../../contexts/ConnectionProvider";
import { useMarinade } from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import UnstakeTicketsSection from "../UnstakeTicketsSection";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import TransactionLink from "components/molecules/TransactionLink";
import { useStats } from "contexts/StatsContext";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import { format5Dec } from "utils/number-to-short-version";

const StakeInputsSection = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isStakeActive, setStakeActive] = useState(true);
  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);

  const [stakeLoading, setStakeLoading] = useState(false);
  const [solToStake, setSolToStake] = useState<number>(0);
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const { onOpen } = useDisclosure();
  const { totalStaked } = useStats();
  const chain = useChain();

  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;

  const unstakeText = isUnstakeNowActive
    ? t("appPage.unstake-now-action")
    : t("appPage.start-delayed-unstake-action");

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.01002;
  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const sourceToken = "SOL";
  const sourceTokenIcon = "/icons/solana-dark.png";
  const sourceTokenBalance = nativeSOLBalance
    ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
    : 0;
  const targetToken = "mSOL";
  const targetTokenIcon = "/icons/mSOL.svg";
  const targetTokenBalance = 12.3;
  const timeToUnstake = "~7 days";

  const handleStakeActive = (v: boolean) => {
    setStakeActive(v);
    setUnstakeNowActive(true);
  };

  const handleUnstakeNowActive = (v: boolean) => {
    setUnstakeNowActive(v);
  };

  // eslint-disable-next-line consistent-return
  const stakeHandler = () => {
    let firstTimeStaker = Number(format5Dec(stSOLBalance ?? 0)) === 0;
    const basicInputChecksErrors = basicInputChecks(
      solToStake,
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      toast(basicInputChecksErrors);
      return false;
    }

    if (
      Number(solToStake) +
        Number(format5Dec(totalStaked ?? 0, LAMPORTS_PER_SOL)) >
      Number(format5Dec(Number(state?.staking_sol_cap), LAMPORTS_PER_SOL))
    ) {
      return toast({
        title: "Amount entered exceeds the current Staking cap.",
        description:
          "Try using the MAX button to stake the maximum allowed amount.",
        status: "warning",
        duration: 10000,
      });
    }

    const fundsNeeded =
      Number(solToStake) * LAMPORTS_PER_SOL +
      (marinadeState?.transactionFee ?? 0) * 4 +
      (state?.rent_exempt_for_token_acc?.toNumber() ?? 0);
    if (!checkNativeSOLBalance(nativeSOLBalance ?? 0, fundsNeeded))
      return false;

    setStakeLoading(true);

    marinade
      .runStake(Number(solToStake) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          if (firstTimeStaker) {
            onOpen();
            firstTimeStaker = false;
          }
          setSolToStake(0);
          toast({
            title: "Stake SOL confirmed",
            description: (
              <p>
                {"You've successfully staked your SOL "}
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

          let description = error.message;
          if (error.toString().includes("0xec6")) {
            description =
              "Mainnet Beta Capped TVL is FULL. Please wait for cap increments.";
          } else if (error.toString().includes("no record of a prior credit")) {
            description =
              "You need some SOL balance on your wallet to cover the transaction fees.";
          }

          toast({
            title: "Something went wrong",
            description,
            status: "warning",
          });
        }
      )
      .finally(() => setStakeLoading(false));
  };

  return (
    <Flex
      aria-label="stake-inputs-section"
      pb={20}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        width={["288px", "480px"]}
        alignItems="center"
        flexDirection="column"
      >
        <MHeading type="heading-md" mt={4} mb={2}>
          {t("appPage.stake-inputs-title")}
        </MHeading>
        <MText type="text-xl" textAlign="center">
          {t("appPage.stake-inputs-subtitle")}
        </MText>
        <SwitchButtons
          leftText={t("appPage.stake-action")}
          rightText={t("appPage.unstake-action")}
          my={[6]}
          height={40}
          width={["218px"]}
          buttonWidth={["103px"]}
          active={isStakeActive}
          handleSwitch={handleStakeActive}
        />
        <Flex
          width={["288px", "480px"]}
          bg={colors.white}
          rounded="md"
          alignItems="center"
          flexDirection="column"
          boxShadow="md"
          position="relative"
          p={[4, 10]}
        >
          <SwitchButtons
            leftText={t("appPage.unstake-now-action")}
            rightText={t("appPage.delayed-unstake-action")}
            mb={8}
            height={40}
            width={["254px", "322px"]}
            buttonWidth={["121px", "155px"]}
            active={isUnstakeNowActive}
            font="text-lg"
            display={isStakeActive ? "none" : "flex"}
            handleSwitch={handleUnstakeNowActive}
          />
          <Flex flexDirection={isStakeActive ? "column" : "column-reverse"}>
            <StakeInput
              stakeInputType={
                isStakeActive
                  ? StakeInputTypeEnum.Source
                  : StakeInputTypeEnum.Target
              }
              tokenName={sourceToken}
              tokenIcon={sourceTokenIcon}
              tokenBalance={sourceTokenBalance}
              width={["256px", "400px"]}
              mb={2}
            />
            <StakeInput
              stakeInputType={
                isStakeActive
                  ? StakeInputTypeEnum.Target
                  : StakeInputTypeEnum.Source
              }
              tokenName={targetToken}
              tokenIcon={targetTokenIcon}
              tokenBalance={targetTokenBalance}
              tokenCardWidth={["87px"]}
              width={["256px", "400px"]}
              mb={2}
            />
          </Flex>
          <Flex
            width={["256px", "400px"]}
            my={1}
            justifyContent="space-between"
          >
            <Flex>
              <MText type="text-md">
                {t("appPage.stake-inputs-exchange-rate")}
              </MText>
              <IconButton
                variant="link"
                aria-label="Info epoch"
                size="sm"
                _focus={{ boxShadow: "none" }}
                icon={<MdInfoOutline />}
              />
            </Flex>
            <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity} SOL`}</MText>
          </Flex>
          {isStakeActive ? (
            <Flex
              width={["256px", "400px"]}
              mt={1}
              mb={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-stake-fee")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info stake fee"
                  size="sm"
                  _focus={{ boxShadow: "none" }}
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">0%</MText>
            </Flex>
          ) : (
            <Flex
              width={["256px", "400px"]}
              mt={1}
              mb={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-unstake-fee")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info unstake fee"
                  size="sm"
                  _focus={{ boxShadow: "none" }}
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">{`${minUnstakeFee}-${maxUnstakeFee}%`}</MText>
            </Flex>
          )}
          {!isUnstakeNowActive && !isStakeActive ? (
            <Flex
              width={["256px", "400px"]}
              my={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-time-to-unstake")}
                </MText>
                <TooltipWithContent
                  tooltipText={t("appPage.tooltip-time-to-unstake-text")}
                  link={t("appPage.tooltip-time-to-unstake-docs-link")}
                >
                  <IconButton
                    variant="link"
                    aria-label="Info epoch"
                    size="sm"
                    _focus={{ boxShadow: "none" }}
                    icon={<MdInfoOutline />}
                  />
                </TooltipWithContent>
              </Flex>
              <MText type="text-md">{timeToUnstake}</MText>
            </Flex>
          ) : null}
          <MButton
            top={isStakeActive ? ["109", "133px"] : ["182px", "205px"]}
            variant="ghost"
            position="absolute"
            aria-label="Swap direction"
            bg="gray.50"
            border="2px"
            borderColor={colors.white}
            p={0}
            height="30px"
            minWidth="30px"
            rounded="3xl"
            zIndex={10}
            onClick={() => setStakeActive(!isStakeActive)}
          >
            <MdArrowDownward color={colors.marinadeGreen} fontSize="24px" />
          </MButton>
          <MButton
            font="text-xl"
            bg={colors.marinadeGreen}
            isLoading={stakeLoading}
            _hover={{ bg: colors.green800 }}
            colorScheme={colors.marinadeGreen}
            rounded="md"
            px={4}
            height="48px"
            mx={4}
            mt={5}
            onClick={stakeHandler}
          >
            {isStakeActive ? t("appPage.stake-sol-action") : unstakeText}
          </MButton>
          {!isUnstakeNowActive ? <UnstakeTicketsSection /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakeInputsSection;
