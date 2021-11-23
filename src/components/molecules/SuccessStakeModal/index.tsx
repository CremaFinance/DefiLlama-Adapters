import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Flex,
  Image,
} from "@chakra-ui/react";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

type ChildrenRenderProps = {
  openModal: () => void;
  closeModal?: () => void;
};

type ChildrenRenderFn = (props: ChildrenRenderProps) => React.ReactElement;

interface SuccessStakeModalProps {
  children: ChildrenRenderFn;
  onClose: () => Promise<void> | void;
  stakedAmount: number;
  stakedCurrency: string;
}

const SuccessStakeModal = ({
  onClose: onCloseProp,
  children,
  stakedAmount,
  stakedCurrency,
}: SuccessStakeModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ onClose: onCloseProp });
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
      {children({ openModal: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent size>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir="column"
              width="480px"
              height="100%"
              alignItems="center"
            >
              <Image
                marginTop="35px"
                width="219.03px"
                height="166.64px"
                src="/public/success-stake.png"
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
                <Text as="span" color={colors.green} fontWeight="bold">
                  {stakedCurrency}
                </Text>
                {bodyAfterLine2}
              </Text>
              <Flex marginTop="24px" marginBottom="38px">
                <Button
                  variant="big-solid"
                  fontSize="18px"
                  lineHeight="25.2px"
                  fontWeight="bold"
                  paddingX="41px"
                >
                  {buttonText}
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessStakeModal;
