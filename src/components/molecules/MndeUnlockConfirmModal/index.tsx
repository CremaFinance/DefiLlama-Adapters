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

interface MndeUnlockConfirmModalProps {
  mndeAmount: string;
  isOpen: boolean;
  onClose: () => void;
}

const MndeUnlockConfirmModal: FunctionComponent<
  MndeUnlockConfirmModalProps
> = ({ isOpen, onClose, mndeAmount }) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });

  return (
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
              src="/ilustrations/unlock.svg"
              alt="Fish"
              maxWidth={{ base: "300px", md: "382px" }}
              mt={{ base: "48px", md: "unset" }}
            />
            <MHeading type="heading-2xsm" pt={6} textAlign="center">
              {t("mndePage.mnde-unlock-confirm-modal.header")}
            </MHeading>
            <MText textAlign="center" mt={4}>
              {t("mndePage.mnde-unlock-confirm-modal.body.0.text")}{" "}
              <MText display="inline-block" fontWeight="bold">
                {t("mndePage.mnde-unlock-confirm-modal.body.1.text").replace(
                  "{{value}}",
                  mndeAmount
                )}
              </MText>{" "}
              <MText display="inline-block">
                {t("mndePage.mnde-unlock-confirm-modal.body.2.text")}
              </MText>
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
              mt={{ base: "auto", md: 4 }}
              onClick={() => {
                onClose();
              }}
            >
              {t("mndePage.mnde-unlock-confirm-modal.button")}
            </MButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MndeUnlockConfirmModal;
