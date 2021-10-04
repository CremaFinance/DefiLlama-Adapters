import { Box, Button, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";

export default function SecuritySection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg="#242731"
      as="section"
      aria-label="security-section"
      display="flex"
      px={5}
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading
        alignSelf="center"
        textAlign="center"
        marginBottom={4}
        maxWidth="500"
        color="white"
        fontWeight="bold"
      >
        {t("indexPage.security-section-title")}
      </Heading>
      <Heading
        size="lg"
        alignSelf="center"
        maxWidth="1000"
        textAlign="center"
        marginBottom="20"
        marginTop="10"
        color="whiteAlpha.800"
        fontWeight="400"
      >
        {t("indexPage.security-section-subtitle")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
      >
        <IconWithTextBelow
          key="security-item-0"
          icon="/icons/security-section-icon0.svg"
          title={t(`indexPage.security-section-items.0.title`)}
          subtitle={t(`indexPage.security-section-items.0.subtitle`)}
        />
        <IconWithTextBelow
          key="security-item-1"
          icon="/icons/security-section-icon1.svg"
          title={t(`indexPage.security-section-items.1.title`)}
          // TODO: Add proper links on i18n string using below key
          subtitle={t("indexPage.security-section-items.1.subtitle")}
        />
        <IconWithTextBelow
          key="security-item-2"
          icon="/icons/security-section-icon2.svg"
          title={t(`indexPage.security-section-items.2.title`)}
          subtitle={t(`indexPage.security-section-items.2.subtitle`)}
        />
        <IconWithTextBelow
          key="security-item-3"
          icon="/icons/security-section-icon3.svg"
          title={t(`indexPage.security-section-items.3.title`)}
          subtitle={t(`indexPage.security-section-items.3.subtitle`)}
        />
      </Box>
      <Box marginTop="10" display="flex" justifyContent="center">
        <Button
          bg="#308D8A"
          _hover={{ bg: "#308D8Aaa" }}
          colorScheme="green"
          rounded="md"
        >
          {t("indexPage.security-section-action")}
        </Button>
      </Box>
    </Box>
  );
}
