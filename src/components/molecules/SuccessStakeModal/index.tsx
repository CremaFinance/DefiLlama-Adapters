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

  const buttonText = t("appPage.success-stake.button")?.replace(
    "{{stakedCurrency}}",
    stakedCurrency
  );

  return (
    <Modal isOpen={isOpenProp} onClose={onCloseProp} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent maxW="480px">
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody display="flex" justifyContent="center">
          <Flex flexDir="column" height="100%" alignItems="center" margin="0">
            <Image
              marginTop="59px"
              width="219.03px"
              height="166.64px"
              src="/ilustrations/success-stake.svg"
            />
            <Text
              marginTop="24px"
              fontSize="22.5px"
              fontWeight="bold"
              lineHeight="33.75px"
            >
              {t("appPage.success-stake.title")}
            </Text>
            <Text
              as="span"
              color={colors.marinadeGreen}
              marginTop="24px"
              marginBottom="18px"
              fontSize="22.5px"
              fontWeight="bold"
              lineHeight="33.75px"
            >
              +{stakedAmount} {stakedCurrency}{" "}
              {t("appPage.success-stake.body-line2-after")}
            </Text>
            <Text
              marginTop="9px"
              fontSize="18px"
              lineHeight="25.2px"
              textAlign="center"
            >
              {bodyLine1}
            </Text>
            <Flex marginTop="24px" marginBottom="16px" width="100%">
              <MButton
                width="100%"
                height="40px"
                variant="big-solid"
                fontSize="16px"
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
  );
};

export default SuccessStakeModal;
