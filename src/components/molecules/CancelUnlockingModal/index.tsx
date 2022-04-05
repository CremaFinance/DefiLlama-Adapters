import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useEffect, useContext } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import CancelUnlockingConfirmModal from "../CancelUnlockingConfirmModal";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import { AccountsContext } from "contexts/AccountsContext";
import colors from "styles/customTheme/colors";

interface CancelUnlockingModalProps {
  mndeAmount: string;
  isOpen: boolean;
  isPendingOpen: boolean;
  onClose: () => void;
  onCancelConfirm: () => Promise<boolean>;
}

const CancelUnlockingModal: FunctionComponent<CancelUnlockingModalProps> = ({
  isOpen,
  mndeAmount,
  isPendingOpen,
  onClose,
  onCancelConfirm,
}) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  const {
    isOpen: isOpenCancelUnlockingConfirmModal,
    onOpen: onOpenCancelUnlockingConfirmModal,
    onClose: onCloseCancelUnlockingConfirmModal,
  } = useDisclosure();
  const {
    isOpen: isPendingTransactionOpen,
    onOpen: openPendingTransaction,
    onClose: closePendingTransaction,
  } = useDisclosure();

  useEffect(() => {
    if (!isPendingOpen) {
      closePendingTransaction();
    }
  }, [closePendingTransaction, isPendingOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent px={6} py={4}>
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody display="flex" p={0}>
            <Flex
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              mt={6}
            >
              <Image
                src="/ilustrations/relocked.svg"
                alt="Fish"
                mt={{ base: "48px", md: "unset" }}
                maxWidth={{ base: "300px", md: "320px" }}
              />
              <MHeading type="heading-2xsm" pt={6} textAlign="center">
                {t("mndePage.cancel-unlocking-modal.header")}
              </MHeading>
              <MText fontSize="text-xl" textAlign="center" mt={4}>
                {t("mndePage.cancel-unlocking-modal.body.0.text")}{" "}
                <MText fontSize="text-xl" display="inline" fontWeight="bold">
                  {t("mndePage.cancel-unlocking-modal.body.1.text").replace(
                    "{{value}}",
                    mndeAmount
                  )}
                </MText>{" "}
                <MText fontSize="text-xl" display="inline">
                  {t("mndePage.cancel-unlocking-modal.body.2.text")}
                </MText>
              </MText>

              <MButton
                font="text-lg"
                bg={colors.marinadeGreen}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                mt={{ base: "auto", md: 4 }}
                px={4}
                height="40px"
                width="100%"
                onClick={() => {
                  openPendingTransaction();
                  onCancelConfirm().then((result) => {
                    if (result) {
                      closePendingTransaction();
                      onOpenCancelUnlockingConfirmModal();
                      transactionSignedAction(false);
                    }
                  });
                  onClose();
                }}
              >
                {t("mndePage.cancel-unlocking-modal.button")}
              </MButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <CancelUnlockingConfirmModal
        mndeAmount={mndeAmount}
        isOpen={isOpenCancelUnlockingConfirmModal}
        onClose={onCloseCancelUnlockingConfirmModal}
      />
      <PendingStakeModal
        isTransactionSigned={transactionSigned}
        isOpen={isPendingTransactionOpen && isPendingOpen}
        onClose={() => {
          transactionSignedAction(false);
        }}
      />
    </>
  );
};

export default CancelUnlockingModal;
