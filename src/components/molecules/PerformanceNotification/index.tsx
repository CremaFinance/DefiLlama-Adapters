import { Flex, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
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
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  const [keepClosed, setKeepClosed] = useState(false);

  const tps = useQuery<number>(
    "recentPerformance",
    () => getRecentPerformance(),
    { refetchInterval }
  );
  useEffect(() => {
    if (!keepClosed && tps.data && tps.data < 1600) {
      onOpen();
    }

    if (!portalContainer) {
      setPortalContainer(document.getElementById("system-message"));
    }
  }, [keepClosed, tps, showNotification, onOpen, portalContainer]);

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
            <MdWarning color={colors.marinadeOrange} />
            <Text
              alignSelf="center"
              ml="8px"
              fontSize="14.4px"
              py="8px"
              fontWeight="medium"
              lineHeight="20.16px"
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
          </Flex>
          {children}
        </Flex>,
        portalContainer
      )
    : null;
};

export default PerformanceNotification;
