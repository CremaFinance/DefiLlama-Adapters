import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function SecuritySection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="24"
      paddingBottom="16"
      bg={colors.blackMate}
      as="section"
      aria-label="security-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading
        mt={2}
        alignSelf="center"
        textAlign="center"
        maxWidth="504"
        color={colors.white}
        fontWeight="bold"
      >
        {t("indexPage.security-section-title")}
      </Heading>
      <Text
        fontSize="22"
        alignSelf="center"
        maxWidth="720"
        textAlign="center"
        marginY={4}
        marginX="4"
        color={colors.white800}
      >
        {t("indexPage.security-section-subtitle")}
      </Text>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <IconWithTextBelow
          marginTop={8}
          marginX={8}
          key="security-item-0"
          icon="/icons/crank.svg"
          title={t(`indexPage.security-section-items.0.title`)}
          subtitle={t(`indexPage.security-section-items.0.subtitle`)}
        />
        <IconWithTextBelow
          marginTop={8}
          marginX={8}
          key="security-item-1"
          icon="/icons/trophy.svg"
          title={t(`indexPage.security-section-items.1.title`)}
          subtitle={t(`indexPage.security-section-items.1.subtitle`)}
        />
        <IconWithTextBelow
          marginTop={8}
          marginX={8}
          key="security-item-2"
          icon="/icons/bot.svg"
          title={t(`indexPage.security-section-items.2.title`)}
          subtitle={t(`indexPage.security-section-items.2.subtitle`)}
        />
      </Flex>
      <Box marginTop="16" display="flex" justifyContent="center">
        <Button
          bg={colors.greenVibrant}
          _hover={{ bg: colors.greenVibrant800 }}
          colorScheme={colors.greenVibrant}
          rounded="md"
        >
          {t("indexPage.security-section-action")}
        </Button>
      </Box>
      <Heading
        as="h3"
        marginTop="24"
        marginBottom="8"
        alignSelf="center"
        textAlign="center"
        maxWidth="504"
        color={colors.white}
        fontWeight="bold"
      >
        {t("indexPage.security-section-audit-title")}
      </Heading>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <IconWithTextBelow
          height={70}
          opacity="0.6"
          marginTop={4}
          marginX={8}
          key="neodyme"
          icon="/logos/neodyme-white.png"
          title={t(`indexPage.security-section-audit-neodyme.title`)}
          subtitle={t(`indexPage.security-section-audit-neodyme.subtitle`)}
          externalUrl={t(
            `indexPage.security-section-audit-neodyme.external-url`
          )}
        />
        <IconWithTextBelow
          height={70}
          opacity="0.6"
          marginTop={4}
          marginX={8}
          key="ackee"
          icon="/logos/ackee-blockchain.svg"
          title={t(`indexPage.security-section-audit-ackee.title`)}
          subtitle={t(`indexPage.security-section-audit-ackee.subtitle`)}
          externalUrl={t(`indexPage.security-section-audit-ackee.external-url`)}
        />
        <IconWithTextBelow
          height={12}
          width="200px"
          marginTop={8}
          marginX={8}
          key="kudelski"
          icon="/logos/kudelski-security.png"
          title={t(`indexPage.security-section-audit-kudelski.title`)}
          subtitle={t(`indexPage.security-section-audit-kudelski.subtitle`)}
          externalUrl={t(
            `indexPage.security-section-audit-kudelski.external-url`
          )}
        />
      </Flex>
    </Box>
  );
}
