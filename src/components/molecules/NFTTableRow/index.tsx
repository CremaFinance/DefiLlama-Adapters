import { Flex, Tr, Td, Image, useMediaQuery, Skeleton } from "@chakra-ui/react";
import type { PublicKey } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { useState } from "react";

import { formatNumberLocale } from "../../../utils/format-number-locale";
import MButton from "../../atoms/Button";
import Countdown from "../../atoms/Countdown";
import MText from "../../atoms/Text";
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
  onUnlockMnde: (
    imgURI: string,
    mndeAmount: string,
    address: PublicKey
  ) => void;
  onClaimMnde: (mndeAmount: string, address: PublicKey) => void;
  onCancelMnde: (mndeAmount: string, address: PublicKey) => void;
  onUpgrade: () => void;
};

const NFTTableRow: FunctionComponent<NFTTableRowProps> = ({
  lockedMNDE,
  id,
  address,
  thumbnailURL,
  lockEndDate,
  isUnlockEnabled,
  isClaimEnabled,
  isCancelEnabled,
  onUnlockMnde,
  onClaimMnde,
  onCancelMnde,
  onUpgrade,
}) => {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const [countdownVisible, setCountdownVisible] = useState(true);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const router = useRouter();
  return (
    <Tr height="84px">
      <Td pl={0} py={0} pr={[4, 8]}>
        <Flex
          cursor="pointer"
          flexDirection="column"
          onClick={() => router.push(`mnde/nft?pid=${address.toString()}`)}
        >
          <Skeleton width="48px" height="48px" isLoaded={thumbnailLoaded}>
            <Image
              src={thumbnailURL}
              width="48px"
              onLoad={() => {
                setThumbnailLoaded(true);
              }}
            />
          </Skeleton>
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
            {!isMobile ? formatNumberLocale(lockedMNDE) : undefined}
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
              alignItems="end"
              mb="12px"
              mt="12px"
            >
              {isMobile ? (
                <MText textAlign="center" fontSize="14.4px" mb="8px">
                  {formatNumberLocale(lockedMNDE)} MNDE
                </MText>
              ) : undefined}
              {isUnlockEnabled && (
                <MButton
                  textColor={colors.white}
                  rounded="md"
                  px={[4, 4]}
                  height="32px"
                  _hover={{ bg: colors.green800 }}
                  _focus={{ boxShadow: "none" }}
                  colorScheme={colors.marinadeGreen}
                  bg={colors.marinadeGreen}
                  mb="12px"
                  color="white"
                  fontWeight="700"
                  fontSize="14.4px"
                  onClick={() => {
                    onUpgrade();
                  }}
                >
                  {t("appPage.mnde.nft-levels.lock-more")}
                </MButton>
              )}
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
                    onUnlockMnde(thumbnailURL, lockedMNDE.toString(), address);
                    setCountdownVisible(true);
                  } else {
                    onCancelMnde(lockedMNDE.toString(), address);
                  }
                }}
              >
                {isCancelEnabled && t("appPage.mnde.nft-levels.cancel-unlock")}
                {isUnlockEnabled && t("appPage.mnde.nft-levels.unlock")}
              </MButton>
            </Flex>
            {isClaimEnabled && lockEndDate && (
              <MButton
                colorScheme="gray"
                _hover={{ bg: "gray.100" }}
                border="1px"
                borderColor="gray.500"
                textColor={colors.black}
                rounded="md"
                px={[4, 4]}
                mb="12px"
                height="32px"
                bg={colors.white}
                fontWeight="500"
                fontSize="14.4px"
                onClick={() => {
                  if (lockEndDate.getTime() - new Date().getTime() < 0) {
                    onClaimMnde(lockedMNDE.toString(), address);
                  }
                }}
                isDisabled={lockEndDate.getTime() - new Date().getTime() > 0}
              >
                {lockEndDate.getTime() - new Date().getTime() < 0
                  ? t("appPage.mnde.nft-levels.claim")
                  : t("appPage.mnde.nft-levels.delayed-claim")}
                {lockEndDate.getTime() - new Date().getTime() > 0 &&
                  countdownVisible && (
                    <Countdown
                      initialTimeLeft={
                        lockEndDate.getTime() - new Date().getTime()
                      }
                      showSeconds={false}
                      showSecondsOnMinuteLeft
                      onTimerFinished={() => {
                        setCountdownVisible(false);
                      }}
                    />
                  )}
              </MButton>
            )}
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};

export default NFTTableRow;