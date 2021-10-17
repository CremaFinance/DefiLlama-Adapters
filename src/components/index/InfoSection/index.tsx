import { Box, Button, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import InfoPostItem from "components/molecules/InfoPostItem";
import colors from "styles/customTheme/colors";

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="24"
      paddingBottom={[8, 8, 0]}
      bg="greenLight"
      as="section"
      aria-label="info-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading
        alignSelf="center"
        textAlign="center"
        maxWidth="720"
        fontWeight="bold"
      >
        {t("indexPage.info-section-title")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        flexDirection={["column", "row"]}
        justifyContent="space-around"
        marginX={[8, 40]}
        marginTop={4}
      >
        {[0, 1, 2].map((index) => {
          return (
            <IconWithTextBelow
              marginTop={8}
              key={`info-item-${index}`}
              icon={`/icons/${index + 1}.svg`}
              titleColor={colors.black}
              subtitleColor={colors.black}
              title={t(`indexPage.info-section-step-items.${index}.title`)}
              subtitle={t(
                `indexPage.info-section-step-items.${index}.subtitle`
              )}
            />
          );
        })}
      </Box>
      <Box
        marginTop="4"
        marginBottom="96px"
        display="flex"
        justifyContent="center"
      >
        <Button
          bg={colors.green}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.green}
          width="200px"
          rounded="md"
        >
          {t("indexPage.info-section-action")}
        </Button>
      </Box>
      <Box marginX={[0, 160]}>
        <InfoPostItem
          titleEmphasis={t("indexPage.info-section-items.0.emphasis")}
          title={t("indexPage.info-section-items.0.heading")}
          description={t("indexPage.info-section-items.0.desc")}
          quote={t("indexPage.info-section-items.0.quote")}
          quoteAuthor={t("indexPage.info-section-items.0.name")}
          authorCompany={t("indexPage.info-section-items.0.company")}
          image="/ilustrations/how-it-works1.svg"
          imagePosition="right"
        />

        <InfoPostItem
          titleEmphasis={t("indexPage.info-section-items.1.emphasis")}
          title={t("indexPage.info-section-items.1.heading")}
          description={t("indexPage.info-section-items.1.desc")}
          quote={t("indexPage.info-section-items.1.quote")}
          quoteAuthor={t("indexPage.info-section-items.1.name")}
          authorCompany={t("indexPage.info-section-items.1.company")}
          image="/ilustrations/how-it-works2.svg"
          imagePosition="left"
          imageWidth={["100%", 720]}
          imageHeight={[280, 440]}
        />

        <InfoPostItem
          titleEmphasis={t("indexPage.info-section-items.2.emphasis")}
          title={t("indexPage.info-section-items.2.heading")}
          description={t("indexPage.info-section-items.2.desc")}
          quote={t("indexPage.info-section-items.2.quote")}
          quoteAuthor={t("indexPage.info-section-items.2.name")}
          authorCompany={t("indexPage.info-section-items.2.company")}
          image="/ilustrations/how-it-works3.svg"
          imagePosition="right"
          imageWidth={[380, 800]}
          imageHeight={[280, 540]}
          marginBottom={[4, 16]}
        />
      </Box>
    </Box>
  );
}
