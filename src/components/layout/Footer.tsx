import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

const Footer = () => {
  const { t } = useTranslation("index");

  return (
    <Box
      bg="#242731"
      as="footer"
      aria-label="footer-section"
      display="flex"
      px={[5, 5, 10]}
      flexDirection="column"
    >
      <Box display="flex" flexWrap="wrap">
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
          <Text
            pt="4"
            pb="4"
            fontSize="md"
            color="whiteAlpha.800"
            maxWidth="400"
          >
            Marinade.finance is a liquid staking protocol built on Solana
            blockchain.
          </Text>
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
        <Box
          minWidth="300"
          pt="8"
          display="flex"
          flex="0.25"
          flexDirection="column"
        >
          <Heading pb="4" size="md" maxW="600" color="white" fontWeight="800">
            {t("footer-product")}
          </Heading>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-stake-sol")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-validators")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-receive-msol")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-marinde-dao")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-defi-recipes-integration")}</NextLink>
          </Text>
        </Box>
        <Box pt="8" pb="8" display="flex" flex="0.25" flexDirection="column">
          <Heading pb="4" size="md" maxW="600" color="white" fontWeight="800">
            {t("footer-learn")}
          </Heading>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-docs")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-security")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-about-us")}</NextLink>
          </Text>

          <Text fontSize="sm" color="white" mb={2}>
            <NextLink href="/">{t("footer-roadmap")}</NextLink>
          </Text>
        </Box>
      </Box>
      <Text pb="8" fontSize="sm" color="whiteAlpha.800">
        {t("footer-copyright")}
      </Text>
    </Box>
  );
};

export default Footer;
