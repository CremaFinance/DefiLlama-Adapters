import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  ModalHeader,
  Button,
  useToast,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

import { useChain } from "../../../contexts/ConnectionProvider";
import { useMarinade } from "../../../contexts/MarinadeContext";
import { useQuarryProvider } from "../../../contexts/QuaryContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import { useTracking } from "../../../hooks/useTracking";
import { useWallet } from "../../../hooks/useWallet";
import colors from "../../../styles/customTheme/colors";
import { basicInputChecks } from "../../../utils/basic-input-checks";
import { checkNativeSOLBalance } from "../../../utils/check-native-sol-balance";
import { format2Dec } from "../../../utils/number-to-short-version";
import StakeInput, { StakeInputTypeEnum } from "../StakeInput";
import SwitchButtons from "../SwitchButtons";
import TransactionLink from "../TransactionLink";

interface MSolStakeModalProps {
  onClose: () => Promise<void> | void;
  isOpen: boolean;
}

// eslint-disable-next-line complexity
const MSolStakeModal = ({
  onClose: onCloseProp,
  isOpen: isOpenProp,
}: MSolStakeModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { track } = useTracking();
  const router = useRouter();

  const [isDepositActive, setDepositActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected } = useWallet();
  const chain = useChain();
  const {
    farms: { mSOL },
  } = useQuarryProvider();
  const userStake = mSOL?.minerData?.balance;

  const marinade = useMarinade();
  const marinadeState = marinade?.marinadeState;

  // eslint-disable-next-line consistent-return
  const stakemSolHandler = () => {
    const basicInputChecksErrors = basicInputChecks(Number(amount), connected);
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    if (Number(amount) > Number(stSOLBalance)) {
      return toast({
        title: t("mndePage.msol-stake-modal.insufficient-funds-to-deposit"),
        description: t(
          "mndePage.msol-stake-modal.requested-deposit-not-enough-funds"
        )
          .replace("{{amount}}", amount)
          .replace("{{mSOLBalance}}", stSOLBalance),
        status: "warning",
      });
    }
    const fundsNeeded =
      (marinadeState?.transactionFee ?? 0) * 4 +
      (marinadeState?.state.rent_exempt_for_token_acc.toNumber() ?? 0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    setLoading(true);

    mSOL
      .stake(amount)
      .then(
        (transactionSignature) => {
          setAmount("");
          toast({
            title: t("mndePage.msol-stake-modal.msol-deposit-confirmed"),
            description: (
              <p>
                {t("mndePage.msol-stake-modal.successfully-deposited-msol")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Deposit mSOL Farm",
            category: "mSOL Farm",
            action: "Add",
            label: "Success",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("appPage.something-went-wrong"),
            description: error.toString().includes("0xa7")
              ? t("mndePage.msol-stake-modal.your-msol-account-is-deactivated")
              : error.message,
            status: "warning",
          });
          track({
            event: "Deposit mSOL Farm Error",
            category: "mSOL Farm",
            action: "Add",
            label: "Error",
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line consistent-return
  const unstakeMSolHandler = () => {
    const basicInputChecksErrors = basicInputChecks(Number(amount), connected);
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    if (!userStake) return false;

    const fundsNeeded =
      (marinadeState?.transactionFee ?? 0) * 4 +
      (marinadeState?.state.rent_exempt_for_token_acc.toNumber() ?? 0);

    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    if (Number(amount) > userStake.toNumber() / LAMPORTS_PER_SOL) {
      return toast({
        title: t("mndePage.msol-stake-modal.insufficient-funds-to-withdraw"),
        description: t(
          "mndePage.msol-stake-modal.requested-withdraw-not-enough-funds"
        )
          .replace("{{amount}}", amount)
          .replace(
            "{{mSOLBalance}}",
            format2Dec(userStake.toNumber(), LAMPORTS_PER_SOL)
          ),
        status: "warning",
      });
    }

    setLoading(true);

    mSOL
      .withdraw(amount)
      .then(
        (transactionSignature) => {
          setAmount("");

          toast({
            title: t("mndePage.msol-stake-modal.msol-withdrew-confirmed"),
            description: (
              <p>
                {t("mndePage.msol-stake-modal.successfully-withdrew-msol")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Withdraw mSOL Farm",
            category: "mSOL Farm",
            action: "Remove",
            label: "Success",
          });
        },
        // eslint-disable-next-line sonarjs/no-identical-functions
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("appPage.something-went-wrong"),
            description: error.toString().includes("0xa7")
              ? t("mndePage.msol-stake-modal.your-msol-account-is-deactivated")
              : error.message,
            status: "warning",
          });
          track({
            event: "Withdraw mSOL Farm Error",
            category: "mSOL Farm",
            action: "Remove",
            label: "Error",
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpenProp} onClose={onCloseProp} isCentered>
      <ModalOverlay w="100vw" />
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
              leftText={t("mndePage.msol-stake-modal.deposit-msol")}
              rightText={t("mndePage.msol-stake-modal.withdraw-msol")}
              height={40}
              mb={8}
              width={["254px", "322px"]}
              buttonWidth={["121px", "155px"]}
              active={isDepositActive}
              font="text-lg"
              display="flex"
              handleSwitch={setDepositActive}
            />
          </Flex>
          <StakeInput
            stakeInputType={StakeInputTypeEnum.Source}
            onValueChange={setAmount}
            tokenName="mSOL"
            tokenIcon="/icons/mSOL.svg"
            tokenBalance={
              isDepositActive
                ? stSOLBalance ?? 0
                : (userStake?.toNumber() ?? 0) / LAMPORTS_PER_SOL
            }
            value={amount}
            mb={4}
          />
          <Flex justifyContent="center">
            {isDepositActive ? (
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
                onClick={
                  stSOLBalance
                    ? stakemSolHandler
                    : () => router.push("/app/staking")
                }
              >
                {stSOLBalance
                  ? t("mndePage.msol-stake-modal.deposit-msol")
                  : t("mndePage.msol-stake-modal.get-msol")}
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
                onClick={
                  userStake?.toNumber()
                    ? unstakeMSolHandler
                    : () => setDepositActive(true)
                }
              >
                {userStake?.toNumber()
                  ? t("mndePage.msol-stake-modal.withdraw-msol")
                  : t("mndePage.msol-stake-modal.deposit-first-msol")}
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MSolStakeModal;
