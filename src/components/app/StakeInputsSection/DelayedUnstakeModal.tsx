import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTranslation } from "next-export-i18n";

import {
  useMarinade,
  useMarinadeState,
} from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import { useEpochInfo } from "../../../hooks/useEpochInfo";
import { useWallet } from "../../../hooks/useWallet";
import { format2Dec } from "../../../utils/number-to-short-version";
import { DEFAULT_ENDPOINT } from "../../../utils/web3/endpoints";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

type DelayedUnstakeModalProps = {
  stSolToUnstake: number;
  isOpen: boolean;
  onClose: () => void;
};

const DelayedUnstakeModal = ({
  stSolToUnstake,
  isOpen,
  onClose,
}: DelayedUnstakeModalProps) => {
  const { t } = useTranslation();
  const state = useMarinadeState();
  const epochData = useEpochInfo()?.data;
  const marinade = useMarinade();
  const { nativeSOLBalance, stSOLBalance } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();

  const EXTRA_WAIT_MILLISECONDS = 1000 * 60 * 60 * 4 + 1000 * 60 * 45; // 4 hours to finnish BE operations + 45 minutes to be safe
  const epochEnds = Date.now() + (epochData?.msUntilEpochEnd ?? 0);

  //   function unstakeHandler() {
  //     if (!basicInputChecks(stSolToUnstake, isWalletConnected)) return false;

  //     const fundsNeeded = marinade.marinadeState!.transactionFee!;
  //     if (!checkNativeSOLBalance(nativeSOLBalance, fundsNeeded)) return false;

  //     if (
  //       stSOLBalance == undefined ||
  //       stSOLBalance == null ||
  //       isNaN(stSOLBalance)
  //     )
  //       return false;

  //     let toUnstakeFullDecimals;
  //     if (stSolToUnstake == Math.round(stSOLBalance * 1e5) / 1e5) {
  //       // Note: input text has 5 decimals (rounded), while stSOLBalance has full decimals
  //       // so if the user wants to unstake all, get precise balance
  //       toUnstakeFullDecimals = stSOLBalance;
  //     } else {
  //       toUnstakeFullDecimals = stSolToUnstake;
  //     }

  //     if (toUnstakeFullDecimals > stSOLBalance) {
  //       toastNotification({
  //         title: "Insufficient funds to unstake",
  //         description: `You requested to unstake ${toUnstakeFullDecimals} mSOL (and you have only ${stSOLBalance})`,
  //         status: "warning",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       return false;
  //     }

  //     setUnstakeLoading(true);
  //     toUnstakeFullDecimals &&
  //       marinade
  //         .runOrderUnstake(toUnstakeFullDecimals * LAMPORTS_PER_SOL)
  //         .then(
  //           (transactionSignature) => {
  //             setStSolToUnstake("0");
  //             toastNotification({
  //               title: "Unstake mSOL confirmed",
  //               description: (
  //                 <p>
  //                   You've successfully unstaked your mSOL{" "}
  //                   <TransactionLink
  //                     chainName={chain.name}
  //                     transactionid={transactionSignature}
  //                   />
  //                 </p>
  //               ),
  //               status: "success",
  //               duration: 5000,
  //               isClosable: true,
  //             });
  //           },
  //           (error) => {
  //             console.error(error);
  //             toastNotification({
  //               title: "Something went wrong",
  //               description: error.message,
  //               status: "warning",
  //               duration: 5000,
  //               isClosable: true,
  //             });
  //           }
  //         )
  //         .then(() => {
  //           getTicketAccountsAction(
  //             keys,
  //             walletConnected,
  //             connection,
  //             walletPubKey as PublicKey,
  //             true
  //           );
  //           setUnstakeLoading(false);
  //         });
  //   }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("start-delayed-unstake-action")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {t("unstake-cooldown-description")}
              <b>
                {dayjs(
                  new Date(
                    epochEnds +
                      (epochData?.slotsInEpoch ?? 0) *
                        DEFAULT_ENDPOINT.slotTimeAvg1h *
                        /* Note: we add one more epoch if stake-delta is already started (we're in the stake-delta-window) */
                        (Number(
                          marinade?.marinadeState?.state.stake_system
                            ?.last_stake_delta_epoch
                        ) === epochData?.epoch
                          ? 2
                          : 1) +
                      EXTRA_WAIT_MILLISECONDS
                  )
                ).format(" MMMM Do YYYY, h:mm a")}
              </b>
              {t("you-will-be-able-to-claim")}{" "}
              {stSolToUnstake &&
                state &&
                format2Dec(
                  (stSolToUnstake * state?.state?.st_sol_price?.toNumber()) /
                    0x1_0000_0000
                )}
              {" SOL."}
            </Text>
            <br />
            <Text>{t("approximate-unstake-time-explanation")}</Text>
            <br />
            <Text>{t("delayed-agree-text")}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mt={4}
              size="lg"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              {t("cancel-action")}
            </Button>
            <Button
              mt={4}
              loadingText="Approve transaction in your wallet"
              isDisabled={
                !marinade.marinadeState ||
                ((nativeSOLBalance === null || stSOLBalance === null) &&
                  isWalletConnected)
              }
              size="lg"
              type="button"
            >
              {t("start-delayed-unstake-action")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DelayedUnstakeModal;
