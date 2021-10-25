import {
  HStack,
  Image,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import Sidebar from "../../layout/Sidebar";
import colors from "styles/customTheme/colors";

const Header = () => {
  const { t } = useTranslation();

  const [onTop, setOnTop] = useState(true);
  const [first, setFirst] = useState(true);

  const checkTop = useCallback(() => {
    if (window.scrollY >= 10 && onTop) {
      setOnTop(false);
    } else if (window.scrollY < 10) {
      setOnTop(true);
    }
  }, [onTop]);

  useEffect(() => {
    if (first) {
      window.addEventListener("scroll", checkTop);
      checkTop();
      setFirst(false);
    }
  }, [first, checkTop]);

  const headerBackground = onTop ? colors.transparent : colors.greenLight;

  return (
    <Flex
      position="fixed"
      width="100vw"
      as="header"
      bg={headerBackground}
      align="center"
      justifyContent="space-between"
      transition="background 0.3s ease, box-shadow 0.3s ease"
      py={[2, 4]}
      zIndex={1000}
      px={{ base: 4, md: "40px", lg: 160 }}
    >
      <Link href="/" passHref>
        <Image
          cursor="pointer"
          src="./marinade-logo-black.svg"
          alt="Marinade Logo"
          width={[160, 200]}
        />
      </Link>

      <Box mt={2} mr={4}>
        <Box display={["block", "block", "none"]}>
          <Sidebar />
        </Box>
        <HStack spacing={4} display={["none", "none", "flex"]}>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              rounded="md"
              variant="link"
              color="gray.900"
              fontSize="md"
              aria-label="Products dropdown"
              p={1.5}
              rightIcon={<Image src="/icons/arrow-down.svg" width="10px" />}
            >
              {t("indexPage.product-menu-item")}
            </MenuButton>
            <MenuList border="none" rounded="md" shadow="none">
              <MenuItem>
                <Link href="/">{t("indexPage.stake-sol-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.validators-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.receive-msol-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.marinade-dao-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.defi-recipes-menu-item")}</Link>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="link"
              size="sm"
              fontSize="md"
              color="gray.900"
              rounded="md"
              aria-label="Learn more dropdown"
              p={1.5}
              rightIcon={<Image src="/icons/arrow-down.svg" width="10px" />}
            >
              {t("indexPage.learn-menu-item")}
            </MenuButton>

            <MenuList border="none" rounded="md" shadow="none">
              <MenuItem>
                <Link href="/">{t("indexPage.docs-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.security-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.about-us-menu-item")}</Link>
              </MenuItem>

              <MenuItem>
                <Link href="/">{t("indexPage.roadmap-menu-item")}</Link>
              </MenuItem>
            </MenuList>
          </Menu>
          <Link href="/app/staking" passHref>
            <Button
              size="sm"
              rounded="md"
              bg={colors.green}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.green}
              color={colors.white}
              display={["none", "block"]}
              rightIcon={
                <Image src="/icons/arrow-right-white.svg" width="0.8rem" />
              }
            >
              {t("indexPage.go-to-app-action")}
            </Button>
          </Link>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
