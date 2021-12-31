import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import NextLink from "next/link";

import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Flex
      bg={colors.blackMate}
      as="footer"
      aria-label="footer-section"
      py={[12, 8]}
      px={{ base: 4, md: "12vw" }}
      flexDirection="column"
    >
      <Flex flexDirection={["column", "row"]}>
        <Flex
          minWidth="300"
          pt={6}
          display="flex"
          flex={{ base: 0.33, lg: 0.56 }}
          flexDirection="column"
        >
          <NextLink href="/">
            <Image
              cursor="pointer"
              src="../../marinade-logo-white.svg"
              alt="Marinade Logo"
              width={200}
            />
          </NextLink>
          <MText
            py={6}
            type="text-xl"
            color={colors.white800}
            maxWidth={{ base: "360", md: "30vw", lg: "25vw" }}
          >
            {t("indexPage.footer-description")}
          </MText>
        </Flex>

        <Flex
          pt={6}
          pb={[8, 0]}
          flex={{ base: 0.33, lg: 0.24 }}
          flexDirection="column"
        >
          <MText pb={2} type="text-2xl" color={colors.white} fontWeight="800">
            {t("appPage.footer-join-us")}
          </MText>

          <Flex flexDirection="row" pt={2}>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://discord.com/invite/6EtUf4Euu6"
            >
              <Image
                cursor="pointer"
                src="../../discord.svg"
                alt="Discord Logo"
                width={[50, 30]}
              />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              marginLeft={[16, 4]}
              marginRight={[16, 4]}
              href="https://medium.com/marinade-finance"
            >
              <Image
                cursor="pointer"
                src="../../medium.svg"
                alt="Medium Logo"
                width={[50, 30]}
              />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/MarinadeFinance"
            >
              <Image
                cursor="pointer"
                src="../../twitter.svg"
                alt="Twitter Logo"
                width={[50, 30]}
              />
            </Link>
          </Flex>
        </Flex>
        <Flex py={6} flex={{ base: 0.33, lg: 0.2 }} flexDirection="column">
          <MText pb={2} type="text-2xl" color={colors.white} fontWeight="800">
            {t("appPage.footer-learn-more")}
          </MText>

          <MText type="text-xl" color={colors.white} mb={2}>
            <Link href="/">{t("indexPage.footer-docs")}</Link>
          </MText>
        </Flex>
      </Flex>

      <Box width="100%" mt={4}>
        <MText type="text-md" color={colors.white800}>
          {t("indexPage.footer-copyright")}
        </MText>
      </Box>
    </Flex>
  );
};

export default Footer;
