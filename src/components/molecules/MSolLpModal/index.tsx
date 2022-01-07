import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";

import StakeInput, { StakeInputTypeEnum } from "../StakeInput";
import SwitchButtons from "../SwitchButtons";
import TransactionLink from "../TransactionLink";
import { useChain } from "contexts/ConnectionProvider";
import { useMarinade } from "contexts/MarinadeContext";
import { useQuarryProvider } from "contexts/QuaryContext";
import { useUserBalance } from "contexts/UserBalanceContext";
import { usePrice } from "hooks/usePrice";
import { useTracking } from "hooks/useTracking";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { basicInputChecks } from "utils/basic-input-checks";
import { checkNativeSOLBalance } from "utils/check-native-sol-balance";
import {
  format2Dec,
  format5Dec,
  numberToShortVersion,
} from "utils/number-to-short-version";

interface Props {
  onCloseProp: () => Promise<void> | void;
  isOpenProp: boolean;
}

const MSolLpModal = ({ isOpenProp, onCloseProp }: Props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { track } = useTracking();
  const trackCategory = "MSOL-SOL LP Farm";
  const [isDepostActive, setDepositActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const marinade = useMarinade();
  const { connected: isWalletConnected } = useWallet();
  const { liqSOLBalance, liquiditySOLPart, nativeSOLBalance } =
    useUserBalance();
  const {
    farms: { mLP },
  } = useQuarryProvider();
  const userStake = mLP?.minerData?.balance || new BN(0);
  const chain = useChain();
  const { data } = usePrice(coinSymbols.SOL);
  const solUSD = data ? data[coinSymbols.SOL]?.usd : 0;

  const depositHandler = () => {
    const fundsNeeded =
      (marinade?.marinadeState?.transactionFee ?? 0) * 4 +
      4 *
        (marinade?.marinadeState?.state.rent_exempt_for_token_acc.toNumber() ??
          0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );

    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }
    if (Number(amount) > Number(liqSOLBalance)) {
      toast({
        title: t("mndePage.deposit-msol-sol-lp-modal.insufficient-funds.title"),
        description: t(
          "mndePage.deposit-msol-sol-lp-modal.insufficient-funds.description"
        )
          .replace("{amount}", amount)
          .replace("{balance}", liqSOLBalance),
        status: "warning",
      });
      return false;
    }

    setLoading(true);

    return mLP
      ?.stake(amount)
      .then(
        (transactionSignature) => {
          setAmount("");
          toast({
            title: t("mndePage.deposit-msol-sol-lp-modal.deposit-action.title"),
            description: (
              <p>
                {t("mndePage.deposit-msol-sol-lp-modal.deposit-action.success")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Deposit MSOL-SOL LP Farm",
            category: trackCategory,
            action: "Add",
            label: "Success",
          });
        },
        (error) => {
          toast({
            title: t("mndePage.deposit-msol-sol-lp-modal.errors.title"),
            description: error.message,
            status: "warning",
          });
          track({
            event: "Deposit MSOL-SOL LP Farm Error",
            category: trackCategory,
            action: "Add",
            label: "Error",
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  const withdrawDepositHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      Number(amount),
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    const fundsNeeded =
      (marinade?.marinadeState?.transactionFee ?? 0) * 4 +
      4 *
        (marinade?.marinadeState?.state.rent_exempt_for_token_acc.toNumber() ??
          0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );

    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    if (Number(amount) > userStake.toNumber() / LAMPORTS_PER_SOL) {
      toast({
        title: t("mndePage.deposit-msol-sol-lp-modal.insufficient-funds.title"),
        description: t(
          "mndePage.deposit-msol-sol-lp-modal.insufficient-funds.description"
        )
          .replace("{amount}", amount)
          .replace(
            "{balance}",
            format2Dec(userStake.toNumber(), LAMPORTS_PER_SOL)
          ),
        status: "warning",
      });
      return false;
    }
    setLoading(true);

    return mLP
      .withdraw(amount)
      .then(
        (transactionSignature) => {
          setAmount("");
          toast({
            title: t(
              "mndePage.deposit-msol-sol-lp-modal.withdraw-action.title"
            ),
            description: (
              <p>
                {t(
                  "mndePage.deposit-msol-sol-lp-modal.withdraw-action.success"
                )}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Withdraw MSOL-SOL LP Farm",
            category: trackCategory,
            action: "Remove",
            label: "Success",
          });
        },
        (error) => {
          toast({
            title: t("mndePage.deposit-msol-sol-lp-modal.errors.title"),
            description: error.toString().includes("0xa7")
              ? t(
                  "mndePage.deposit-msol-sol-lp-modal.errors.account-deactivated"
                )
              : error.message,
            status: "warning",
          });
          track({
            event: "Withdraw MSOL-SOL LP Farm Error",
            category: trackCategory,
            action: "Remove",
            label: "Error",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpenProp} onClose={onCloseProp} isCentered>
      <ModalOverlay />
      <ModalContent
        px={[4, 8]}
        pb={[4, 8]}
        w={["90vw", "480px"]}
        backgroundColor="white"
        overflow="auto"
      >
        <ModalHeader mb={[2, 0]} />

        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody p={0}>
          <Flex display="flex" justifyContent="center">
            <SwitchButtons
              leftText={t("mndePage.deposit-msol-sol-lp-modal.deposit")}
              rightText={t("mndePage.deposit-msol-sol-lp-modal.withdraw")}
              height={40}
              mb={8}
              width={["254px", "322px"]}
              buttonWidth={["121px", "155px"]}
              active={isDepostActive}
              font="text-sm"
              display="flex"
              handleSwitch={(prop) => {
                setDepositActive(prop);
                setAmount("");
              }}
            />
          </Flex>
          <Flex mb={2}>
            <Image src="/icons/mSOL-SOL LP.svg" width="24px" height="24px" />
            <Text marginLeft="8px" fontSize="14.4px">
              {t("appPage.liquidity-modal.pool")}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text lineHeight="21.6px" fontSize="14.4px">
              {t("appPage.liquidity-modal.balance")}
            </Text>
            <Text lineHeight="21.6px" fontSize="14.4px">
              {format5Dec(liqSOLBalance ?? 0)}
            </Text>
          </Flex>
          <Text align="end" lineHeight="21.6px" fontSize="14.4px">
            {`= ${format5Dec(liquiditySOLPart ?? 0)} SOL`}
          </Text>
          <Text align="end" mb={4} lineHeight="21.6px" fontSize="14.4px">
            {`= $ ${format2Dec((liquiditySOLPart ?? 0) * (solUSD ?? 0))}`}
          </Text>
          {isDepostActive ? (
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setAmount}
              tokenName="LP"
              tokenIcon="/icons/mSOL-SOL LP.svg"
              tokenBalance={liqSOLBalance || 0}
              value={amount}
              mb={4}
            />
          ) : (
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setAmount}
              tokenName="LP"
              tokenIcon="/icons/mSOL-SOL LP.svg"
              tokenBalance={
                parseFloat(
                  numberToShortVersion(userStake.toNumber() / LAMPORTS_PER_SOL)
                ) ?? 0
              }
              value={amount}
              mb={4}
            />
          )}
          <Flex justifyContent="center">
            {isDepostActive ? (
              <Button
                font="text-xl"
                bg={colors.marinadeGreen}
                isLoading={loading}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                _focus={{ boxShadow: "none" }}
                my={8}
                onClick={() => depositHandler()}
              >
                {t("mndePage.deposit-msol-sol-lp-modal.action-button.deposit")}
              </Button>
            ) : (
              <Button
                font="text-xl"
                bg={colors.marinadeGreen}
                isLoading={loading}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                _focus={{ boxShadow: "none" }}
                my={8}
                onClick={() => withdrawDepositHandler()}
              >
                {t("mndePage.deposit-msol-sol-lp-modal.action-button.withdraw")}
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MSolLpModal;
