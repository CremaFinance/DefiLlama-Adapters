import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function SecuritySection() {
  const { t } = useTranslation();

  return (
    <Box
      pt={24}
      pb={24}
      bg={colors.blackMate}
      as="section"
      aria-label="security-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <MText
        mt={6}
        alignSelf="center"
        textAlign="center"
        maxWidth="504"
        color={colors.white}
        type="heading-md"
      >
        {t("indexPage.security-section-title")}
      </MText>
      <MText
        type="text-xl"
        alignSelf="center"
        maxWidth="720"
        textAlign="center"
        marginY={6}
        marginX="4"
        color={colors.white800}
      >
        {t("indexPage.security-section-subtitle")}
      </MText>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "unset", lg: "center" }}
        marginTop={6}
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
      <Flex mt={16} mb={8} justifyContent="center">
        <MButton
          font="text-xl"
          bg={colors.greenVibrant}
          _hover={{ bg: colors.greenVibrant800 }}
          colorScheme={colors.greenVibrant}
          width={272}
          height="48px"
          rounded="md"
        >
          {t("indexPage.security-section-action")}
        </MButton>
      </Flex>
      <MText
        type="heading-sm"
        marginTop={24}
        marginBottom="8"
        alignSelf="center"
        textAlign="center"
        maxWidth="504"
        color={colors.white}
      >
        {t("indexPage.security-section-audit-title")}
      </MText>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "unset", lg: "center" }}
        marginTop={4}
      >
        <IconWithTextBelow
          height={70}
          opacity="0.6"
          marginBottom={8}
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
          marginBottom={8}
          marginTop={4}
          marginX={8}
          key="ackee"
          icon="/logos/ackee-blockchain.svg"
          title={t(`indexPage.security-section-audit-ackee.title`)}
          subtitle={t(`indexPage.security-section-audit-ackee.subtitle`)}
          externalUrl={t(`indexPage.security-section-audit-ackee.external-url`)}
        />
        <IconWithTextBelow
          height={14}
          width="200px"
          marginBottom={8}
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
