import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import NextLink from "next/link";

import MText from "../atoms/Text";
import colors from "styles/customTheme/colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Flex
      bg={colors.blackMate}
      as="footer"
      aria-label="footer-section"
      py={8}
      px={{ base: 4, md: "40px", lg: 168 }}
      flexDirection="column"
    >
      <Box display="flex" flexWrap="wrap">
        <Box
          minWidth="300"
          pt={8}
          pb={[6, 0]}
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
          <MText py={6} type="text-xl" color={colors.white800}>
            {t("indexPage.footer-description")}
          </MText>
          <Box display="flex" flexDirection="row">
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://discord.com/invite/6EtUf4Euu6"
            >
              <Image
                cursor="pointer"
                src="./discord.svg"
                alt="Discord Logo"
                width={30}
              />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer noopener"
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
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/MarinadeFinance"
            >
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
          pt={8}
          display="flex"
          flex="0.25"
          flexDirection="column"
        >
          <MText
            pb={2}
            type="text-2xl"
            maxW="600"
            color={colors.white}
            fontWeight="800"
          >
            {t("indexPage.footer-product")}
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-stake-sol")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-validators")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-receive-msol")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-marinde-dao")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">
              {t("indexPage.footer-defi-recipes-integration")}
            </Link>
          </MText>
        </Box>
        <Box py={8} display="flex" flex="0.25" flexDirection="column">
          <MText
            pb={2}
            type="text-2xl"
            maxW="600"
            color={colors.white}
            fontWeight="800"
          >
            {t("indexPage.footer-learn")}
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-docs")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-security")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-about-us")}</Link>
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-roadmap")}</Link>
          </MText>
        </Box>
      </Box>

      <Box width="100%" mt={6}>
        <MText type="text-md" color={colors.white800}>
          {t("indexPage.footer-copyright")}
        </MText>
      </Box>
    </Flex>
  );
};

export default Footer;
