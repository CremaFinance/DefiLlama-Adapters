import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  Image,
  Spinner,
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
      <ModalContent width="480px">
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          py={12}
          position="relative"
        >
          <Spinner
            size="md"
            position="absolute"
            top={0}
            right={0}
            mr={8}
            mt={8}
          />
          <Image src="/ilustrations/twitter-loading.svg" />
          <Center
            flexDir="column"
            height="100%"
            alignItems="center"
            margin="0"
            justifyContent="center"
            pt={6}
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
