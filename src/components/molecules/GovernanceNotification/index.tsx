import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { createPortal } from "react-dom";
import { MdNotifications } from "react-icons/md";

import colors from "../../../styles/customTheme/colors";
import Link from "../../atoms/Link";
import Text from "../../atoms/Text";

const GovernanceNotification = () => {
  const { t } = useTranslation();

  const portalContainer = document.getElementById("system-message");

  return portalContainer !== null
    ? createPortal(
        <Flex
          border="1px"
          borderColor={colors.marinadeBorderGreen}
          justifyContent="center"
          alignItems="center"
          flex={1}
          bg={colors.marinadeEvenLighterGreen}
        >
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
          >
            {t("appPage.check-it-here")}
          </Link>
        </Flex>,
        portalContainer
      )
    : null;
};

export default GovernanceNotification;
