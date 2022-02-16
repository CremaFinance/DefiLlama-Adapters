import { Flex, IconButton, Box } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import TooltipWithContent from "../../molecules/TooltipWithContent";
import MndeLockInput from "components/molecules/MndeLockInput";
import NFTLevels from "components/molecules/NFTLevels";
import { useWallet } from "hooks/useWallet";
import colors from "styles/customTheme/colors";

const LockMNDESection = () => {
  const { t } = useTranslation();
  const { connected: isWalletConnected } = useWallet();

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
      </Flex>
    </Flex>
  );
};

export default LockMNDESection;
