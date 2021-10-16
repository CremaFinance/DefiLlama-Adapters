import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import colors from "styles/customTheme/colors";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      py="72px"
      pb={[12, 12, 8]}
      bg={colors.greenLight}
      aria-label="hero-section"
      position="relative"
      height={["auto", "auto", "100vh"]}
      minHeight="640px"
    >
      <Box
        pt={[4, 4, "10vh"]}
        pl={[0, 0, 160]}
        position="relative"
        zIndex={10}
        textAlign={["center", "center", "left"]}
      >
        <Box mb={4} maxWidth={[320, 400]}>
          <Heading color={colors.greenVibrant} fontWeight="bold">
            {t("indexPage.hero-section-title")}
          </Heading>

          <Heading fontWeight="bold" margin={["0 auto", "0 auto", "0"]}>
            {t("indexPage.hero-section-subtitle")}
          </Heading>
        </Box>

        <Text
          maxWidth={300}
          margin={["0 auto", "0 auto", "0"]}
          mb={[2, 2, 4]}
          fontSize="22"
          color={colors.black}
        >
          {t("indexPage.hero-section-desc")}
        </Text>

        <Button
          bg={colors.green}
          colorScheme={colors.green}
          rounded="md"
          mb={[2, 2, 4]}
        >
          {t("indexPage.hero-section-button")}
        </Button>

        <Text fontSize="14" color="gray.500">
          6.21% APY
        </Text>
      </Box>

      <Flex width="100vw" justifyContent="flex-end">
        <Image
          src="./ilustrations/clouds-and-leaves.svg"
          width={[0, 0, "32vw"]}
          alt="Clouds and Leaves"
          position="absolute"
          top={-8}
          zIndex={3}
        />

        <Image
          display="inline-block"
          position={["relative", "relative", "absolute"]}
          top={[0, 0, "16vh"]}
          overflow="hidden"
          my={[4, 2, 0]}
          mt={[0, 0, 8]}
          src="./ilustrations/hero.svg"
          alt="Friends on beach"
          width={["100%", "72vw"]}
          zIndex={4}
        />
      </Flex>

      {/* ECOSYSTEM STATS */}
      <Box
        pl={["16px", "16px", 160]}
        position="absolute"
        bottom={16}
        display="flex"
        flexDirection={["column", "row"]}
      >
        {[0, 1, 2].map((index) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              mr="16"
              key={`desktop-hstack-${index}`}
            >
              <Heading size="md" fontWeight="bold" color={colors.green} mr={1}>
                {t(`indexPage.hero-section-stats.${index}.number`)}
              </Heading>

              <Heading size="md" fontWeight="bold">
                {t(`indexPage.hero-section-stats.${index}.desc`)}
              </Heading>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HeroSection;
