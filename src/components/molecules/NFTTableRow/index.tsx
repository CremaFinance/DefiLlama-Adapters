import { Flex, Tr, Td, Image, useMediaQuery } from "@chakra-ui/react";
import type { PublicKey } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useContext } from "react";

import MButton from "../../atoms/Button";
import Countdown from "../../atoms/Countdown";
import MText from "../../atoms/Text";
import { GovernanceContext } from "contexts/GovernanceContext";
import colors from "styles/customTheme/colors";

type NFTTableRowProps = {
  lockedMNDE: number;
  id: string;
  address: PublicKey;
  thumbnailURL: string;
  lockEndDate?: Date;
  isUnlockEnabled?: boolean;
  isClaimEnabled?: boolean;
  isCancelEnabled?: boolean;
};

const NFTTableRow = ({
  lockedMNDE,
  id,
  address,
  thumbnailURL,
  lockEndDate,
  isUnlockEnabled,
  isClaimEnabled,
  isCancelEnabled,
}: NFTTableRowProps) => {
  const { t } = useTranslation();
  const { startUnlocking, claimMNDE, cancelUnlocking } =
    useContext(GovernanceContext);
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  return (
    <Tr height="84px">
      <Td pl={0} py={0} pr={[4, 8]}>
        <Flex flexDirection="column">
          <Image src={thumbnailURL} width="48px" />
          <MText
            mt="4px"
            type="text-md"
            textAlign="left"
            fontSize="11.52px"
            fontWeight="bold"
            color={colors.marinadeGreen}
          >
            {`#${id}`}
          </MText>
        </Flex>
      </Td>
      <Td pr={0} py={0} pl={[2, 6]} textAlign="end">
        <Flex justifyContent="space-between">
          <MText textAlign="left" fontSize="14.4px" alignSelf="center">
            {!isMobile ? lockedMNDE : undefined}
          </MText>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="end"
            alignSelf="end"
          >
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              my="4px"
              mt="12px"
            >
              {isMobile ? (
                <MText textAlign="center" fontSize="14.4px" mb="8px">
                  {lockedMNDE} MNDE
                </MText>
              ) : undefined}
              <MButton
                colorScheme="gray"
                _hover={{ bg: "gray.100" }}
                border="1px"
                borderColor="gray.500"
                textColor={colors.black}
                rounded="md"
                px={[4, 4]}
                height="32px"
                width="115px"
                bg={colors.white}
                fontWeight="500"
                fontSize="14.4px"
                onClick={() => {
                  if (isUnlockEnabled) {
                    startUnlocking(address);
                  } else {
                    cancelUnlocking(address);
                  }
                }}
              >
                {isCancelEnabled
                  ? t("appPage.mnde.nft-levels.cancel-unlock")
                  : undefined}
                {isUnlockEnabled
                  ? t("appPage.mnde.nft-levels.unlock")
                  : undefined}
              </MButton>
              {isUnlockEnabled ? (
                <MText textAlign="center" fontSize="11.52px">
                  {t("appPage.mnde.nft-levels.lock-period")}
                </MText>
              ) : undefined}
            </Flex>
            {isClaimEnabled && lockEndDate ? (
              <MButton
                colorScheme="gray"
                _hover={{ bg: "gray.100" }}
                border="1px"
                borderColor="gray.500"
                textColor={colors.black}
                rounded="md"
                px={[4, 4]}
                my="4px"
                mb="12px"
                height="32px"
                bg={colors.white}
                fontWeight="500"
                fontSize="14.4px"
                onClick={() => {
                  if (lockEndDate.getTime() - new Date().getTime() < 0) {
                    claimMNDE(address);
                  }
                }}
                isDisabled={lockEndDate.getTime() - new Date().getTime() > 0}
              >
                {lockEndDate.getTime() - new Date().getTime() < 0
                  ? t("appPage.mnde.nft-levels.claim")
                  : t("appPage.mnde.nft-levels.delayed-claim")}
                {lockEndDate.getTime() - new Date().getTime() > 0 ? (
                  <Countdown
                    initialTimeLeft={
                      lockEndDate.getTime() - new Date().getTime()
                    }
                    showSeconds={false}
                  />
                ) : undefined}
              </MButton>
            ) : undefined}
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};

export default NFTTableRow;
