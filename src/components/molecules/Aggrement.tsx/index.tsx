import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Link as ChakraLink,
  Text,
  Stack,
  useDisclosure,
  Button,
  Circle,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import Link from "next/link";
import { useRouter } from "next/router";

import { useLocalStorageState } from "hooks/useLocalStorageState";
import colors from "styles/customTheme/colors";

const Agreement = () => {
  const { onClose } = useDisclosure();
  const [termsAgreement, setTermsAgreement] =
    useLocalStorageState("termsAgreed");
  const location = useRouter();
  const { t } = useTranslation();

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={!termsAgreement && location.pathname.includes("/app")}
      onClose={onClose}
      isCentered
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={8} position="relative">
          <Stack spacing={6}>
            <Flex justifyContent="space-between" align="center">
              <Heading textAlign="center">
                {t("appPage.agreement.header")}
              </Heading>
              <Circle size="60px">
                <Image src="/logos/marinade-logo.svg" />
              </Circle>
            </Flex>

            <Text textAlign="center">
              {t("appPage.agreement.body.0.text")}{" "}
              <ChakraLink
                as={Link}
                href="/terms"
                target="_blank"
                textDecor="underline"
              >
                <Text
                  as="span"
                  textDecor="underline"
                  color={colors.marinadeGreen}
                  fontWeight={800}
                  cursor="pointer"
                >
                  {" "}
                  {t("appPage.agreement.body.1.text")}
                </Text>
              </ChakraLink>
              {t("appPage.agreement.body.2.text")}
            </Text>
            <Stack spacing={4} direction="row" justifyContent="center">
              <Button
                onClick={() => setTermsAgreement(false)}
                variant="outline"
                colorScheme="black"
                href="/"
                borderRadius="2px"
              >
                <ChakraLink
                  as={Link}
                  href="/"
                  target="_blank"
                  textDecor="underline"
                >
                  {t("appPage.agreement.buttons.secondary")}
                </ChakraLink>
              </Button>
              <Button
                onClick={() => {
                  setTermsAgreement(true);
                  onClose();
                }}
                colorScheme="green"
                borderRadius="6px"
              >
                {t("appPage.agreement.buttons.primary")}
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Agreement;
