import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function WhySection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="32"
      paddingBottom="32"
      bg={colors.blackMate}
      as="section"
      aria-label="why-section"
      display="flex"
      flexDirection="column"
      px={5}
      alignItems="stretch"
    >
      <Heading
        fontSize="5xl"
        textAlign="center"
        marginBottom="8"
        color={colors.white}
        fontWeight="bold"
      >
        {t("indexPage.why-section-title")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
      >
        {[0, 1, 2].map((index) => (
          <IconWithTextBelow
            key={`why-section-item-${index}`}
            icon={`/icons/why-section-icon${index + 1}.svg`}
            title={t(`indexPage.why-section-items.${index}.title`)}
            subtitle={t(`indexPage.why-section-items.${index}.subtitle`)}
          />
        ))}
      </Box>
    </Box>
  );
}
