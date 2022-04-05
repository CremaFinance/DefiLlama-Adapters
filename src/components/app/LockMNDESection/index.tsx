/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Box,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import CompleteLockMndeModal from "../../molecules/CompleteLockMndeModal";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import NFTTable from "../../molecules/NFTTable";
import TooltipWithContent from "../../molecules/TooltipWithContent";
import NFTLevels from "components/molecules/NFTLevels";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import TransactionLink from "components/molecules/TransactionLink";
import { AccountsContext } from "contexts/AccountsContext";
import { useChain } from "contexts/ConnectionProvider";
import { GovernanceContext } from "contexts/GovernanceContext";
import { useTracking } from "hooks/useTracking";
import { useWallet } from "hooks/useWallet";
import colors from "styles/customTheme/colors";

const LockMNDESection = () => {
  const { lockMNDE } = useContext(GovernanceContext);
  const chain = useChain();
  const toast = useToast();

  const { track } = useTracking();

  const [isPendingLockOpen, setIsPendingLockOpen] = useState(false);
  const [MNDEToLock, setMNDEToLock] = useState<string>("");
  const { t } = useTranslation();
  const { connected: isWalletConnected } = useWallet();

  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  const [txConfirmed, setTxConfirmed] = useState(false);

  const { MNDEBalance } = useUserBalance();

  const [selectedLevel, setSelectedLevel] = useState("-");
  const [updateInputValue, setUpdateInputValue] = useState(false);
  const [nftKind, setNftKind] = useState("");

  const handleLevelSelected = (
    value: string,
    changeInputAmount: boolean,
    kind: string
  ) => {
    setUpdateInputValue(changeInputAmount);
    setSelectedLevel(value);
    setNftKind(kind);
  };

  const {
    isOpen: isCompleteLockMndeOpen,
    onOpen: onCompleteLockMndeOpen,
    onClose: onCompleteLockMndeClose,
  } = useDisclosure();

  useEffect(() => {
    if (MNDEBalance && isWalletConnected)
      setMNDEToLock((MNDEBalance / LAMPORTS_PER_SOL).toString());
  }, [isWalletConnected, MNDEBalance]);

  useEffect(() => {
    if (selectedLevel === "1" && updateInputValue) setMNDEToLock("1000");
    if (selectedLevel === "2" && updateInputValue) setMNDEToLock("5000");
    if (selectedLevel === "3" && updateInputValue) setMNDEToLock("25000");
    if (selectedLevel === "4" && updateInputValue) setMNDEToLock("100000");
    if (selectedLevel === "5" && updateInputValue) setMNDEToLock("250000");
  }, [selectedLevel, updateInputValue]);

  useEffect(() => {
    if (isPendingLockOpen) {
      onCompleteLockMndeOpen();
    }
  }, [transactionSigned]);

  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Flex
        width={["90vw", "480px"]}
        bg={colors.white}
        rounded="md"
        alignItems="center"
        flexDirection="column"
        boxShadow="md"
        position="relative"
        p={[4, 10]}
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
            <NFTLevels
              input={MNDEToLock}
              balance={(MNDEBalance ?? 0) / LAMPORTS_PER_SOL}
              onLevelClick={handleLevelSelected}
            />
            <MButton
              font="text-xl"
              bg={colors.marinadeGreen}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.marinadeGreen}
              rounded="md"
              px={4}
              height="40px"
              width="100%"
              mx={4}
              my={4}
              isDisabled={
                Number(MNDEToLock) < 1000 ||
                Number(MNDEToLock) > (MNDEBalance ?? 0) / LAMPORTS_PER_SOL
              }
              onClick={() => {
                setIsPendingLockOpen(true);
                setTxConfirmed(false);
                lockMNDE(MNDEToLock, nftKind).then(
                  (signature) => {
                    setMNDEToLock("");
                    transactionSignedAction(false);
                    setIsPendingLockOpen(false);
                    setTxConfirmed(true);
                    if (signature) {
                      toast({
                        position: "bottom-left",
                        title: t("mndePage.lock-mnde-transaction.title"),
                        description: (
                          <p>
                            {t("mndePage.lock-mnde-transaction.description")}{" "}
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
                        action: "Lock",
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
                    setTxConfirmed(false);
                    onCompleteLockMndeClose();
                    let description = t(
                      "appPage.mnde.errors.mint-failed.description"
                    );
                    if (error.toString().includes("0xec6")) {
                      description = t("appPage.capped-tvl-is-full");
                    } else if (
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
              {t("appPage.mnde.lock-button")}
            </MButton>
          </>
        ) : (
          <Box my={4} width="100%">
            <ConnectWallet props={{ width: "100%" }} />
          </Box>
        )}

        <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
          <Flex>
            <MText type="text-md">{t("appPage.mnde.unlock-period.text")}</MText>
            <TooltipWithContent
              tooltipText={t("appPage.mnde.unlock-period.tooltip")}
            >
              <IconButton
                variant="link"
                aria-label="Unlock period"
                size="sm"
                _focus={{ boxShadow: "none" }}
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
          </Flex>
          <MText type="text-md">
            {t("appPage.mnde.unlock-period-mockup-value")}
          </MText>
        </Flex>
        <NFTTable />
      </Flex>
      <CompleteLockMndeModal
        txConfirmed={txConfirmed}
        isOpen={isCompleteLockMndeOpen}
        onClose={onCompleteLockMndeClose}
      />
      <PendingStakeModal
        isTransactionSigned={transactionSigned}
        isOpen={isPendingLockOpen}
        forceClose
        onClose={() => {
          transactionSignedAction(false);
        }}
      />
    </Flex>
  );
};

export default LockMNDESection;
