import { Button, Flex, useToast } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import MText from "../../atoms/Text";
import { useLocalStorageState } from "hooks/useLocalStorageState";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

export interface MndeNotificationProps {
  onClick: () => void;
}

const MndeNotification: FunctionComponent<MndeNotificationProps> = ({
  onClick,
}) => {
  const [mndeNotificationClosed, setmndeNotificationClosed] =
    useLocalStorageState("mndeNotificationClosed");
  const { t } = useTranslation();
  const toast = useToast();
  const toastId = "mnde-notification";
  useEffect(() => {
    if (!toast.isActive(toastId) && !mndeNotificationClosed) {
      toast({
        id: toastId,
        description: (
          <Flex flexDirection="column">
            <MText>{t("mndePage.mnde-defi-notification.description")}</MText>
            <Button
              mt="11px"
              fontSize="18px"
              variant="link"
              color={colors.marinadeGreen}
              rightIcon={<AiOutlineArrowRight />}
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                setmndeNotificationClosed(true);
                onClick();
                toast.closeAll();
              }}
            >
              {t("mndePage.mnde-defi-notification.link")}
            </Button>
          </Flex>
        ),
        status: "info",
        duration: null,
        isClosable: true,
        variant: "subtle",
        onCloseComplete: () => {
          setmndeNotificationClosed(true);
        },
        containerStyle: { maxWidth: "450px" },
      });
    }
    return () => toast.closeAll();
  }, [toast, onClick, t, mndeNotificationClosed, setmndeNotificationClosed]);
  return null;
};

export default MndeNotification;
