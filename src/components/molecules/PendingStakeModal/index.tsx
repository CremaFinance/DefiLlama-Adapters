import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";

import { useTranslation } from "../../../hooks/useTranslation";
import Text from "../../atoms/Text";

interface PendingStakeModalProps {
  onClose: () => Promise<void> | void;
  isOpen: boolean;
  isTransactionSigned: boolean;
}

const PendingStakeModal = ({
  onClose: onCloseProp,
  isOpen: isOpenProp,
  isTransactionSigned: isTransactionSignedProp,
}: PendingStakeModalProps) => {
  const { t } = useTranslation();

  const approvalTitle = t("appPage.awaiting-transaction-approval.title");
  const approvalBodyLine = t("appPage.awaiting-transaction-approval.body-line");
  const confirmationTitle = t(
    "appPage.awaiting-transaction-confirmation.title"
  );
  const confirmationBodyLine = t(
    "appPage.awaiting-transaction-confirmation.body-line"
  );
  return (
    <Modal isOpen={isOpenProp} onClose={onCloseProp} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent width="480px" height="271px">
        <ModalCloseButton _focus={{ boxShadow: "none" }} color="gray.500" />
        <ModalBody display="flex" justifyContent="center" top="50%">
          <Center flexDir="column" height="100%" alignItems="center" margin="0">
            <Text
              fontSize="28.13px"
              fontWeight="bold"
              lineHeight="39.38px"
              mb={3}
              display={!isTransactionSignedProp ? "flex" : "none"}
            >
              {approvalTitle}
            </Text>
            <Text
              fontSize="28.13px"
              fontWeight="bold"
              lineHeight="39.38px"
              mb={3}
              display={isTransactionSignedProp ? "flex" : "none"}
            >
              {confirmationTitle}
            </Text>
            <Text
              marginTop="9px"
              fontSize="17.5px"
              lineHeight="27px"
              textAlign="center"
              display={!isTransactionSignedProp ? "flex" : "none"}
            >
              {approvalBodyLine}
            </Text>
            <Text
              marginTop="9px"
              fontSize="17.5px"
              lineHeight="27px"
              textAlign="center"
              display={isTransactionSignedProp ? "flex" : "none"}
            >
              {confirmationBodyLine}
            </Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default PendingStakeModal;
