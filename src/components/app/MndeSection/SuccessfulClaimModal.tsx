import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

type SuccessfulClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessfulClaimModal = ({
  isOpen,
  onClose,
}: SuccessfulClaimModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text>You just claimed MDNE</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulClaimModal;
