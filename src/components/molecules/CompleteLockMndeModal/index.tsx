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
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

interface CompleteLockMndeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteLockMndeModal: FunctionComponent<CompleteLockMndeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              src="/ilustrations/fish.svg"
              alt="Fish"
              maxWidth={{ base: "300px", md: "382px" }}
            />
            <MHeading type="heading-2xsm" pt={6}>
              {t("mndePage.lock-mnde-complete-modal.header")}
            </MHeading>
            <MText mt={4} textAlign="center">
              {t("mndePage.lock-mnde-complete-modal.body.0.text")}
            </MText>
            <MText mt={8} textAlign="center">
              {t("mndePage.lock-mnde-complete-modal.body.1.text")}
            </MText>
            <Flex justifyContent="space-between" w="100%" my={5}>
              <MLink
                target="_blank"
                rel="noreferrer"
                width="165px"
                height="40px"
                font="text-lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ textDecoration: "underline" }}
                _focus={{ boxShadow: "none" }}
                colorScheme={colors.marinadeGreen}
                color={colors.marinadeGreen}
                rounded="md"
                flex={1}
              >
                {t("mndePage.lock-mnde-complete-modal.links.twitter")}

                <Image
                  ml={2}
                  color={colors.marinadeGreen}
                  cursor="pointer"
                  src="/icons/twitter.svg"
                  alt="Twitter Logo"
                  width={5}
                />
              </MLink>
              <MLink
                target="_blank"
                rel="noreferrer"
                width="165px"
                height="40px"
                font="text-lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ textDecoration: "underline" }}
                _focus={{ boxShadow: "none" }}
                colorScheme={colors.marinadeGreen}
                color={colors.marinadeGreen}
                rounded="md"
                flex={1}
              >
                {t("mndePage.lock-mnde-complete-modal.links.download")}

                <Image
                  ml={2}
                  color={colors.marinadeGreen}
                  cursor="pointer"
                  src="/icons/download.svg"
                  alt="Twitter Logo"
                  width={5}
                />
              </MLink>
            </Flex>
            <MButton
              font="text-lg"
              bg={colors.marinadeGreen}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.marinadeGreen}
              rounded="md"
              px={4}
              height="40px"
              width="100%"
              onClick={() => {
                onClose();
              }}
            >
              {t("mndePage.lock-mnde-complete-modal.button")}
            </MButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompleteLockMndeModal;
