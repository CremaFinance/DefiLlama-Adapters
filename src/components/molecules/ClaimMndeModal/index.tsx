import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useContext } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import ClaimMndeConfirmModal from "../ClaimMndeConfirmModal";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import { AccountsContext } from "contexts/AccountsContext";
import colors from "styles/customTheme/colors";

interface ClaimMndeModalProps {
  isOpen: boolean;
  mndeAmount: string;
  isPendingOpen: boolean;
  onClose: () => void;
  onClaimConfirm: () => Promise<boolean>;
  onRelock: () => void;
}

const ClaimMndeModal: FunctionComponent<ClaimMndeModalProps> = ({
  isOpen,
  onClose,
  mndeAmount,
  isPendingOpen,
  onClaimConfirm,
  onRelock,
}) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });

  const {
    isOpen: isOpenClaimConfirmModal,
    onOpen: onOpenClaimConfirmModal,
    onClose: onCloseClaimConfirmModal,
  } = useDisclosure();
  const {
    isOpen: isPendingTransactionOpen,
    onOpen: openPendingTransaction,
    onClose: closePendingTransaction,
  } = useDisclosure();

  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent px={6} py={4}>
          <ModalCloseButton _focus={{ outline: "none" }} />
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
                src="/ilustrations/burn.svg"
                alt="Burn"
                mt={{ base: "48px", md: "unset" }}
                maxWidth={{ base: "300px", md: "382px" }}
              />
              <MHeading type="heading-2xsm" pt={6} textAlign="center">
                {t("mndePage.claim-mnde-modal.header")}
              </MHeading>
              <MText fontSize="text-xl" textAlign="center" mt={4}>
                {t("mndePage.claim-mnde-modal.body.0.text")}
                <MText fontSize="text-xl" display="inline" fontWeight="bold">
                  {t("mndePage.claim-mnde-modal.body.1.text").replace(
                    "{{value}}",
                    mndeAmount
                  )}
                </MText>{" "}
                <MText
                  fontSize="text-xl"
                  display="inline"
                  fontWeight="bold"
                  color={colors?.red?.[500]}
                >
                  {t("mndePage.claim-mnde-modal.body.2.text")}
                </MText>{" "}
                <MText fontSize="text-xl" display="inline">
                  {t("mndePage.claim-mnde-modal.body.3.text")}
                </MText>
              </MText>

              <MButton
                font="text-lg"
                bg={colors.marinadeGreen}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                mt={{ base: "auto", md: 4 }}
                mb={4}
                px={4}
                height="40px"
                width="100%"
                onClick={() => {
                  openPendingTransaction();
                  onClaimConfirm().then((result) => {
                    if (result) {
                      closePendingTransaction();
                      onOpenClaimConfirmModal();
                      transactionSignedAction(false);
                    }
                  });
                  onClose();
                }}
              >
                {t("mndePage.claim-mnde-modal.buttons.claim")}
              </MButton>
              <MButton
                variant="outline"
                borderColor="gray"
                _hover={{ bg: "gray.100" }}
                color="black"
                font="text-lg"
                rounded="md"
                px={4}
                height="40px"
                width="100%"
                onClick={() => {
                  onClose();
                  onRelock();
                }}
              >
                {t("mndePage.claim-mnde-modal.buttons.relock")}
              </MButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ClaimMndeConfirmModal
        mndeAmount={mndeAmount}
        isOpen={isOpenClaimConfirmModal}
        onClose={() => onCloseClaimConfirmModal()}
      />
      <PendingStakeModal
        isTransactionSigned={transactionSigned}
        isOpen={isPendingTransactionOpen && isPendingOpen}
        onClose={() => {
          transactionSignedAction(false);
        }}
      />
    </>
  );
};

export default ClaimMndeModal;
