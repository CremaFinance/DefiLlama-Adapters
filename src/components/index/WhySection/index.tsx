import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";

export default function WhySection() {
  const { t } = useTranslation("index");

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg="#242731"
      as="section"
      aria-label="why-section"
      display="flex"
      flexDirection="column"
      px={5}
      alignItems="stretch"
    >
      <Heading
        // width="xs"
        textAlign="center"
        marginBottom={4}
        color="white"
        fontWeight="bold"
      >
        {t("why-section-title")}
      </Heading>
      <Heading
        size="lg"
        alignSelf="center"
        maxWidth="1000"
        textAlign="center"
        marginBottom="20"
        marginTop="10"
        color="white"
        fontWeight="300"
      >
        {t("why-section-subtitle")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
      >
        {[0, 1, 2].map((index) => (
          <IconWithTextBelow
            icon={`/icons/why-section-icon${index + 1}.svg`}
            title={t(`why-section-items.${index}.title`)}
            subtitle={t(`why-section-items.${index}.subtitle`)}
          />
        ))}
      </Box>
    </Box>
  );
}
