import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MText from "../../atoms/Text";
import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function WhySection() {
  const { t } = useTranslation();

  return (
    <Flex
      paddingTop="24"
      paddingBottom="24"
      bg={colors.blackMate}
      as="section"
      aria-label="why-section"
      flexDirection="column"
      alignItems="stretch"
    >
      <MText textAlign="center" color={colors.white} type="heading-lg" mt={2}>
        {t("indexPage.why-section-title")}
      </MText>
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
    </Flex>
  );
}
