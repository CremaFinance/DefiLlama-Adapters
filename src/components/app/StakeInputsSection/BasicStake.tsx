import { Flex, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useChain } from "../../../contexts/ConnectionProvider";
import { useMarinade } from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import StakeInput, {
  StakeAccountType,
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import TransactionLink from "components/molecules/TransactionLink";
import { useStats } from "contexts/StatsContext";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import { format5Dec } from "utils/number-to-short-version";

const BasicStake = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [stakeText, setStakeText] = useState(t("appPage.stake-sol-action"));
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

  const mSOLvsSOLParity = marinadeState?.state?.st_sol_price
    ? marinadeState?.state?.st_sol_price?.toNumber() / 0x1_0000_0000
    : 0;
  const sourceTokenBalance = nativeSOLBalance
    ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
    : 0;

  const handleSelectAccountCallback = (value: boolean) => {
    setStakeText(
      value
        ? t("appPage.deposit-stake-account-action")
        : t("appPage.stake-sol-action")
    );
  };

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

  // eslint-disable-next-line consistent-return
  const stakeHandler = () => {
    let firstTimeStaker = Number(format5Dec(stSOLBalance ?? 0)) === 0;
    const basicInputChecksErrors = basicInputChecks(
      solToStake,
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
        title: t("ammount-exceeds-current-staking-cap"),
        description: t("try-using-max-button"),
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
          if (firstTimeStaker) {
            onOpen();
            firstTimeStaker = false;
          }
          setSolToStake(0);
          toast({
            title: t("stake-sol-confirmed"),
            description: (
              <p>
                {t("successfully-staked-your-sol")}{" "}
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

          if (error.toString().indexOf("Wallet") === 0) {
            return;
          }

          let description = error.message;
          if (error.toString().includes("0xec6")) {
            description = t("capped-tvl-is-full");
          } else if (error.toString().includes("no record of a prior credit")) {
            description = t("missing-sol-for-fee");
          }

          toast({
            title: t("something-went-wrong"),
            description,
            status: "warning",
          });
        }
      )
      .finally(() => setStakeLoading(false));
  };

  return (
    <>
      <StakeInput
        selectAccountCallback={handleSelectAccountCallback}
        stakeInputType={StakeInputTypeEnum.Source}
        onValueChange={setSolToStake}
        tokenName="SOL"
        tokenIcon="/icons/solana-dark.png"
        tokenBalance={sourceTokenBalance}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
        value={solToStake}
        mb={2}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Target}
        tokenName="mSOL"
        tokenIcon="/icons/mSOL.svg"
        tokenBalance={stSOLBalance ?? 0}
        currentAccount={currentAccount}
        stakeAccounts={stakeAccounts}
        value={solToStake / mSOLvsSOLParity}
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
          <MText type="text-md">{t("appPage.stake-inputs-stake-fee")}</MText>
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
        {stakeText}
      </MButton>
    </>
  );
};

export default BasicStake;
