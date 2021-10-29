import { Box, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import NextLink from "next/link";

import MText from "../atoms/Text";
import colors from "styles/customTheme/colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      bg={colors.blackMate}
      as="footer"
      aria-label="footer-section"
      display="flex"
      py={8}
      flexDirection="column"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        px={{ base: 4, md: "40px", lg: 160 }}
        maxWidth={1200}
        width="100%"
        margin="0 auto"
      >
        <Box
          minWidth="300"
          pt="8"
          display="flex"
          flex="0.5"
          flexDirection="column"
        >
          <NextLink href="/">
            <Image
              cursor="pointer"
              src="./marinade-logo-white.svg"
              alt="Marinade Logo"
              width={200}
            />
          </NextLink>
          <MText
            pt="4"
            pb="4"
            type="text-lg"
            color="whiteAlpha.800"
            maxWidth="400"
          >
            {t("indexPage.footer-description")}
          </MText>
          <Box display="flex" flexDirection="row">
            <Link target="_blank" href="https://discord.gg/mGqZA5pjRN">
              <Image
                cursor="pointer"
                src="./discord.svg"
                alt="Discord Logo"
                width={30}
              />
            </Link>
            <Link
              target="_blank"
              marginLeft="4"
              marginRight="4"
              href="https://medium.com/marinade-finance"
            >
              <Image
                cursor="pointer"
                src="./medium.svg"
                alt="Medium Logo"
                width={30}
              />
            </Link>
            <Link target="_blank" href="https://twitter.com/MarinadeFinance">
              <Image
                cursor="pointer"
                src="./twitter.svg"
                alt="Twitter Logo"
                width={30}
              />
            </Link>
          </Box>
        </Box>

        <Box display="flex" flex={[0.1, 0.2]} />

        <Box
          minWidth={["100%", "250"]}
          pt="8"
          display="flex"
          flex="0.25"
          flexDirection="column"
        >
          <MText
            pb="4"
            type="text-xl"
            maxW="600"
            color={colors.white}
            fontWeight="800"
          >
            {t("indexPage.footer-product")}
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-stake-sol")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-validators")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-receive-msol")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-marinde-dao")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">
              {t("indexPage.footer-defi-recipes-integration")}
            </Link>
          </MText>
        </Box>
        <Box pt="8" pb="8" display="flex" flex="0.25" flexDirection="column">
          <MText
            pb="4"
            type="text-xl"
            maxW="600"
            color={colors.white}
            fontWeight="800"
          >
            {t("indexPage.footer-learn")}
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-docs")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-security")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-about-us")}</Link>
          </MText>

          <MText type="text-lg" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-roadmap")}</Link>
          </MText>
        </Box>
      </Box>

      <Box
        px={{ base: 4, md: "40px", lg: 160 }}
        maxWidth={1200}
        width="100%"
        margin="0 auto"
        mt={4}
      >
        <MText type="text-md" color="whiteAlpha.800">
          {t("indexPage.footer-copyright")}
        </MText>
      </Box>
    </Box>
  );
};

export default Footer;
