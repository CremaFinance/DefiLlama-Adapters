/* eslint-disable no-unsafe-optional-chaining */
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  Skeleton,
  useToast,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../ConnectWallet";
import TooltipWithContent from "../TooltipWithContent";
import NFTUpgradeLevels from "components/molecules/NFTUpgradeLevels";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import TransactionLink from "components/molecules/TransactionLink";
import { AccountsContext } from "contexts/AccountsContext";
import { useChain } from "contexts/ConnectionProvider";
import { GovernanceContext } from "contexts/GovernanceContext";
import useGovernance from "hooks/useGovernanceData";
import { useTracking } from "hooks/useTracking";
import { useWallet } from "hooks/useWallet";
import type { NFTType } from "services/domain/nftType";
import colors from "styles/customTheme/colors";
import { formatNumberLocale } from "utils/format-number-locale";

interface UpgradeNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftAddress?: string;
}

const UpgradeNFTModal: FunctionComponent<UpgradeNFTModalProps> = ({
  isOpen,
  onClose,
  nftAddress,
}) => {
  const { t } = useTranslation();
  const [nft, setNft] = useState<NFTType | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const { data: governance, isFetching, isLoading } = useGovernance();

  useEffect(() => {
    if (!isFetching && !isLoading && governance?.nfts.length && nftAddress) {
      const selectedNFT = governance?.nfts.findIndex(
        (x) => x.address.toString() === nftAddress
      );
      setNft(governance?.nfts[selectedNFT]);
    }
  }, [setNft, isFetching, governance, isLoading, nftAddress]);

  const { addMore } = useContext(GovernanceContext);
  const chain = useChain();
  const toast = useToast();

  const { track } = useTracking();

  const [isPendingLockOpen, setIsPendingLockOpen] = useState(false);
  const [MNDEToLock, setMNDEToLock] = useState<string>("");
  const { connected: isWalletConnected } = useWallet();

  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);

  const { MNDEBalance } = useUserBalance();

  const [selectedLevel, setSelectedLevel] = useState("-");
  const [updateInputValue, setUpdateInputValue] = useState(false);

  const handleLevelSelected = (value: string, changeInputAmount: boolean) => {
    setUpdateInputValue(changeInputAmount);
    setSelectedLevel(value);
  };

  useEffect(() => {
    if (selectedLevel === "2" && updateInputValue)
      setMNDEToLock((5000 - (nft?.lockedMNDE ?? 0)).toString());
    if (selectedLevel === "3" && updateInputValue)
      setMNDEToLock((25000 - (nft?.lockedMNDE ?? 0)).toString());
    if (selectedLevel === "4" && updateInputValue)
      setMNDEToLock((100000 - (nft?.lockedMNDE ?? 0)).toString());
    if (selectedLevel === "5" && updateInputValue)
      setMNDEToLock((250000 - (nft?.lockedMNDE ?? 0)).toString());
  }, [nft?.lockedMNDE, selectedLevel, updateInputValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent p={6} my="16px">
        <ModalCloseButton _focus={{ outline: "none" }} />
        <ModalBody display="flex" p="0">
          <Flex
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            mt={6}
          >
            <Skeleton
              width={{ base: "268px", md: "382px" }}
              height={{ base: "268px", md: "382px" }}
              isLoaded={!isFetching && !isLoading && thumbnailLoaded}
            >
              <Image
                src={nft?.thumbnailURL}
                alt="Fish"
                onLoad={() => {
                  setThumbnailLoaded(true);
                }}
                maxWidth={{ base: "268px", md: "382px" }}
              />
            </Skeleton>
            <MText
              mt="24px"
              fontWeight="400"
              fontSize="14.4px"
              color={colors.black}
            >
              {t("mndePage.lock-more-title")}
            </MText>
            <Flex
              mt="10px"
              mx="24px"
              alignItems="center"
              flexDirection="column"
              position="relative"
            >
              <StakeInput
                stakeInputType={StakeInputTypeEnum.Source}
                tokenName="MNDE"
                tokenIcon="/icons/mnde.svg"
                onValueChange={setMNDEToLock}
                value={MNDEToLock}
                tokenBalance={
                  (isWalletConnected ? MNDEBalance ?? 0 : 0) / LAMPORTS_PER_SOL
                }
                mb={2}
              />

              {isWalletConnected ? (
                <>
                  <Skeleton
                    isLoaded={!isFetching && !isLoading && thumbnailLoaded}
                    mb="8px"
                    width="100%"
                    alignSelf="flex-start"
                  >
                    <NFTUpgradeLevels
                      kind={nft?.kind ?? ""}
                      limited={nft?.limited ?? false}
                      currentAmount={nft?.lockedMNDE ?? 0}
                      input={MNDEToLock}
                      balance={(MNDEBalance ?? 0) / LAMPORTS_PER_SOL}
                      onLevelClick={handleLevelSelected}
                    />
                  </Skeleton>
                  <MButton
                    alignSelf="flex-start"
                    font="text-xl"
                    bg={colors.marinadeGreen}
                    _hover={{ bg: colors.green800 }}
                    colorScheme={colors.marinadeGreen}
                    rounded="md"
                    height="40px"
                    width="100%"
                    isDisabled={
                      Number(MNDEToLock) <= 0 ||
                      Number(MNDEToLock) > (MNDEBalance ?? 0) / LAMPORTS_PER_SOL
                    }
                    onClick={() => {
                      setIsPendingLockOpen(true);
                      addMore(MNDEToLock, nft?.address).then(
                        (signature) => {
                          setMNDEToLock("");
                          transactionSignedAction(false);
                          setIsPendingLockOpen(false);
                          if (signature) {
                            toast({
                              position: "bottom-left",
                              title: t("mndePage.lock-mnde-transaction.title"),
                              description: (
                                <p>
                                  {t(
                                    "mndePage.lock-mnde-transaction.description"
                                  )}{" "}
                                  <TransactionLink
                                    chainName={chain.name}
                                    transactionid={signature}
                                  />
                                </p>
                              ),
                              status: "success",
                            });
                            track({
                              event: "Lock MNDE",
                              category: "Lock MNDE",
                              action: "Upgrade",
                              label: "Success",
                              sol_amount: Number(MNDEToLock),
                              currency: "MNDE",
                              transaction_id: uuidv4(),
                            });
                          }
                        },
                        (error) => {
                          transactionSignedAction(false);
                          setIsPendingLockOpen(false);
                          let description = t(
                            "appPage.mnde.errors.mint-failed.description"
                          );
                          if (
                            error
                              .toString()
                              .includes("no record of a prior credit") ||
                            error
                              .toString()
                              .includes("Error processing Instruction 5")
                          ) {
                            description = t("appPage.missing-sol-for-fee");
                          }

                          toast({
                            title: t("appPage.mnde.errors.mint-failed.title"),
                            description,
                            status: "warning",
                            position: "bottom-left",
                          });

                          track({
                            event: "Lock MNDE Error",
                            category: "Lock MNDE",
                            action: "Lock",
                            label: "Error",
                            description,
                          });
                          return false;
                        }
                      );
                    }}
                  >
                    {t("appPage.mnde.lock-more-button")}
                  </MButton>
                </>
              ) : (
                <Box my={4} width="100%">
                  <ConnectWallet props={{ width: "100%" }} />
                </Box>
              )}

              <Flex width="100%" mt={3} mb={1} justifyContent="space-between">
                <Flex>
                  <MText type="text-md">
                    {t("appPage.mnde.current-locked-amount.text")}
                  </MText>
                  <TooltipWithContent
                    tooltipText={t(
                      "appPage.mnde.current-locked-amount.tooltip"
                    ).replace("{{value}}", nft?.lockedMNDE)}
                  >
                    <IconButton
                      variant="link"
                      aria-label="Current locked amount"
                      size="sm"
                      _focus={{ boxShadow: "none" }}
                      icon={<MdInfoOutline />}
                    />
                  </TooltipWithContent>
                </Flex>
                <MText type="text-md">
                  {formatNumberLocale(nft?.lockedMNDE)}
                </MText>
              </Flex>
            </Flex>
            <PendingStakeModal
              isTransactionSigned={transactionSigned}
              isOpen={isPendingLockOpen}
              onClose={() => {
                transactionSignedAction(false);
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpgradeNFTModal;