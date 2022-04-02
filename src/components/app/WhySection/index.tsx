import { Flex } from "@chakra-ui/layout";
import type { FunctionComponent } from "react";

import MHeading from "../../atoms/Heading";
import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import { useStats } from "contexts/StatsContext";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";
import { numberToShortVersion } from "utils/number-to-short-version";

const WhySection: FunctionComponent = () => {
  const { t } = useTranslation();

  const { totalTLV } = useStats();

  return (
    <Flex
      py={16}
      bg={colors.blackMate}
      as="section"
      aria-label="why-section"
      flexDirection="column"
      alignItems="stretch"
    >
      <MHeading
        textAlign="center"
        color={colors.white}
        type="heading-md"
        mt={6}
      >
        {t("mndePage.why-section.header")}
      </MHeading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "unset" }}
        marginY={4}
      >
        {[0, 1, 2].map((index) => (
          <IconWithTextBelow
            marginTop={8}
            marginX={16}
            key={`mnde-why-section-item-${index}`}
            icon={`/ilustrations/why-card-${index}.svg`}
            title={
              t(`mndePage.why-section.cards.${index}.header`)?.replace(
                "{{value}}",
                numberToShortVersion(totalTLV ?? 0, true)
              ) || ""
            }
            subtitle={t(`mndePage.why-section.cards.${index}.text`)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default WhySection;
