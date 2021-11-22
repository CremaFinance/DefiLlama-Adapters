import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const HeroSection = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isTallerThan700] = useMediaQuery("(min-height: 700px)");

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
        pl={{ sm: 4, md: "40px", lg: 160 }}
        position="relative"
        zIndex={10}
        textAlign={["center", "left"]}
      >
        <MHeading type="heading-lg" mt={[0, "1vh"]} color={colors.greenVibrant}>
          {t("indexPage.hero-section-title")}
        </MHeading>

        <MHeading
          type="heading-lg"
          mb={[4, 6]}
          marginX={["auto", "0"]}
          maxWidth={[320, 480]}
        >
          {t("indexPage.hero-section-subtitle")}
        </MHeading>

        <MText
          type="text-2xl"
          mb={4}
          maxWidth={[264, 380]}
          color={colors.black}
          marginX={["auto", "0"]}
        >
          {t("indexPage.hero-section-desc")}
        </MText>

        <MButton
          bg={colors.marinadeGreen}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.marinadeGreen}
          rounded="md"
          width="200px"
          height="48px"
          font="text-xl"
          mb={[2, 4]}
          onClick={() => router.push("/app/staking")}
        >
          {t("indexPage.hero-section-button")}
        </MButton>

        <MText type="text-xl" fontWeight="bold" color={colors.blackMate800}>
          6.21% APY
        </MText>
      </Box>

      <Flex justifyContent="flex-end">
        <Image
          src="./ilustrations/clouds-and-leaves.svg"
          width={{ base: 0, md: "64vw", lg: "40vw", "2xl": "32vw" }}
          alt="Clouds and Leaves"
          position="absolute"
          top={-8}
          zIndex={3}
        />

        <Image
          position="absolute"
          bottom={{ base: isTallerThan700 ? "8vh" : "64px", lg: "4vh" }}
          src="./ilustrations/hero.svg"
          alt="Friends on beach"
          objectFit={["cover", "fill"]}
          width={{ base: "auto", md: "96vw", lg: "72vw", "2xl": "64vw" }}
          minWidth={{ base: isTallerThan700 ? "520px" : "160px" }}
          zIndex={[2, 4]}
        />
      </Flex>

      {/* ECOSYSTEM STATS */}
      <Box
        pl={{ base: 4, md: "40px", lg: 168 }}
        position="absolute"
        bottom={[4, 16]}
        display="flex"
        flexDirection={["column", "row"]}
        flexWrap="wrap"
        zIndex={5}
      >
        {[0, 1, 2].map((index) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              mr={{ md: 4, lg: 8 }}
              mt={{ base: 2, md: 0 }}
              key={`desktop-hstack-${index}`}
            >
              <MHeading type="heading-xsm" color={colors.marinadeGreen} mr={1}>
                {t(`indexPage.hero-section-stats.${index}.number`)}
              </MHeading>{" "}
              <MHeading type="heading-xsm" mr={1}>
                {t(`indexPage.hero-section-stats.${index}.desc`)}
              </MHeading>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HeroSection;
