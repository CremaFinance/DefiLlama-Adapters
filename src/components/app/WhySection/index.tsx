import { Flex } from "@chakra-ui/layout";
import { Image, Text, Box } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const WhySection: FunctionComponent = () => {
  const { t } = useTranslation();
  const cardIndexes = Array.from({ length: 3 }, (_, i) => i);
  return (
    <Flex
      aria-label="why-section"
      direction="column"
      px={{ base: 4, md: "12vw" }}
      py={20}
      bg={colors.blackMate}
    >
      <Text
        color={colors.white800}
        textAlign="center"
        fontWeight="bold"
        fontSize={["30px", "43.95px"]}
        pb={10}
      >
        {t("mndePage.why-section.header")}
      </Text>
      <Flex
        flexDirection={["column", "column", "row"]}
        flex={1}
        justifyContent="space-between"
      >
        {cardIndexes.map((index) => {
          return (
            <Flex flexDirection="column" alignItems="center" mb={{ sm: 16 }}>
              <Image
                src={`/ilustrations/why-card-${index}.svg`}
                width={["60px", "100px"]}
                alt="Treasury"
              />
              <Text
                color={colors.white800}
                textAlign="center"
                fontWeight="bold"
                fontSize={["20px", "28px"]}
                py={6}
              >
                {t(`mndePage.why-section.cards.${index}.header`)}
              </Text>
              <Box maxWidth="278px">
                <Text
                  color={colors.white800}
                  textAlign="center"
                  fontSize="18px"
                  py={{ sm: 4 }}
                >
                  {t(`mndePage.why-section.cards.${index}.text`)}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default WhySection;
