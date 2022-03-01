/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import { useUserBalance } from "../../../contexts/UserBalanceContext";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import NFTTable from "../../molecules/NFTTable";
import TooltipWithContent from "../../molecules/TooltipWithContent";
import LockMndeModal from "components/molecules/LockMndeModal";
import NFTLevels from "components/molecules/NFTLevels";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import { GovernanceContext } from "contexts/GovernanceContext";
import { useWallet } from "hooks/useWallet";
import colors from "styles/customTheme/colors";

const LockMNDESection = () => {
  const {
    fetchNftsLoadingAction,
    resetNftsAction,
    getNftsAction,
    fetchNftsLoading,
    lockMNDE,
  } = useContext(GovernanceContext);

  const [MNDEToLock, setMNDEToLock] = useState<string>("");
  const { t } = useTranslation();
  const { connected: isWalletConnected } = useWallet();

  const { MNDEBalance } = useUserBalance();

  const [selectedLevel, setSelectedLevel] = useState("-");
  const [updateInputValue, setUpdateInputValue] = useState(false);

  const handleLevelSelected = (value: string, changeInputAmount: boolean) => {
    setUpdateInputValue(changeInputAmount);
    setSelectedLevel(value);
  };

  useEffect(() => {
    if (isWalletConnected) {
      getNftsAction(isWalletConnected, !fetchNftsLoading);
    } else {
      resetNftsAction();
      fetchNftsLoadingAction(false);
    }
  }, [fetchNftsLoading, isWalletConnected]);

  const {
    isOpen: isLockMndeOpen,
    onOpen: onLockMndeOpen,
    onClose: onLockMndeClose,
  } = useDisclosure();

  useEffect(() => {
    if (selectedLevel === "1" && updateInputValue) setMNDEToLock("1000");
    if (selectedLevel === "2" && updateInputValue) setMNDEToLock("5000");
    if (selectedLevel === "3" && updateInputValue) setMNDEToLock("25000");
    if (selectedLevel === "4" && updateInputValue) setMNDEToLock("100000");
    if (selectedLevel === "5" && updateInputValue) setMNDEToLock("500000");
  }, [selectedLevel, updateInputValue]);

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
          tokenBalance={(MNDEBalance ?? 0) / LAMPORTS_PER_SOL}
          mb={2}
        />
        <NFTLevels
          input={MNDEToLock}
          balance={(MNDEBalance ?? 0) / LAMPORTS_PER_SOL}
          onLevelClick={handleLevelSelected}
        />
        {isWalletConnected ? (
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
            onClick={() => {
              onLockMndeOpen();
            }}
          >
            {t("appPage.mnde.lock-button")}
          </MButton>
        ) : (
          <Box my={4} width="100%">
            <ConnectWallet props={{ width: "100%" }} />
          </Box>
        )}

        <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
          <Flex>
            <MText type="text-md">{t("appPage.mnde.nft")}</MText>
            <TooltipWithContent tooltipText={t("appPage.mnde.nft")}>
              <IconButton
                variant="link"
                aria-label="NFT Level"
                size="sm"
                _focus={{ boxShadow: "none" }}
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
          </Flex>
          <MText type="text-md">
            {selectedLevel !== "-"
              ? t("appPage.mnde.nft-level-value") + selectedLevel
              : "-"}
          </MText>
        </Flex>

        <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
          <Flex>
            <MText type="text-md">{t("appPage.mnde.unlock-period")}</MText>
            <TooltipWithContent tooltipText={t("appPage.mnde.unlock-period")}>
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
        {isWalletConnected ? <NFTTable /> : undefined}
      </Flex>
      <LockMndeModal
        isOpen={isLockMndeOpen}
        onClose={onLockMndeClose}
        onLockConfirm={async () => {
          await lockMNDE(MNDEToLock);
        }}
      />
    </Flex>
  );
};

export default LockMNDESection;
