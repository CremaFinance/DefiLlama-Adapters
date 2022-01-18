import { Box, Flex, Image, Link, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../atoms/Button";
import MText from "../atoms/Text";
import colors from "styles/customTheme/colors";

const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const stakingPath = "/app/staking";

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
              src="/marinade-logo-white.svg"
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
                src="/discord.svg"
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
                src="/medium.svg"
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
                src="/twitter.svg"
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

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            onClick={() => router.push(stakingPath)}
          >
            {t("indexPage.footer-stake-sol")}
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            onClick={() =>
              router.push(
                {
                  pathname: stakingPath,
                  query: { showValidatorsModal: true },
                },
                stakingPath
              )
            }
          >
            {t("indexPage.footer-validators")}
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/marinade-protocol/system-overview/msol-token"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-msol")}
            </Link>
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/marinade-dao"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-marinde-dao")}
            </Link>
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            onClick={() => router.push("/app/defi")}
          >
            {t("indexPage.footer-defi-integration")}
          </MButton>
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

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-docs")}
            </Link>
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/marinade-protocol/security"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-security")}
            </Link>
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/#what-is-marinade"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-about-us")}
            </Link>
          </MButton>

          <MButton
            font="text-xl"
            fontWeight={500}
            variant="link"
            color={colors.white}
            bg="none"
            _hover={{ textDecoration: "underline" }}
            width="fit-content"
            mb={2}
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            <Link
              as={Link}
              target="_blank"
              href="https://docs.marinade.finance/marinade-dao/roadmap"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-roadmap")}
            </Link>
          </MButton>
        </Box>
      </Box>

      <Box width="100%" mt={6}>
        <MText type="text-md" color={colors.white800}>
          {t("indexPage.footer-copyright").replace(
            "{{year}}",
            new Date().getFullYear()
          )}
        </MText>
      </Box>
    </Flex>
  );
};

export default Footer;
