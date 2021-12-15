import { Flex, IconButton, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState, useContext, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import UnstakeTicketsSection, { TicketAccount } from "../UnstakeTicketsSection";
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
import { format5Dec, format9Dec } from "utils/number-to-short-version";

import DelayedUnstakeModal from "./DelayedUnstakeModal";

const BasicUnstake = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const connection = useConnection();
  const keys = useKeys();

  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [stSolToUnstake, setStSolToUnstake] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
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

  const resetInputs = () => {
    setUnstakeLoading(false);
    setStSolToUnstake("");

    if (!isUnstakeNowActive) {
      setShowModal(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const unstakeHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      Number(stSolToUnstake),
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
    if (Number(stSolToUnstake) === Math.round(stSOLBalance * 1e5) / 1e5) {
      // Note: input text has 5 decimals (rounded), while stSOLBalance has full decimals
      // so if the user wants to unstake all, get precise balance
      toUnstakeFullDecimals = stSOLBalance;
    } else {
      toUnstakeFullDecimals = stSolToUnstake;
    }

    if (toUnstakeFullDecimals > stSOLBalance) {
      const description = t("appPage.you-requested-to-unstake")
        ?.replace(
          "{{requestedAmount}}",
          format5Dec(Number(toUnstakeFullDecimals))
        )
        .replace("{{actualAmount}}", format5Dec(stSOLBalance));

      toast({
        title: t("appPage.insufficient-funds-to-unstake"),
        description,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    setUnstakeLoading(true);

    marinade
      .runUnstake(Number(toUnstakeFullDecimals) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          setStSolToUnstake("");
          toast({
            title: t("appPage.unstake-mSOL-confirmed"),
            description: (
              <p>
                {t("appPage.successfully-unstake-mSOL")}{" "}
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
            description = t(
              "appPage.insufficient-liquidity-in-the-liquidity-pool"
            );
          } else if (error.toString().includes("no record of a prior credit")) {
            description = t("appPage.you-need-some-sol-balance-for-fee");
          }

          toast({
            title: t("appPage.something-went-wrong"),
            description,
            status: "warning",
          });
        }
      )
      .then(() => setStSolToUnstake(""))
      .finally(() => {
        setUnstakeLoading(false);
        getTicketAccountsAction(
          keys,
          walletConnected,
          connection,
          walletPubKey as PublicKey,
          true
        );
        setStSolToUnstake("");
        resetInputs();
      });
  };

  const runClaimHandler = (accountPubkey: TicketAccount["key"]) => {
    marinade
      .runClaim(accountPubkey)
      .then(
        (transactionSignature) => {
          const successTitleMessage = t(
            "appPage.claim-success-tooltip-title"
          )?.replace("{{accountPubkey}}", accountPubkey);
          toast({
            title: successTitleMessage,
            description: (
              <p>
                {t("appPage.claim-success-tooltip-body")}
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
          toast({
            title: "Something went wrong",
            // eslint-disable-next-line no-nested-ternary
            description: error.toString().includes("0x1104")
              ? t("appPage.claim-error-tooltip-body-not-ready-yet")
              : error.toString().includes("no record of a prior credit")
              ? t("appPage.claim-error-tooltip-body-not-enough-sol-balance")
              : error.message,
            status: "warning",
          });
        }
      )
      .then(() =>
        getTicketAccountsAction(
          keys,
          walletConnected,
          connection,
          walletPubKey as PublicKey,
          true
        )
      );
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
        handleSwitch={() => {
          setUnstakeNowActive((val) => !val);
          setStSolToUnstake("");
        }}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Source}
        onValueChange={setStSolToUnstake}
        tokenName="mSOL"
        tokenIcon="/icons/mSOL.svg"
        tokenBalance={stSOLBalance ?? 0}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
        value={stSolToUnstake}
        mb={2}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Target}
        tokenName="SOL"
        tokenIcon="/icons/solana-dark.png"
        tokenBalance={targetTokenBalance}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
        value={format9Dec(Number(stSolToUnstake) * mSOLvsSOLParity)}
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
        onClick={isUnstakeNowActive ? unstakeHandler : () => setShowModal(true)}
      >
        {unstakeText}
      </MButton>

      <DelayedUnstakeModal
        stSolToUnstake={Number(stSolToUnstake)}
        isOpen={showModal}
        onClose={resetInputs}
      />
      {!isUnstakeNowActive ? (
        <UnstakeTicketsSection
          ticketAccounts={ticketAccounts}
          runClaimHandler={runClaimHandler}
        />
      ) : null}
    </>
  );
};

export default BasicUnstake;
