import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function WhySection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="24"
      paddingBottom="24"
      bg={colors.blackMate}
      as="section"
      aria-label="why-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading mt={2} textAlign="center" color={colors.white} fontWeight="bold">
        {t("indexPage.why-section-title")}
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        marginY={4}
      >
        {[0, 1, 2].map((index) => (
          <IconWithTextBelow
            marginTop={4}
            marginX={8}
            key={`why-section-item-${index}`}
            icon={`/icons/why-section-icon${index + 1}.svg`}
            title={t(`indexPage.why-section-items.${index}.title`)}
            subtitle={t(`indexPage.why-section-items.${index}.subtitle`)}
          />
        ))}
      </Flex>
    </Box>
  );
}
