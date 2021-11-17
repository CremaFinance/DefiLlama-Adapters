import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

type ChildrenRenderProps = {
  openModal: () => void;
  closeModal?: () => void;
};

type ChildrenRenderFn = (props: ChildrenRenderProps) => React.ReactElement;

interface SuccessStakeModalProps {
  children: ChildrenRenderFn;
  onClose: () => Promise<void> | void;
}

const SuccessStakeModal = ({
  onClose: onCloseProp,
  children,
}: SuccessStakeModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ onClose: onCloseProp });
  return (
    <>
      {children({ openModal: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="480px" height="465px">
          <ModalCloseButton />
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
            exercitation reprehenderit magna aute tempor cupidatat consequat
            elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
            cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
            laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse
            laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
            nostrud ad veniam.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessStakeModal;
