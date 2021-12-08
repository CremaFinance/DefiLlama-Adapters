import { Flex, IconButton, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import UnstakeTicketsSection from "../UnstakeTicketsSection";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import TransactionLink from "components/molecules/TransactionLink";
import { useChain } from "contexts/ConnectionProvider";
import { useMarinade } from "contexts/MarinadeContext";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import { format5Dec } from "utils/number-to-short-version";

const BasicUnstake = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [stSolToUnstake, setStSolToUnstake] = useState<number>(0);
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const chain = useChain();

  const marinade = useMarinade();

  const unstakeText = isUnstakeNowActive
    ? t("appPage.unstake-now-action")
    : t("appPage.start-delayed-unstake-action");

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.01002;
  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const sourceToken = "mSOL";
  const sourceTokenIcon = "/icons/mSOL.svg";
  const sourceTokenBalance = stSOLBalance ?? 0;
  const targetToken = "SOL";
  const targetTokenIcon = "/icons/solana-dark.png";
  const targetTokenBalance = 0;
  const timeToUnstake = "~7 days";

  // eslint-disable-next-line consistent-return
  const unstakeHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      stSolToUnstake,
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    const fundsNeeded = marinade.marinadeState?.transactionFee;
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded ?? 0
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    if (!stSOLBalance || Number.isNaN(stSOLBalance)) return false;

    let toUnstakeFullDecimals;
    if (stSolToUnstake === Math.round(stSOLBalance * 1e5) / 1e5) {
      // Note: input text has 5 decimals (rounded), while stSOLBalance has full decimals
      // so if the user wants to unstake all, get precise balance
      toUnstakeFullDecimals = stSOLBalance;
    } else {
      toUnstakeFullDecimals = stSolToUnstake;
    }

    if (toUnstakeFullDecimals > stSOLBalance) {
      toast({
        title: "Insufficient funds to unstake",
        description: `You requested to unstake ${Number(
          format5Dec(toUnstakeFullDecimals)
        )} mSOL (have only ${Number(format5Dec(stSOLBalance))})`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    setUnstakeLoading(true);

    marinade
      .runUnstake(toUnstakeFullDecimals * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          setStSolToUnstake(0);
          toast({
            title: "Unstake mSOL confirmed",
            description: (
              <p>
                {"You've successfully unstaked your mSOL "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          let description = error.message;
          if (error.toString().includes("0x1199")) {
            description =
              "Insufficient Liquidity in the Liquidity Pool. Please use Delayed Unstake";
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
      .then(() => setStSolToUnstake(0))
      .finally(() => {
        setUnstakeLoading(false);
        setStSolToUnstake(0);
      });
  };

  return (
    <>
      <SwitchButtons
        leftText={t("appPage.unstake-now-action")}
        rightText={t("appPage.delayed-unstake-action")}
        mb={8}
        height={40}
        width={["254px", "322px"]}
        buttonWidth={["121px", "155px"]}
        active={isUnstakeNowActive}
        font="text-lg"
        display="flex"
        handleSwitch={setUnstakeNowActive}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Source}
        onValueChange={setStSolToUnstake}
        tokenName={sourceToken}
        tokenIcon={sourceTokenIcon}
        tokenBalance={sourceTokenBalance}
        width={["256px", "400px"]}
        mb={2}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Target}
        tokenName={targetToken}
        tokenIcon={targetTokenIcon}
        tokenBalance={targetTokenBalance}
        tokenCardWidth={["87px"]}
        width={["256px", "400px"]}
        mb={2}
      />
      <Flex width={["256px", "400px"]} my={1} justifyContent="space-between">
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
      <Flex
        width={["256px", "400px"]}
        mt={1}
        mb={1}
        justifyContent="space-between"
      >
        <Flex>
          <MText type="text-md">{t("appPage.stake-inputs-unstake-fee")}</MText>
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
      {!isUnstakeNowActive ? (
        <Flex width={["256px", "400px"]} my={1} justifyContent="space-between">
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
        font="text-xl"
        bg={colors.marinadeGreen}
        isLoading={unstakeLoading}
        _hover={{ bg: colors.green800 }}
        colorScheme={colors.marinadeGreen}
        rounded="md"
        px={4}
        height="48px"
        mx={4}
        mt={5}
        onClick={unstakeHandler}
      >
        {unstakeText}
      </MButton>
      {!isUnstakeNowActive ? <UnstakeTicketsSection /> : null}
    </>
  );
};

export default BasicUnstake;
