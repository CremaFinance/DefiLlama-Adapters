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
import { useContext, useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import NFTTableRow from "../NFTTableRow";
import StartUnlockingMndeModal from "components/molecules/StartUnlockingMndeModal";
import { GovernanceContext } from "contexts/GovernanceContext";
import { useTracking } from "hooks/useTracking";
import { useWallet } from "hooks/useWallet";
import colors from "styles/customTheme/colors";

export type NFTType = {
  address: PublicKey;
  lockedMNDE: number;
  id: string;
  thumbnailURL: string;
  lockEndDate?: Date;
};

const NFTTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const [currentNFTMndeValue, setCurrentNFTMndeValue] = useState("0");
  const [currentNFTImageUri, setCurrentNFTImageUri] = useState("/");
  const [currentNFTAddress, setCurrentNFTAddress] = useState(PublicKey.default);

  const { startUnlocking } = useContext(GovernanceContext);

  const toast = useToast();
  const { track } = useTracking();
  const { t } = useTranslation();
  const { connected: isWalletConnected } = useWallet();
  const [isPendingLockOpen, setIsPendingLockOpen] = useState(false);
  const {
    isOpen: isUnlockMndeOpen,
    onClose: onUnlockMndeClose,
    onOpen: onUnlockMndeOpen,
  } = useDisclosure();

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

  const { nfts, getNftsAction, fetchNftsLoading, lockedMnde } =
    useContext(GovernanceContext);

  useEffect(() => {
    if (isWalletConnected) {
      getNftsAction(isWalletConnected, !fetchNftsLoading);
    }
  }, [isWalletConnected, nfts, lockedMnde]);

  return (
    <Flex width="100%" pt={8} flexDirection="column">
      {nfts.length ? (
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
            {nfts.map((nft) => (
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
                // eslint-disable-next-line react/jsx-no-bind
                onUnlockMnde={onStartUnlocking}
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
                  {lockedMnde ? `${lockedMnde} MNDE` : "-"}
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
              if (error.toString().includes("0xec6")) {
                description = t("appPage.capped-tvl-is-full");
              } else if (
                error.toString().includes("no record of a prior credit")
              ) {
                description = t("appPage.missing-sol-for-fee");
              }

              toast({
                title: t("appPage.something-went-wrong"),
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
    </Flex>
  );
};

export default NFTTable;
