import { Flex, IconButton, Box } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import type { NFTType } from "../../molecules/NFTTable";
import NFTTable from "../../molecules/NFTTable";
import TooltipWithContent from "../../molecules/TooltipWithContent";
import MndeLockInput from "components/molecules/MndeLockInput";
import NFTLevels from "components/molecules/NFTLevels";
import { useWallet } from "hooks/useWallet";
import colors from "styles/customTheme/colors";

const LockMNDESection = () => {
  const { t } = useTranslation();
  const { connected: isWalletConnected } = useWallet();

  const mockupCurrentDate = new Date().getTime();
  const mockupLockEndDate = new Date(
    mockupCurrentDate + 60 * 1000 * 60 * 24 * 30
  );
  const mockupPastLockEndDate = new Date(
    mockupCurrentDate - 60 * 1000 * 60 * 24
  );
  const mockupNFTs: NFTType[] = [
    {
      lockedMNDE: 7000,
      id: "1831",
      thumbnailURL: "/ilustrations/egg.svg",
    },
    {
      lockedMNDE: 4000,
      id: "1832",
      thumbnailURL: "/ilustrations/steak.svg",
      lockEndDate: mockupLockEndDate,
    },
    {
      lockedMNDE: 1500,
      id: "1834",
      thumbnailURL: "/ilustrations/fish.svg",
      lockEndDate: mockupPastLockEndDate,
    },
  ];
  let totalLockedMNDE = 0;

  mockupNFTs?.forEach((nft) => {
    totalLockedMNDE += Number(nft.lockedMNDE);
  });

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
        <MndeLockInput
          tokenName="MNDE"
          tokenIcon="/icons/mnde.svg"
          tokenBalance={0}
          mb={2}
        />
        <NFTLevels />
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
          <MText type="text-md">{t("appPage.mnde.nft-mockup-value")}</MText>
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
        {isWalletConnected ? (
          <NFTTable accountNFTs={mockupNFTs} lockedMNDE={totalLockedMNDE} />
        ) : undefined}
      </Flex>
    </Flex>
  );
};

export default LockMNDESection;
