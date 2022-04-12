import { Button, Flex, useToast } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import MText from "../../atoms/Text";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

export interface MndeNotificationProps {
  onClick: () => void;
}

const MndeNotification: FunctionComponent<MndeNotificationProps> = ({
  onClick,
}) => {
  const { t } = useTranslation();
  const toast = useToast();
  const toastId = "mnde-notification";
  useEffect(() => {
    if (!toast.isActive(toastId)) {
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
        containerStyle: { maxWidth: "450px" },
      });
    }
    return () => toast.closeAll();
  }, [toast, onClick, t]);
  return null;
};

export default MndeNotification;
