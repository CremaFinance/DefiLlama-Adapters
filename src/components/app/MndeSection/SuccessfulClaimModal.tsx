import {
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FiExternalLink } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

type SuccessfulClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessfulClaimModal = ({
  isOpen,
  onClose,
}: SuccessfulClaimModalProps) => {
  const { t } = useTranslation();

  const OPTIONS = [
    {
      title: t("Access  mDAO community on discord"),
      height: { base: "52px", md: "32px" },
    },
    { title: t("Participate in mDAO governance"), height: "32px" },
    {
      title: t("Provide liquidity on Orca.so and Raydium.io"),
      height: { base: "52px", md: "32px" },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "288px", md: "364px" }}
        maxH={{ base: "358px", md: "326px" }}
      >
        <ModalHeader
          px={{ base: "16px", md: "24px" }}
          fontSize={{ base: "18px", md: "22.5px" }}
        >
          Congratulations!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          px={{ base: "16px", md: "24px" }}
          mt={{ base: "8px", md: "0px" }}
        >
          <MText fontSize="14.4px" mb="24px">
            {t(
              "You've successfully claimed your MNDE. Here's what you can do with it:"
            )}
          </MText>

          {OPTIONS.map((option, ind) => (
            <Flex
              key={option.title}
              borderTop={ind === 0 ? "1px solid" : ""}
              borderBottom="1px solid"
              borderColor={colors.lightGray}
              height={option.height}
              overflow="visible"
              alignItems="center"
            >
              <Icon
                as={IoCheckmarkCircle}
                color={colors.marinadeGreen}
                width="20px"
                height="20px"
                mr="10px"
              />
              <MText fontSize="14.4px">{option.title}</MText>
            </Flex>
          ))}
          <Flex
            justifyContent="center"
            mt={{ base: "8px", md: "0px" }}
            height={{ base: "65px", md: "88px" }}
            alignItems="center"
          >
            <MButton
              variant="outline"
              color="black"
              width="55px"
              height="40px"
              mr="16px"
              fontSize="16px"
            >
              OK
            </MButton>
            <MButton
              variant="solid"
              width="165px"
              height="40px"
              fontSize="16px"
            >
              <Flex alignItems="center">
                <MText>mDAO Discord </MText>
                <Icon
                  position="relative"
                  bottom="1px"
                  as={FiExternalLink}
                  width="14px"
                  height="14px"
                  ml="6px"
                  mr={{ base: "3px", md: "5px" }}
                  cursor="pointer"
                />
              </Flex>
            </MButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulClaimModal;
