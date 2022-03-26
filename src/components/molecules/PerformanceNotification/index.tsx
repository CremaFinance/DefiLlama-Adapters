import { Box, Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdWarning } from "react-icons/md";
import { useQuery } from "react-query";

import colors from "../../../styles/customTheme/colors";
import Text from "../../atoms/Text";
import { getRecentPerformance } from "solana/services/recentPerformance";

interface PerformanceNotificationProps {
  showNotification: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const refetchInterval = 1000 * 60;

const PerformanceNotification: FunctionComponent<
  PerformanceNotificationProps
> = ({ children, showNotification, onOpen, onClose }) => {
  const { t } = useTranslation();
  const [isLargerThan320] = useMediaQuery("(min-width: 768px)");
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  const [keepClosed, setKeepClosed] = useState(false);
  const router = useRouter();
  const isLandingActive = router.pathname === "/";

  const tps = useQuery<number>(
    "recentPerformance",
    () => getRecentPerformance(),
    { refetchInterval }
  );
  useEffect(() => {
    if (!keepClosed && tps.data && tps.data < 1600 && !isLandingActive) {
      onOpen();
    }

    if (!portalContainer) {
      setPortalContainer(document.getElementById("system-message"));
    }
  }, [
    keepClosed,
    tps,
    showNotification,
    onOpen,
    portalContainer,
    isLandingActive,
  ]);

  return !keepClosed && portalContainer !== null && showNotification
    ? createPortal(
        <Flex flexDirection="column" flex={1}>
          <Flex
            border="1px"
            borderColor={colors.marinadeOrange}
            justifyContent="center"
            alignItems="center"
            bg={colors.marinadeOrange400}
            position="relative"
            width="100%"
          >
            {isLargerThan320 ? (
              <>
                <MdWarning color={colors.marinadeOrange} />
                <Text
                  position="relative"
                  alignSelf="center"
                  textAlign="center"
                  ml="8px"
                  fontSize={{ base: "11px", md: "14px" }}
                  py="8px"
                  fontWeight="bold"
                  lineHeight="20.16px"
                  pr={{ base: "32px", md: "unset" }}
                >
                  {t("appPage.degraded-network-performance")}
                </Text>
                <IconButton
                  onClick={() => {
                    setKeepClosed(true);
                    onClose();
                  }}
                  position="absolute"
                  transform="translate(50%)"
                  right="20px"
                  variant="link"
                  aria-label="Close notification"
                  size="lg"
                  _focus={{ boxShadow: "none" }}
                  icon={<MdClose />}
                />
              </>
            ) : (
              <Flex>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  py="8px"
                  pl="1px"
                >
                  <Text textAlign="center" fontSize="11px" fontWeight="bold">
                    <Box
                      display="inline-block"
                      pr="6px"
                      transform="translate(0, 15%)"
                    >
                      <MdWarning color={colors.marinadeOrange} size={14} />
                    </Box>
                    {t("appPage.degraded-network-performance")}
                  </Text>
                </Flex>
                <IconButton
                  onClick={() => {
                    setKeepClosed(true);
                    onClose();
                  }}
                  transform="translate(50%)"
                  right="20px"
                  variant="link"
                  aria-label="Close notification"
                  size="lg"
                  _focus={{ boxShadow: "none" }}
                  icon={<MdClose />}
                />
              </Flex>
            )}
          </Flex>
          {children}
        </Flex>,
        portalContainer
      )
    : null;
};

export default PerformanceNotification;
