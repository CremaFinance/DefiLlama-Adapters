import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import colors from "styles/customTheme/colors";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      py="72px"
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="hero-section"
      position="relative"
      height="100vh"
    >
      <Box
        pt={[4, "8vh"]}
        mt={[0, "4vh"]}
        pl={[0, 160]}
        position="relative"
        zIndex={10}
        textAlign={["center", "center", "left"]}
      >
        <Heading
          mt={[0, "1vh"]}
          color={colors.greenVibrant}
          fontWeight="bold"
          fontSize={["35px", "54px"]}
        >
          {t("indexPage.hero-section-title")}
        </Heading>

        <Heading
          fontSize={["35px", "54px"]}
          fontWeight="bold"
          maxWidth={[320, 480]}
          marginX={["auto", "0"]}
          mb={4}
        >
          {t("indexPage.hero-section-subtitle")}
        </Heading>

        <Text
          maxWidth={300}
          marginX={["auto", "auto", "0"]}
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
          width="200px"
          mb={[2, 4]}
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
          width={[0, "40vw"]}
          alt="Clouds and Leaves"
          position="absolute"
          top={-8}
          zIndex={3}
        />

        <Image
          position={["relative", "absolute"]}
          top={[0, "16vh"]}
          mt={[0, "8vh"]}
          src="./ilustrations/hero.svg"
          alt="Friends on beach"
          width={["136vw", "64vw"]}
          height={["40vh", "auto"]}
          zIndex={[2, 4]}
          right={0}
          transform={["scale(1.2)", "scale(1.1)"]}
        />
      </Flex>

      {/* ECOSYSTEM STATS */}
      <Box
        pl={[4, 160]}
        position="absolute"
        bottom={[4, 16]}
        display="flex"
        flexDirection={["column", "row"]}
        zIndex={5}
      >
        {[0, 1, 2].map((index) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              mr="16"
              key={`desktop-hstack-${index}`}
            >
              <Text
                fontSize={["22px", "28px"]}
                fontWeight="bold"
                color={colors.green}
              >
                {t(`indexPage.hero-section-stats.${index}.number`)}
              </Text>{" "}
              <Text fontSize={["22px", "28px"]} fontWeight="bold">
                {t(`indexPage.hero-section-stats.${index}.desc`)}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HeroSection;
