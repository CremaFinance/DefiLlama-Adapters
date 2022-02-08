import { Flex } from "@chakra-ui/layout";
import { Image, Text, Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const WhySection: FunctionComponent = () => {
  const { t } = useTranslation();
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
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/treasury.svg"
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
            {t("mndePage.why-section.cards.0.header")}
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              {t("mndePage.why-section.cards.0.text")}
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/sol-delegation.svg"
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
            {t("mndePage.why-section.cards.1.header")}
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              {t("mndePage.why-section.cards.1.text")}
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/exec-team.svg"
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
            {t("mndePage.why-section.cards.2.header")}
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              {t("mndePage.why-section.cards.2.text")}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WhySection;
