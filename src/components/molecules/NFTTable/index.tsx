/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Icon,
  useMediaQuery,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useContext, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import NFTTableRow from "../NFTTableRow";
import CancelUnlockingModal from "components/molecules/CancelUnlockingModal";
import ClaimMndeModal from "components/molecules/ClaimMndeModal";
import StartUnlockingMndeModal from "components/molecules/StartUnlockingMndeModal";
import { GovernanceContext } from "contexts/GovernanceContext";
import useGovernanceData from "hooks/useGovernanceData";
import { useTracking } from "hooks/useTracking";
import colors from "styles/customTheme/colors";

const noPriorCredit = "no record of a prior credit";
const solFee = "appPage.missing-sol-for-fee";
const somethingWentWrong = "appPage.something-went-wrong";

const NFTTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const [currentNFTMndeValue, setCurrentNFTMndeValue] = useState("0");
  const [currentNFTImageUri, setCurrentNFTImageUri] = useState("/");
  const [currentNFTAddress, setCurrentNFTAddress] = useState(PublicKey.default);

  const { startUnlocking, claimMNDE, cancelUnlocking } =
    useContext(GovernanceContext);

  const toast = useToast();
  const { track } = useTracking();
  const { t } = useTranslation();
  const { data: governance } = useGovernanceData();
  const [isPendingLockOpen, setIsPendingLockOpen] = useState(false);

  const {
    isOpen: isCancelMndeOpen,
    onClose: onCancelMndeClose,
    onOpen: onCancelMndeOpen,
  } = useDisclosure();
  const {
    isOpen: isUnlockMndeOpen,
    onClose: onUnlockMndeClose,
    onOpen: onUnlockMndeOpen,
  } = useDisclosure();
  const {
    isOpen: isClaimMndeOpen,
    onClose: onClaimMndeClose,
    onOpen: onClaimMndeOpen,
  } = useDisclosure();

  function onCancelUnlocking(mndeAmount: string, address: PublicKey) {
    setCurrentNFTMndeValue(mndeAmount);
    setCurrentNFTAddress(address);
    onCancelMndeOpen();
  }

  function onStartClaiming(mndeAmount: string, address: PublicKey) {
    setCurrentNFTMndeValue(mndeAmount);
    setCurrentNFTAddress(address);
    onClaimMndeOpen();
  }

  function onStartUnlocking(
    imgURI: string,
    mndeAmount: string,
    address: PublicKey
  ) {
    setCurrentNFTMndeValue(mndeAmount);
    setCurrentNFTImageUri(imgURI);
    setCurrentNFTAddress(address);
    onUnlockMndeOpen();
  }

  return (
    <Flex width="100%" pt={8} flexDirection="column">
      {governance?.nfts.length ? (
        <Table variant="simple">
          {!isMobile ? (
            <Thead>
              <Tr>
                <Td pl={0} px="0">
                  <MText
                    fontSize="14.4px"
                    fontWeight="bold"
                    textAlign="left"
                    width="102px"
                  >
                    {t("appPage.mnde.nft-levels.nft-header")}
                  </MText>
                </Td>
                <Td isNumeric px="0">
                  <MText fontSize="14.4px" fontWeight="bold" textAlign="left">
                    {t("appPage.mnde.nft-levels.locked-mnde-header")}
                  </MText>
                </Td>
              </Tr>
            </Thead>
          ) : undefined}
          <Tbody>
            {governance?.nfts.map((nft) => (
              <NFTTableRow
                key={nft.id}
                id={nft.id}
                address={nft.address}
                thumbnailURL={nft.thumbnailURL}
                lockedMNDE={nft.lockedMNDE}
                lockEndDate={nft.lockEndDate}
                isClaimEnabled={nft.lockEndDate !== undefined}
                isCancelEnabled={nft.lockEndDate !== undefined}
                isUnlockEnabled={nft.lockEndDate === undefined}
                onUnlockMnde={onStartUnlocking}
                onClaimMnde={onStartClaiming}
                onCancelMnde={onCancelUnlocking}
              />
            ))}
            <Tr>
              <Td px="0">
                <MText fontSize="14.4px" fontWeight="bold" textAlign="left">
                  {t("appPage.mnde.nft-levels.total-locked")}
                </MText>
              </Td>
              <Td isNumeric px="0">
                <MText
                  pl={4}
                  fontSize="14.4px"
                  fontWeight="bold"
                  textAlign={isMobile ? "right" : "left"}
                >
                  {governance.lockedMnde
                    ? `${governance.lockedMnde} MNDE`
                    : "-"}
                </MText>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      ) : undefined}
      <MButton
        mt="32px"
        colorScheme="gray"
        _hover={{ bg: "gray.100" }}
        border="1px"
        borderColor="gray.500"
        textColor={colors.black}
        rounded="md"
        px={[4, 4]}
        height="48px"
        width="100%"
        bg={colors.white}
        fontWeight="700"
        fontSize="18px"
        rightIcon={<Icon as={FiExternalLink} width="16.67px" height="16.2px" />}
        onClick={() =>
          window.open("https://vote.marinade.finance/gov/mnde", "_blank")
        }
      >
        {t("appPage.mnde.nft-levels.vote")}
      </MButton>
      <ClaimMndeModal
        isPendingOpen={isPendingLockOpen}
        isOpen={isClaimMndeOpen}
        onClaimConfirm={async (): Promise<boolean> => {
          setIsPendingLockOpen(true);
          return claimMNDE(currentNFTAddress).then(
            (result) => {
              return result;
            },
            (error) => {
              setIsPendingLockOpen(false);
              let description = error.message;
              if (error.toString().includes(noPriorCredit)) {
                description = t(solFee);
              }

              toast({
                title: t(somethingWentWrong),
                description,
                status: "warning",
              });

              track({
                event: "Claim MNDE Error",
                category: "Lock MNDE",
                action: "Claim",
                label: "Error",
                description,
              });
              return false;
            }
          );
        }}
        onClose={onClaimMndeClose}
        mndeAmount={currentNFTMndeValue}
      />
      <StartUnlockingMndeModal
        isPendingOpen={isPendingLockOpen}
        onUnlockConfirm={async (): Promise<boolean> => {
          setIsPendingLockOpen(true);
          return startUnlocking(currentNFTAddress).then(
            (result) => {
              return result;
            },
            (error) => {
              setIsPendingLockOpen(false);
              let description = error.message;
              if (error.toString().includes(noPriorCredit)) {
                description = t(solFee);
              }

              toast({
                title: t(somethingWentWrong),
                description,
                status: "warning",
              });

              track({
                event: "Unlock MNDE Error",
                category: "Lock MNDE",
                action: "Unlock",
                label: "Error",
                description,
              });
              return false;
            }
          );
        }}
        isOpen={isUnlockMndeOpen}
        onClose={onUnlockMndeClose}
        imgURI={currentNFTImageUri}
        mndeAmount={currentNFTMndeValue}
      />
      <CancelUnlockingModal
        isPendingOpen={isPendingLockOpen}
        onCancelConfirm={async (): Promise<boolean> => {
          setIsPendingLockOpen(true);
          return cancelUnlocking(currentNFTAddress).then(
            (result) => {
              return result;
            },
            (error) => {
              setIsPendingLockOpen(false);
              let description = error.message;
              if (error.toString().includes(noPriorCredit)) {
                description = t(solFee);
              }

              toast({
                title: t(somethingWentWrong),
                description,
                status: "warning",
              });

              track({
                event: "Cancel unlock MNDE Error",
                category: "Lock MNDE",
                action: "Cancel unlock",
                label: "Error",
                description,
              });
              return false;
            }
          );
        }}
        isOpen={isCancelMndeOpen}
        onClose={onCancelMndeClose}
        mndeAmount={currentNFTMndeValue}
      />
    </Flex>
  );
};

export default NFTTable;
