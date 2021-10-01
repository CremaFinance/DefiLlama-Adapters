import { Box, Button, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";

export default function SecuritySection() {
  const { t } = useTranslation("index");

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg="#242731"
      as="section"
      aria-label="security-section"
      display="flex"
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
        {t("security-section-title")}
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
        {t("security-section-subtitle")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
      >
        {[0, 1, 2, 3].map((index) => (
          <IconWithTextBelow
            key={`security-item-${index}`}
            icon={`/icons/security-section-icon${index + 1}.svg`}
            title={t(`security-section-items.${index}.title`)}
            subtitle={t(`security-section-items.${index}.subtitle`)}
          />
        ))}
      </Box>
      <Box marginTop="10" display="flex" justifyContent="center">
        <Button
          bg="#308D8A"
          _hover={{ bg: "#308D8Aaa" }}
          colorScheme="green"
          rounded="md"
        >
          {t("security-section-action")}
        </Button>
      </Box>
    </Box>
  );
}
