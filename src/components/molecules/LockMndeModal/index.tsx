import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import CompleteLockMndeModal from "../CompleteLockMndeModal";
import colors from "styles/customTheme/colors";

interface LockMndeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLockConfirm: () => Promise<void>;
}

const LockMndeModal: FunctionComponent<LockMndeModalProps> = ({
  isOpen,
  onClose,
  onLockConfirm,
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isCompleteLockModalOpen,
    onOpen: onCompleteLockModalOpen,
    onClose: onCompleteLockModalClose,
  } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={6}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody display="flex" p={0}>
            <Flex
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="480px"
              flexDirection="column"
            >
              <MHeading type="heading-2xsm">
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
                width="100%"
                mt={4}
                onClick={() => {
                  onLockConfirm().then(() => {
                    onCompleteLockModalOpen();
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
    </>
  );
};

export default LockMndeModal;
