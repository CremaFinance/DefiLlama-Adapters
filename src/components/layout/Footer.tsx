import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

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
          <Link href="/">
            <Image
              cursor="pointer"
              src="./marinade-logo-white.svg"
              alt="Marinade Logo"
              width={200}
            />
          </Link>
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
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-stake-sol")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-validators")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-receive-msol")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-marinde-dao")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-defi-recipes-integration")}
            </Text>
          </Link>
        </Box>
        <Box pt="8" pb="8" display="flex" flex="0.25" flexDirection="column">
          <Heading pb="4" size="md" maxW="600" color="white" fontWeight="800">
            {t("footer-learn")}
          </Heading>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-docs")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-security")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-about-us")}
            </Text>
          </Link>
          <Link pb="2" href="/">
            <Text fontSize="sm" color="white">
              {t("footer-roadmap")}
            </Text>
          </Link>
        </Box>
      </Box>
      <Text pb="8" fontSize="sm" color="whiteAlpha.800">
        {t("footer-copyright")}
      </Text>
    </Box>
  );
};

export default Footer;
