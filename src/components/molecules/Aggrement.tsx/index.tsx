import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Stack,
  useDisclosure,
  Button,
  Circle,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";

import MButton from "../../atoms/Button";
import Link from "../../atoms/Link";
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
              <Circle size="40px" bgColor={colors.marinadeGreen}>
                <Image width={30} src="/marinade-icon-white.svg" />
              </Circle>
            </Flex>

            <Text>
              {t("appPage.agreement.body.0.text")}{" "}
              <Link
                as={Link}
                href="/terms"
                textDecor="underline"
                rel="noreferrer noopener"
                color={colors.marinadeGreen}
                fontWeight={800}
                _focus={{ boxShadow: "none" }}
              >
                {t("appPage.agreement.body.1.text")}
              </Link>
              {t("appPage.agreement.body.2.text")}
            </Text>
            <Stack spacing={4} direction="row" justifyContent="center">
              <MButton
                font="text-lg"
                colorScheme="gray"
                _hover={{ bg: "gray.100" }}
                border="1px"
                borderColor="gray.500"
                textColor={colors.black}
                rounded="md"
                px={[4, 4]}
                height="40px"
                bg={colors.white}
              >
                <Link
                  as={Link}
                  href="/"
                  _hover={{ textDecoration: "none" }}
                  rel="noreferrer noopener"
                  _focus={{ boxShadow: "none" }}
                >
                  {t("appPage.agreement.buttons.secondary")}
                </Link>
              </MButton>

              <Button
                onClick={() => {
                  setTermsAgreement(true);
                  onClose();
                }}
                colorScheme="green"
                borderRadius="6px"
                _focus={{ boxShadow: "none" }}
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
