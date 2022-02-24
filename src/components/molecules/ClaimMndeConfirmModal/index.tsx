import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

interface ClaimMndeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimMndeConfirmModal: FunctionComponent<ClaimMndeConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={6}>
        <ModalCloseButton />
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
              src="/ilustrations/burned.svg"
              alt="Fish"
              maxWidth={{ base: "300px", md: "320px" }}
            />
            <MHeading type="heading-2xsm" pt={6} textAlign="center">
              {t("mndePage.claim-mnde-confirm-modal.header")}
            </MHeading>
            <MText textAlign="center" mt={4}>
              {t("mndePage.claim-mnde-confirm-modal.body.0.text")}{" "}
              <MText display="inline" fontWeight="bold">
                {t("mndePage.claim-mnde-confirm-modal.body.1.text")}
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
                onClose();
              }}
            >
              {t("mndePage.claim-mnde-confirm-modal.button")}
            </MButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClaimMndeConfirmModal;
