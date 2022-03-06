import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

interface CancelUnlockingConfirmModalProps {
  isOpen: boolean;
  mndeAmount: string;
  onClose: () => void;
}

const CancelUnlockingConfirmModal: FunctionComponent<
  CancelUnlockingConfirmModalProps
> = ({ isOpen, onClose, mndeAmount }) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });

  return (
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
              src="/ilustrations/relock.svg"
              alt="Relock"
              mt={{ base: "48px", md: "unset" }}
              maxWidth={{ base: "300px", md: "320px" }}
            />
            <MHeading type="heading-2xsm" pt={6} textAlign="center">
              {t("mndePage.cancel-unlocking-confirm-modal.header")}
            </MHeading>
            <MText fontSize="text-xl" textAlign="center" mt={4}>
              {t("mndePage.cancel-unlocking-confirm-modal.body.0.text")}{" "}
              <MText fontSize="text-xl" display="inline" fontWeight="bold">
                {t(
                  "mndePage.cancel-unlocking-confirm-modal.body.1.text"
                ).replace("XXXX", mndeAmount)}
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
                onClose();
              }}
            >
              {t("mndePage.cancel-unlocking-confirm-modal.button")}
            </MButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CancelUnlockingConfirmModal;
