import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdWarning } from "react-icons/md";
import { useQuery } from "react-query";

import colors from "../../../styles/customTheme/colors";
import Text from "../../atoms/Text";
import { getRecentPerformance } from "solana/services/recentPerformance";

const refetchInterval = 1000 * 60;

const PerformanceNotification = () => {
  const { t } = useTranslation();

  const tps = useQuery<number>(
    "recentPerformance",
    () => getRecentPerformance(),
    { refetchInterval }
  );

  return (
    <Flex
      border="1px"
      borderColor={colors.marinadeOrange}
      justifyContent="center"
      alignItems="center"
      display={tps.data && tps.data < 1600 ? "flex" : "none"}
      bg={colors.marinadeOrange400}
    >
      <MdWarning color={colors.marinadeOrange} />
      <Text
        ml="8px"
        fontSize="14.4px"
        py="8px"
        fontWeight="medium"
        lineHeight="20.16px"
      >
        {t("appPage.degraded-network-performance")}
      </Text>
    </Flex>
  );
};

export default PerformanceNotification;
