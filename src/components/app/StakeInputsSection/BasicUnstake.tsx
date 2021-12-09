import { Flex, IconButton, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState, useContext, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import UnstakeTicketsSection from "../UnstakeTicketsSection";
import StakeInput, {
  StakeAccountType,
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import TransactionLink from "components/molecules/TransactionLink";
import { AccountsContext } from "contexts/AccountsContext";
import { useChain, useConnection, useKeys } from "contexts/ConnectionProvider";
import { useMarinade } from "contexts/MarinadeContext";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import { format5Dec } from "utils/number-to-short-version";

const BasicUnstake = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const connection = useConnection();
  const keys = useKeys();

  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [stSolToUnstake, setStSolToUnstake] = useState<number>(0);
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const { connected: walletConnected, publicKey: walletPubKey } = useWallet();

  const chain = useChain();
  const {
    getTicketAccountsAction,
    ticketAccounts,
    fetchTicketsLoading,
    fetchTicketsLoadingAction,
    walletPubKeyContext,
    resetAccountsAction,
  } = useContext(AccountsContext);

  const marinade = useMarinade();
  const marinadeState = marinade?.marinadeState;

  const unstakeText = isUnstakeNowActive
    ? t("appPage.unstake-now-action")
    : t("appPage.start-delayed-unstake-action");

  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const mSOLvsSOLParity = marinadeState?.state?.st_sol_price
    ? marinadeState?.state?.st_sol_price?.toNumber() / 0x1_0000_0000
    : 0;
  const targetTokenBalance = nativeSOLBalance
    ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
    : 0;
  const timeToUnstake = "~7 days";

  const currentAccount: StakeAccountType = {
    address: "DKVAJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qdfbrvrt5",
    balance: 0.114543543543,
  };
  const stakeAccounts: StakeAccountType[] = [
    {
      address: "asdfJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qvdvwf5",
      balance: 0.115555,
    },
    {
      address: "wwadJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5q4vdg5",
      balance: 0.115454334534,
    },
    {
      address: "sfdsfdfVKRhTrWfVPxzydZQu8q15kWkpe5qpdv5",
      balance: 0.1454353451,
    },
    {
      address: "aaqwsA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qpi55rff",
      balance: 0.11353453534,
    },
    {
      address: "d234dvJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qcdsf4",
      balance: 0.1,
    },
    {
      address: "DKVAJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qpiswy5",
      balance: 0.11,
    },
  ];

  useEffect(() => {
    if (walletConnected) {
      if (walletPubKey?.toBase58() === walletPubKeyContext?.toBase58()) {
        getTicketAccountsAction(
          keys,
          walletConnected,
          connection,
          walletPubKey as PublicKey,
          fetchTicketsLoading
        );
      } else {
        getTicketAccountsAction(
          keys,
          walletConnected,
          connection,
          walletPubKey as PublicKey,
          true
        );
      }
    } else {
      resetAccountsAction();
      fetchTicketsLoadingAction(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected]);

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
        getTicketAccountsAction(
          keys,
          walletConnected,
          connection,
          walletPubKey as PublicKey,
          true
        );
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
        tokenName="mSOL"
        tokenIcon="/icons/mSOL.svg"
        tokenBalance={stSOLBalance ?? 0}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
        mb={2}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Target}
        tokenName="SOL"
        tokenIcon="/icons/solana-dark.png"
        tokenBalance={targetTokenBalance}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
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
        <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity.toFixed(
          5
        )} SOL`}</MText>
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
      {!isUnstakeNowActive ? (
        <UnstakeTicketsSection ticketAccounts={ticketAccounts} />
      ) : null}
    </>
  );
};

export default BasicUnstake;
