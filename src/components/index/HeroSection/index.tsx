import { HStack, Button, Image, Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      py="72px"
      pb={[12, 12, 8]}
      bg="#C8ECE1"
      position="relative"
      height={["auto", "auto", "100vh"]}
      minHeight="650px"
    >
      <Box
        pt={[5, 5, "10vh"]}
        pl={[0, 0, 10]}
        position="relative"
        zIndex={10}
        textAlign={["center", "center", "left"]}
      >
        <Box mb={[2, 2, 4]}>
          <Heading color="#08B898" fontWeight="bold">
            {t("indexPage.hero-section-title")}
          </Heading>

          <Heading
            fontWeight="bold"
            maxWidth={300}
            margin={["0 auto", "0 auto", "0"]}
          >
            {t("indexPage.hero-section-subtitle")}
          </Heading>
        </Box>

        <Box maxWidth={300} margin={["0 auto", "0 auto", "0"]} mb={[2, 2, 4]}>
          <Box>{t("indexPage.hero-section-desc")}</Box>
        </Box>

        <Box mb={[2, 2, 4]}>
          <Button bg="green" colorScheme="green" rounded="md">
            {t("indexPage.hero-section-button")}
          </Button>
        </Box>

        <Box fontSize="sm" color="gray.500">
          6.21% APY
        </Box>
      </Box>

      {/* CLOUD AND LEAVES IMAGE */}
      <Box display={["none", "none", "block"]}>
        <Image
          src="./cloud-leaves.png"
          width={[0, 0, 350, "420px"]}
          alt="Clouds and Leaves"
          position="absolute"
          top="0"
          right={0}
          zIndex={3}
        />
      </Box>

      {/* BEACH PARTY IMAGE */}
      <Box
        position={["relative", "relative", "absolute"]}
        top={[0, 0, "10vh", "10vh"]}
        overflow="hidden"
        textAlign="center"
        right={0}
        my={[4, 2, 0]}
      >
        <Image
          display="inline-block"
          position="relative"
          mt={[0, 0, 24, 10]}
          src="./beach-party.png"
          alt="Friends on beach"
          width={["100%", "100%", 600, "800px"]}
        />
      </Box>

      {/* MOBILE LAYOUT */}
      <Box
        fontSize="lg"
        px={5}
        display={["block", "block", "none"]}
        textAlign="center"
      >
        {[0, 1, 2].map((index) => {
          return (
            <Box key={`mobile-layout-${index}`}>
              <Box
                fontWeight="bold"
                display="inline-block"
                color="green"
                fontSize={["xl", "2xl"]}
                mr={2}
              >
                {t(`indexPage.hero-section-stats.${index}.number`)}
              </Box>

              <Box
                fontSize={["xl", "2xl"]}
                fontWeight="bold"
                display="inline-block"
              >
                {t(`indexPage.hero-section-stats.${index}.desc`)}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* DESKTOP LAYOUT */}
      <Box
        pl={10}
        position="absolute"
        bottom={12}
        display={["none", "none", "block"]}
      >
        <HStack spacing={8}>
          {[0, 1, 2].map((index) => {
            return (
              <HStack fontSize="lg" key={`desktop-hstack-${index}`}>
                <Heading size="md" fontWeight="bold" color="green">
                  {t(`indexPage.hero-section-stats.${index}.number`)}
                </Heading>

                <Heading size="md" fontWeight="bold">
                  {t(`indexPage.hero-section-stats.${index}.desc`)}
                </Heading>
              </HStack>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default HeroSection;
