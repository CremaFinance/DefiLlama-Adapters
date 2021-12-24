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
import MLink from "../../atoms/Link";
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
      title: t("mndePage.modal-claim-success-subtitle-1"),
      height: { base: "52px", md: "32px" },
    },
    { title: t("mndePage.modal-claim-success-subtitle-2"), height: "32px" },
    {
      title: t("mndePage.modal-claim-success-subtitle-3"),
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
          {t("mndePage.modal-claim-success-title")}
        </ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody
          px={{ base: "16px", md: "24px" }}
          mt={{ base: "8px", md: "0px" }}
        >
          <MText fontSize="14.4px" mb="24px">
            {t("mndePage.modal-claim-success-description")}
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
              onClick={() => onClose()}
            >
              {t("OK")}
            </MButton>
            <MLink
              href="https://discord.com/invite/6EtUf4Euu6"
              target="_blank"
              rel="noreferrer"
              width="165px"
              height="40px"
              font="text-lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: colors.green800 }}
              _focus={{ boxShadow: "none" }}
              colorScheme={colors.marinadeGreen}
              bg={colors.marinadeGreen}
              color="white"
              rounded="md"
            >
              {t("mndePage.modal-claim-success-discord")}{" "}
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
            </MLink>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulClaimModal;