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
      px={{ base: 4, md: 10, lg: 160 }}
      pt={[12, 8]}
      pb={[24, 8]}
      flexDirection="column"
    >
      <Flex flexDirection={["column", "row"]}>
        <Flex flexDirection="column" flex={{ base: 0.33, lg: 0.56 }}>
          <Flex minWidth="300" pt={6} display="flex" flexDirection="column">
            <NextLink href="/" passHref>
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

          <Flex pb={8} flex={{ base: 0.33, lg: 0.24 }} flexDirection="column">
            <Flex flexDirection="row">
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
        </Flex>

        <Flex py={6} flex={{ base: 0.33, lg: 0.2 }} flexDirection="column">
          <MText pb={2} type="text-2xl" color={colors.white} fontWeight="800">
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
              href="https://www.coingecko.com/en/coins/marinade"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-mnde-stats")}
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
              href="https://www.coingecko.com/en/coins/marinade-staked-sol"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-msol-stats")}
            </Link>
          </MButton>
        </Flex>

        <Flex py={6} flex={{ base: 0.33, lg: 0.2 }} flexDirection="column">
          <MText pb={2} type="text-2xl" color={colors.white} fontWeight="800">
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
              href="https://marinade.finance/terms"
              _hover={{ textDecoration: "none" }}
              rel="noreferrer noopener"
              _focus={{ boxShadow: "none" }}
            >
              {t("indexPage.footer-terms")}
            </Link>
          </MButton>
        </Flex>
      </Flex>

      <Box width="100%" mt={4}>
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
