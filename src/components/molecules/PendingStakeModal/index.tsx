import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Center,
  Image,
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

  return (
    <Modal isOpen={isOpenProp} onClose={onCloseProp} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent
        width="480px"
        height={!isTransactionSignedProp ? "443.68px" : "271px"}
      >
        <ModalBody display="flex" justifyContent="center" top="50%">
          <Center flexDir="column" height="100%" alignItems="center" margin="0">
            {!isTransactionSignedProp ? (
              <Image
                marginTop="38px"
                width="300px"
                height="191.68px"
                src="/ilustrations/approve.svg"
                marginBottom="24px"
              />
            ) : null}
            <Text
              fontSize="28.13px"
              fontWeight="bold"
              lineHeight="39.38px"
              mb={3}
            >
              {!isTransactionSignedProp
                ? t("appPage.awaiting-transaction-approval.title")
                : t("appPage.awaiting-transaction-confirmation.title")}
            </Text>
            <Text
              marginTop="9px"
              fontSize="17.5px"
              lineHeight="27px"
              textAlign="center"
            >
              {!isTransactionSignedProp
                ? t("appPage.awaiting-transaction-approval.body-line")
                : t("appPage.awaiting-transaction-confirmation.body-line")}
            </Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default PendingStakeModal;
