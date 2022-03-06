import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useEffect, useContext } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import CompleteLockMndeModal from "../CompleteLockMndeModal";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import { AccountsContext } from "contexts/AccountsContext";
import colors from "styles/customTheme/colors";

interface LockMndeModalProps {
  isOpen: boolean;
  isPendingOpen: boolean;
  onClose: () => void;
  onLockConfirm: () => Promise<boolean>;
}

const LockMndeModal: FunctionComponent<LockMndeModalProps> = ({
  isOpen,
  isPendingOpen,
  onClose,
  onLockConfirm,
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isPendingTransactionOpen,
    onOpen: openPendingTransaction,
    onClose: closePendingTransaction,
  } = useDisclosure();
  const {
    isOpen: isCompleteLockModalOpen,
    onOpen: onCompleteLockModalOpen,
    onClose: onCompleteLockModalClose,
  } = useDisclosure();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);

  useEffect(() => {
    if (!isPendingOpen) {
      closePendingTransaction();
    }
  }, [closePendingTransaction, isPendingOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent p={6}>
          <ModalHeader />
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody display="flex" p={0}>
            <Flex
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="480px"
              flexDirection="column"
            >
              <MHeading mt={{ base: "48px", md: "unset" }} type="heading-2xsm">
                {t("mndePage.lock-mnde-confirm-modal.header")}
              </MHeading>
              <MText pt={8} textAlign="center">
                {t("mndePage.lock-mnde-confirm-modal.body")}
              </MText>
              <MButton
                font="text-lg"
                bg={colors.marinadeGreen}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                px={4}
                height="40px"
                mt={{ base: "auto", md: 4 }}
                width="100%"
                onClick={() => {
                  openPendingTransaction();
                  onLockConfirm().then((result) => {
                    if (result) {
                      closePendingTransaction();
                      onCompleteLockModalOpen();
                      transactionSignedAction(false);
                    }
                  });
                  onClose();
                }}
              >
                {t("mndePage.lock-mnde-confirm-modal.button")}
              </MButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <CompleteLockMndeModal
        isOpen={isCompleteLockModalOpen}
        onClose={onCompleteLockModalClose}
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

export default LockMndeModal;
