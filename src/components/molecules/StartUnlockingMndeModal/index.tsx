import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useEffect, useContext } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import MndeUnlockConfirmModal from "../MndeUnlockConfirmModal";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import { AccountsContext } from "contexts/AccountsContext";
import colors from "styles/customTheme/colors";

interface StartUnlockingMndeModalProps {
  imgURI: string;
  mndeAmount: string;
  isOpen: boolean;
  isPendingOpen: boolean;
  onClose: () => void;
  onUnlockConfirm: () => Promise<boolean>;
}

const StartUnlockingMndeModal: FunctionComponent<
  StartUnlockingMndeModalProps
> = ({
  isOpen,
  onClose,
  imgURI,
  mndeAmount,
  onUnlockConfirm,
  isPendingOpen,
}) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
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
        <ModalContent p={6}>
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
                src={imgURI}
                alt="Fish"
                mt={{ base: "48px", md: "unset" }}
                maxWidth={{ base: "300px", md: "382px" }}
              />
              <MHeading type="heading-2xsm" pt={6} textAlign="center">
                {t("mndePage.unlock-mnde-modal.header")}
              </MHeading>
              <MText textAlign="center" mt={4}>
                {t("mndePage.unlock-mnde-modal.body.0.text")}{" "}
                <MText display="inline-block">
                  {t("mndePage.unlock-mnde-modal.body.1.text")}
                </MText>{" "}
                <MText display="inline-block" fontWeight="bold">
                  {t("mndePage.unlock-mnde-modal.body.2.text")?.replace(
                    "{{value}}",
                    mndeAmount
                  )}
                </MText>
              </MText>

              <MButton
                font="text-lg"
                bg={colors.marinadeGreen}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                mt={5}
                px={4}
                height="40px"
                width="100%"
                onClick={() => {
                  openPendingTransaction();
                  onUnlockConfirm().then((result) => {
                    if (result) {
                      closePendingTransaction();
                      onConfirmModalOpen();
                      transactionSignedAction(false);
                    }
                  });
                  onClose();
                }}
              >
                {t("mndePage.unlock-mnde-modal.button")}
              </MButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <MndeUnlockConfirmModal
        mndeAmount={mndeAmount}
        isOpen={isConfirmModalOpen}
        onClose={() => onConfirmModalClose()}
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

export default StartUnlockingMndeModal;
