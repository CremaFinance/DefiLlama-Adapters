import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MButton from "../../atoms/Button";
import Text from "../../atoms/Text";

interface SuccessStakeModalProps {
  onClose: () => Promise<void> | void;
  isOpen: boolean;
  stakedAmount: string;
  stakedCurrency: string;
}

const SuccessStakeModal = ({
  onClose: onCloseProp,
  isOpen: isOpenProp,
  stakedAmount,
  stakedCurrency,
}: SuccessStakeModalProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const bodyLine1 = t("appPage.success-stake.body-line1");
  const bodyBeforeLine2 = t("appPage.success-stake.body-line2-before");
  const bodyAfterLine2 = t("appPage.success-stake.body-line2-after");

  const buttonText = t("appPage.success-stake.button")?.replace(
    "{{stakedCurrency}}",
    stakedCurrency
  );

  return (
    <>
      <Modal isOpen={isOpenProp} onClose={onCloseProp} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent maxW="480px">
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody display="flex" justifyContent="center">
            <Flex flexDir="column" height="100%" alignItems="center" margin="0">
              <Image
                marginTop="38px"
                width="219.03px"
                height="166.64px"
                src="/ilustrations/success-stake.png"
              />
              <Text
                marginTop="18px"
                fontSize="22.5px"
                fontWeight="bold"
                lineHeight="33.75px"
              >
                {t("appPage.success-stake.title")}
              </Text>
              <Text
                marginTop="9px"
                fontSize="18px"
                lineHeight="25.2px"
                textAlign="center"
              >
                {bodyLine1}
              </Text>
              <Text fontSize="18px" lineHeight="150%" textAlign="center">
                {bodyBeforeLine2}
                <Text as="span" color={colors.black} fontWeight="bold">
                  {stakedAmount}
                </Text>{" "}
                <Text as="span" color={colors.marinadeGreen} fontWeight="bold">
                  {stakedCurrency}
                </Text>
                {bodyAfterLine2}
              </Text>
              <Flex marginTop="24px" marginBottom="31px">
                <MButton
                  variant="big-solid"
                  fontSize="18px"
                  lineHeight="25.2px"
                  fontWeight="bold"
                  paddingX="44px"
                  onClick={() => {
                    router.push("/app/defi").finally(onCloseProp);
                  }}
                >
                  {buttonText}
                </MButton>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessStakeModal;
