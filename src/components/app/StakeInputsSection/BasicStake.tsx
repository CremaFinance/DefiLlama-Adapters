import {
  Flex,
  IconButton,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";
import { useTranslation } from "next-export-i18n";
import { useContext, useEffect, useState, useMemo } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useChain, useConnection } from "../../../contexts/ConnectionProvider";
import { useMarinade } from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import TooltipWithContent from "../../molecules/TooltipWithContent";
import StakeInput, {
  StakeAccountType,
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SuccessStakeModal from "components/molecules/SuccessStakeModal";
import TransactionLink from "components/molecules/TransactionLink";
import { AccountsContext } from "contexts/AccountsContext";
import { useStats } from "contexts/StatsContext";
import { useEpochInfo } from "hooks/useEpochInfo";
import { useTracking } from "hooks/useTracking";
import { useWallet } from "hooks/useWallet";
import { StakeAccount } from "solana/domain/stake-account";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import { format5Dec } from "utils/number-to-short-version";
import { shortenAddress } from "utils/shorten-address";

const BasicStake = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const { track } = useTracking();

  const connection = useConnection();
  const [stakeText, setStakeText] = useState(t("appPage.stake-sol-action"));
  const [stakeLoading, setStakeLoading] = useState(false);
  const [solToStake, setSolToStake] = useState<string>("");
  const [solStaked, setSolStaked] = useState("");
  const [stakeAccount, setStakeAccount] = useState<StakeAccountType | null>(
    null
  );
  const { nativeSOLBalance } = useUserBalance();
  const { connected: isWalletConnected, publicKey: walletPubKey } = useWallet();
  const epochInfo = useEpochInfo()?.data;
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      if (stakeAccount === null) {
        setSolToStake("");
      }
    },
  });
  const { totalStaked } = useStats();
  const chain = useChain();

  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;

  const {
    getStakeAccountsAction,
    stakeAccounts,
    fetchStakesLoading,
    walletPubKeyContext,
    resetAccountsAction,
    fetchStakesLoadingAction,
  } = useContext(AccountsContext);

  useEffect(() => {
    if (walletPubKey === null || !isWalletConnected) {
      resetAccountsAction();
      fetchStakesLoadingAction(false);
      return;
    }

    if (walletPubKey?.toBase58() === walletPubKeyContext?.toBase58()) {
      getStakeAccountsAction(
        isWalletConnected,
        connection,
        walletPubKey,
        !fetchStakesLoading || !stakeLoading
      );
    } else {
      getStakeAccountsAction(isWalletConnected, connection, walletPubKey, true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWalletConnected, stakeLoading]);

  const mSOLvsSOLParity = marinadeState?.state?.st_sol_price
    ? marinadeState.state.st_sol_price.toNumber() / 0x1_0000_0000
    : 1;
  const sourceTokenBalance = nativeSOLBalance
    ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
    : 0;

  const mSOLReceived = format5Dec(Number(solStaked) / mSOLvsSOLParity);

  const handleSelectAccountCallback = (
    value: boolean,
    account: StakeAccountType
  ) => {
    setStakeText(
      value
        ? t("appPage.deposit-stake-account-action")
        : t("appPage.stake-sol-action")
    );

    setStakeAccount(value ? account : null);
  };

  const currentAccount: StakeAccountType = {
    address: walletPubKey?.toBase58().toString() || "",
    balance: sourceTokenBalance,
  };
  const parseStakeAccounts = (): StakeAccountType[] => {
    return stakeAccounts
      ?.filter(
        (account: StakeAccount) =>
          account?.account?.data?.parsed?.info?.stake != null
      )
      ?.filter(
        (account: StakeAccount) =>
          account?.account?.data?.parsed?.info?.stake?.delegation
            ?.deactivationEpoch === "18446744073709551615"
      )
      .map((account: StakeAccount) => {
        const stakeStart = Number(
          account?.account?.data?.parsed?.info?.stake?.delegation
            ?.activationEpoch
        );
        const currentEpoch = epochInfo?.epoch;
        if (
          (currentEpoch &&
            marinade?.marinadeState?.state?.stake_system?.min_stake !==
              undefined &&
            stakeStart > currentEpoch - 2) ||
          new BN(
            account?.account?.data?.parsed?.info?.stake?.delegation?.stake
          ).lt(
            marinade?.marinadeState?.state?.stake_system?.min_stake ??
              new BN(LAMPORTS_PER_SOL)
          )
        ) {
          return { ...account, isStakable: false };
        }
        return { ...account, isStakable: true };
      })
      .map((account: StakeAccount) => {
        return {
          address: account?.pubkey?.toBase58().toString(),
          balance: Number(
            format5Dec(
              Number(
                account?.account?.data?.parsed?.info?.stake?.delegation?.stake
              ),
              LAMPORTS_PER_SOL
            )
          ),
          isStakable: account.isStakable,
        };
      })
      .sort((accountA: StakeAccountType, accountB: StakeAccountType) => {
        return accountA.balance - accountB.balance;
      });
  };

  const advancedStake = async () => {
    const [selectedStakeAccount] = stakeAccounts.filter(
      (account: StakeAccount) =>
        account?.pubkey.toBase58().toString() === stakeAccount?.address
    );
    if (selectedStakeAccount !== null) {
      try {
        setStakeLoading(true);

        const accountAddress = shortenAddress(stakeAccount?.address || "");

        const transactionSignature = await marinade.runDepositStakeAccount(
          selectedStakeAccount
        );

        toast({
          title: t("appPage.stake-account.title", { accountAddress }),
          description: (
            <p>
              {t("appPage.stake-account.message")}{" "}
              <TransactionLink
                chainName={chain.name}
                transactionid={transactionSignature}
              />
            </p>
          ),
          status: "success",
        });
        track({
          event: "Stake SOL Account",
          category: "Account Staking",
          action: "Stake",
          label: "Success",
        });

        setSolStaked(solToStake);
      } catch (error) {
        const errors = {
          mainnetFull: "0xec6",
          checkValidatorCommision: "0xec6",
          accountLockup: "0xb3aa",
          invalidAccountData: "invalid account data for instruction",
          noPriorRecord: "no record of a prior credit",
          insufficientFunds: "insufficient funds for instruction",
        };
        const description =
          Object.keys(errors)
            .slice(0)
            .reduce((previousValue, currentValue, currentIndex, array) => {
              if (
                (error as Error)
                  .toString()
                  .includes((errors as { [key: string]: string })[currentValue])
              ) {
                array.splice(1); // breaks reduce if result is found
                return t(`appPage.stake-account-errors.${currentValue}`);
              }
              return "";
            }, "") || (error as Error).message;
        toast({
          title: t("appPage.something-went-wrong"),
          description,
          status: "warning",
        });
        track({
          event: "Stake SOL Account Error",
          category: "Account Staking",
          action: "Stake",
          label: "Error",
          description,
        });
      } finally {
        setStakeLoading(false);
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const stakeHandler = () => {
    if (stakeAccount !== null) {
      return advancedStake();
    }
    const basicInputChecksErrors = basicInputChecks(
      Number(solToStake),
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    if (
      Number(solToStake) +
        Number(format5Dec(totalStaked ?? 0, LAMPORTS_PER_SOL)) >
      Number(format5Dec(Number(state?.staking_sol_cap), LAMPORTS_PER_SOL))
    ) {
      return toast({
        title: t("appPage.ammount-exceeds-current-staking-cap"),
        description: t("appPage.try-using-max-button"),
        status: "warning",
        duration: 10000,
      });
    }

    const fundsNeeded =
      Number(solToStake) * LAMPORTS_PER_SOL +
      (marinadeState?.transactionFee ?? 0) * 4 +
      (state?.rent_exempt_for_token_acc?.toNumber() ?? 0);

    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );

    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    setStakeLoading(true);

    marinade
      .runStake(Number(solToStake) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          onOpen();
          toast({
            title: t("appPage.stake-sol-confirmed"),
            description: (
              <p>
                {t("appPage.successfully-staked-your-sol")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Stake SOL",
            category: "Basic Staking",
            action: "Stake",
            label: "Success",
          });

          setSolStaked(solToStake);
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          let description = error.message;
          if (error.toString().includes("0xec6")) {
            description = t("appPage.capped-tvl-is-full");
          } else if (error.toString().includes("no record of a prior credit")) {
            description = t("appPage.missing-sol-for-fee");
          }

          toast({
            title: t("appPage.something-went-wrong"),
            description,
            status: "warning",
          });

          track({
            event: "Stake SOL Error",
            category: "Basic Staking",
            action: "Stake",
            label: "Error",
            description,
          });
        }
      )
      .finally(() => setStakeLoading(false));
  };

  const parsedStakeAccounts = useMemo(() => {
    return parseStakeAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeAccounts]);

  return (
    <>
      <StakeInput
        selectAccountCallback={handleSelectAccountCallback}
        stakeInputType={StakeInputTypeEnum.Source}
        onValueChange={setSolToStake}
        tokenName="SOL"
        tokenIcon="/icons/solana-dark.png"
        tokenBalance={(nativeSOLBalance ?? 0) / LAMPORTS_PER_SOL}
        currentAccount={currentAccount}
        stakeAccounts={parsedStakeAccounts}
        value={solToStake}
        mb={2}
        isLoading={stakeLoading}
      />
      {isWalletConnected ? (
        <MButton
          font="text-lg"
          bg={colors.marinadeGreen}
          isLoading={stakeLoading}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.marinadeGreen}
          rounded="md"
          px={4}
          height="40px"
          width="100%"
          mx={4}
          my={4}
          onClick={stakeHandler}
        >
          {stakeText}
        </MButton>
      ) : (
        <Box my={4} width="100%">
          <ConnectWallet props={{ width: "100%" }} />
        </Box>
      )}

      <Flex width="100%" my={1} justifyContent="space-between">
        <MText type="text-md">{t("appPage.conversion-explained")}</MText>
        <MText type="text-md">{`${
          Number(solToStake) / mSOLvsSOLParity
        } mSOL`}</MText>
      </Flex>
      <Flex width="100%" my={1} justifyContent="space-between">
        <Flex>
          <MText type="text-md">
            {t("appPage.stake-inputs-exchange-rate")}
          </MText>
          <TooltipWithContent tooltipText={t("appPage.exchange-rate-tooltip")}>
            <IconButton
              variant="link"
              aria-label="Exchange rate info"
              size="sm"
              _focus={{ boxShadow: "none" }}
              icon={<MdInfoOutline />}
            />
          </TooltipWithContent>
        </Flex>
        <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity.toFixed(
          5
        )} SOL`}</MText>
      </Flex>
      <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
        <Flex>
          <MText type="text-md">{t("appPage.stake-inputs-deposit-fee")}</MText>
          <TooltipWithContent tooltipText={t("appPage.deposit-fee-tooltip")}>
            <IconButton
              variant="link"
              aria-label="Info stake fee"
              size="sm"
              _focus={{ boxShadow: "none" }}
              icon={<MdInfoOutline />}
            />
          </TooltipWithContent>
        </Flex>
        <MText type="text-md">0%</MText>
      </Flex>
      <SuccessStakeModal
        isOpen={isOpen}
        onClose={onClose}
        stakedAmount={mSOLReceived}
        stakedCurrency="mSOL"
      />
    </>
  );
};

export default BasicStake;
