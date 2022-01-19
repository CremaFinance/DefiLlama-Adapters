import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import { useStats } from "contexts/StatsContext";
import { usePrice } from "hooks/usePrice";
import { coinSymbols } from "services/domain/coinSymbols";
import colors from "styles/customTheme/colors";
import { numberToShortVersion } from "utils/number-to-short-version";

const HeroSection = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isTallerThan700] = useMediaQuery("(min-height: 700px)");
  const { totalValidatorsCount, totalStaked, liqPoolBalance } = useStats();

  const { data } = usePrice(coinSymbols.SOL);
  const solUSD = data ? data[coinSymbols.SOL]?.usd : 0;

  const tvlUsd =
    liqPoolBalance && totalStaked && solUSD
      ? ((liqPoolBalance + totalStaked) / LAMPORTS_PER_SOL) * +solUSD
      : 0;

  return (
    <Box
      py="72px"
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="hero-section"
      position="relative"
      height={{ base: "85vh", md: "100vh" }}
      overflow="hidden"
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
      </Box>

      <Flex justifyContent="flex-end">
        <Image
          src="./ilustrations/white-clouds.svg"
          width={{ base: 0, md: "64vw", lg: "50vw" }}
          alt="Clouds and Leaves"
          position="absolute"
          top={5}
          zIndex={3}
        />

        <Image
          src="../../ilustrations/left-leaf.svg"
          width={{ base: 0, md: "24vw", lg: "16vw" }}
          alt="Left Leaf"
          position="absolute"
          right={-10}
          top={0}
          zIndex={5}
        />

        <Image
          src="../../ilustrations/right-leaf.svg"
          width={{ base: 0, md: "22vw", lg: "14vw" }}
          alt="Right Leaf"
          position="absolute"
          right={-14}
          top={0}
          zIndex={5}
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
        <Box
          display="flex"
          flexDirection="row"
          mr={{ md: 4, lg: 8 }}
          mt={{ base: 2, md: 0 }}
          key="desktop-hstack-1"
        >
          <MHeading type="heading-xsm" color={colors.marinadeGreen} mr={1}>
            {totalValidatorsCount || "--"}
          </MHeading>{" "}
          <MHeading type="heading-xsm" mr={1}>
            {t(`indexPage.hero-section-stats.validators.desc`)}
          </MHeading>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          mr={{ md: 4, lg: 8 }}
          mt={{ base: 2, md: 0 }}
          key="desktop-hstack-2"
        >
          <MHeading type="heading-xsm" color={colors.marinadeGreen} mr={1}>
            ${numberToShortVersion(tvlUsd)}
          </MHeading>{" "}
          <MHeading type="heading-xsm" mr={1}>
            {t(`indexPage.hero-section-stats.tvl.desc`)}
          </MHeading>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
