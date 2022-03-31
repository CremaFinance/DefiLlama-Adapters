import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import Text from "../../atoms/Text";
import { useTranslation } from "hooks/useTranslation";

interface TwitterDataLoadingModalProps {
  isOpen: boolean;
}

const TwitterDataLoadingModal: FunctionComponent<
  TwitterDataLoadingModalProps
> = ({ isOpen }) => {
  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} isCentered onClose={() => {}} size={modalSize}>
      <ModalOverlay />
      <ModalContent width="480px" height="300px">
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <Center
            flexDir="column"
            height="100%"
            alignItems="center"
            margin="0"
            justifyContent="center"
          >
            <Text
              fontSize="28.13px"
              fontWeight="bold"
              lineHeight="39.38px"
              mb={3}
            >
              {t("mndePage.twitter-data-loading-modal.header")}
            </Text>

            <Text
              marginTop="9px"
              fontSize="17.5px"
              lineHeight="27px"
              textAlign="center"
            >
              {t("mndePage.twitter-data-loading-modal.text")}
            </Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TwitterDataLoadingModal;
