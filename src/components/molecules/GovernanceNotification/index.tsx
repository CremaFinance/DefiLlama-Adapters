import { Flex, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdNotifications } from "react-icons/md";

import colors from "../../../styles/customTheme/colors";
import Link from "../../atoms/Link";
import Text from "../../atoms/Text";

interface GovernanceNotificationProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const GovernanceNotification: FunctionComponent<
  GovernanceNotificationProps
> = ({ onClose }) => {
  const { t } = useTranslation();

  const portalContainer = document.getElementById("system-message");

  return portalContainer !== null
    ? createPortal(
        <Flex
          border="1px"
          borderColor={colors.marinadeBorderGreen}
          bg={colors.marinadeEvenLighterGreen}
        >
          <Flex flex={1} justifyContent="center" alignItems="center">
            <MdNotifications color={colors.marinadeGreen} />
            <Text
              ml="8px"
              fontSize="14.4px"
              py="8px"
              fontWeight="bold"
              lineHeight="20.16px"
            >
              {t("appPage.governance-is-live")}
            </Text>
            <Link
              fontSize="14.4px"
              fontWeight="bold"
              ml="4px"
              color={colors.marinadeGreen}
              href="/app/mnde"
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("appPage.check-it-here")}
            </Link>
          </Flex>
          <IconButton
            onClick={() => {
              onClose(true);
            }}
            transform="translate(50%)"
            right="20px"
            variant="link"
            aria-label="Close notification"
            size="lg"
            _focus={{ boxShadow: "none" }}
            icon={<MdClose />}
          />
        </Flex>,
        portalContainer
      )
    : null;
};

export default GovernanceNotification;
