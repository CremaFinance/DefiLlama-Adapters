import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
  useToast,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import dayjs from "dayjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useChain } from "../../../contexts/ConnectionProvider";
import {
  useMarinade,
  useMarinadeState,
} from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import { useEpochInfo } from "../../../hooks/useEpochInfo";
import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import { basicInputChecks } from "../../../utils/basic-input-checks";
import { checkNativeSOLBalance } from "../../../utils/check-native-sol-balance";
import { format5Dec } from "../../../utils/number-to-short-version";
import { DEFAULT_ENDPOINT } from "../../../utils/web3/endpoints";
import Button from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import Text from "../../atoms/Text";
import TransactionLink from "components/molecules/TransactionLink";
import { useTracking } from "hooks/useTracking";
import colors from "styles/customTheme/colors";

type DelayedUnstakeModalProps = {
  stSolToUnstake: number;
  isOpen: boolean;
  onClose: () => void;
  triggerTransactionModal: (value: boolean) => void;
};

const DelayedUnstakeModal = ({
  stSolToUnstake,
  isOpen,
  onClose,
  triggerTransactionModal,
}: DelayedUnstakeModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { track } = useTracking();
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const state = useMarinadeState();
  const epochData = useEpochInfo()?.data;
  const marinade = useMarinade();
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const chain = useChain();
  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");

  const EXTRA_WAIT_MILLISECONDS = 1000 * 60 * 60 * 4 + 1000 * 60 * 45; // 4 hours to finnish BE operations + 45 minutes to be safe
  const epochEnds = Date.now() + (epochData?.msUntilEpochEnd ?? 0);

  // eslint-disable-next-line consistent-return
  const delayedUnstakeHandler = () => {
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

    let toUnstakeFullDecimals: number;
    if (stSolToUnstake === Math.round(stSOLBalance * 1e5) / 1e5) {
      // Note: input text has 5 decimals (rounded), while stSOLBalance has full decimals
      // so if the user wants to unstake all, get precise balance
      toUnstakeFullDecimals = stSOLBalance;
    } else {
      toUnstakeFullDecimals = stSolToUnstake;
    }

    if (toUnstakeFullDecimals > stSOLBalance) {
      const description = t("appPage.you-requested-to-unstake")
        ?.replace("{{requestedAmount}}", format5Dec(toUnstakeFullDecimals))
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
    triggerTransactionModal(true);

    marinade
      .runOrderUnstake(toUnstakeFullDecimals * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
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
          track({
            event: "Unstake SOL Account",
            category: "Account Staking",
            action: "Unstake",
            label: "Success",
            sol_amount: toUnstakeFullDecimals,
            transaction_id: uuidv4(),
            currency: "USD",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("appPage.something-went-wrong"),
            description: error.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          track({
            event: "Delayed Unstake SOL Account Error",
            category: "Account Staking",
            action: "Unstake",
            label: "Error",
            description: error.message,
          });
        }
      )
      .finally(() => {
        setUnstakeLoading(false);
        triggerTransactionModal(false);
        onClose();
      });
  };
  const unstakeDate = dayjs(
    new Date(
      epochEnds +
        (epochData?.slotsInEpoch ?? 0) *
          DEFAULT_ENDPOINT.slotTimeAvg1h *
          /* Note: we add one more epoch if stake-delta is already started (we're in the stake-delta-window) */
          (Number(
            marinade?.marinadeState?.state.stake_system?.last_stake_delta_epoch
          ) === epochData?.epoch
            ? 1
            : 0) +
        EXTRA_WAIT_MILLISECONDS
    )
  ).format(" MMMM D YYYY, h:mm a");
  const unstakeAmount =
    (stSolToUnstake &&
      state &&
      state.state?.st_sol_price &&
      format5Dec(
        (stSolToUnstake * state.state.st_sol_price.toNumber()) / 0x1_0000_0000
      )) ||
    "0";
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isWiderThan768 ? "md" : "full"}
    >
      <ModalOverlay />
      <ModalContent py={2}>
        <ModalHeader fontSize="18px">
          <MHeading fontSize="18px">
            {t("appPage.start-delayed-unstake-action")}
          </MHeading>
        </ModalHeader>
        <ModalCloseButton mt={2} mr={2} _focus={{ boxShadow: "none" }} />
        <ModalBody>
          <VStack alignItems="flex-start" spacing={4} fontSize="14px">
            <Text>{t("appPage.delayed-unstake-modal.description")}</Text>
            <MHeading fontSize="14px">
              {t("appPage.delayed-unstake-modal.items.0.title")}
            </MHeading>
            <Text>
              {t("appPage.delayed-unstake-modal.items.0.description")
                ?.replace("{{time}}", unstakeDate)
                .replace("{{amount}}", unstakeAmount)}
            </Text>
            <MHeading fontSize="14px">
              {t("appPage.delayed-unstake-modal.items.1.title")?.replace(
                "{{time}}",
                unstakeDate
              )}
            </MHeading>
            <Text>
              {t("appPage.delayed-unstake-modal.items.1.description")?.replace(
                "{{time}}",
                unstakeDate
              )}
            </Text>
            <Text>
              {t("appPage.delayed-unstake-modal.items.2.description")}
            </Text>
            <Text>
              {t("appPage.delayed-unstake-modal.items.3.description")}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            direction={{ base: "column-reverse", md: "row" }}
            spacing={4}
          >
            <Button
              font="text-lg"
              colorScheme="gray"
              _hover={{ bg: "gray.100" }}
              border="1px"
              borderColor="gray.500"
              textColor={colors.black}
              bg={colors.white}
              size="md"
              onClick={onClose}
              width={{ base: "100%", md: "unset" }}
            >
              {t("appPage.cancel-action")}
            </Button>
            <Button
              font="text-lg"
              bg={colors.marinadeGreen}
              isLoading={unstakeLoading}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.marinadeGreen}
              isDisabled={
                !marinade.marinadeState ||
                ((nativeSOLBalance === null || stSOLBalance === null) &&
                  isWalletConnected)
              }
              size="md"
              type="button"
              onClick={delayedUnstakeHandler}
              width={{ base: "100%", md: "unset" }}
            >
              {t("appPage.start-delayed-unstake-action")}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DelayedUnstakeModal;
