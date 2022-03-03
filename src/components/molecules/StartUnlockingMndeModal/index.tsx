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

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import MndeUnlockConfirmModal from "../MndeUnlockConfirmModal";
import colors from "styles/customTheme/colors";

interface StartUnlockingMndeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartUnlockingMndeModal: FunctionComponent<
  StartUnlockingMndeModalProps
> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });

  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
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
                src="/ilustrations/fish-bw.svg"
                alt="Fish"
                mt={{ base: "48px", md: "unset" }}
                maxWidth={{ base: "300px", md: "382px" }}
              />
              <MHeading type="heading-2xsm" pt={6} textAlign="center">
                {t("mndePage.unlock-mnde-modal.header")}
              </MHeading>
              <MText textAlign="center" mt={4}>
                {t("mndePage.unlock-mnde-modal.body.0.text")}
                <MText
                  display="inline-block"
                  fontWeight="bold"
                  color={colors?.red?.[500]}
                >
                  {t("mndePage.unlock-mnde-modal.body.1.text")}
                </MText>{" "}
                <MText display="inline-block">
                  {t("mndePage.unlock-mnde-modal.body.2.text")}
                </MText>{" "}
                <MText display="inline-block" fontWeight="bold">
                  {t("mndePage.unlock-mnde-modal.body.3.text")}
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
                  onConfirmModalOpen();
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
        isOpen={isConfirmModalOpen}
        onClose={() => onConfirmModalClose()}
      />
    </>
  );
};

export default StartUnlockingMndeModal;
