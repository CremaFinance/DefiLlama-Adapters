import { Box, Button, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

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

  const activeMenu = {
    display: "inline-block",
    opacity: 1,
    borderBottom: `3px solid`,
    borderColor: colors.green,
    color: colors.green,
    fontWeight: "bold",
    mb: 0,
  };

  const router = useRouter();
  const isStakingActive = router.pathname.includes("staking");
  const [isLargerThan430] = useMediaQuery("(min-width: 430px)");

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
      px={{ base: 4, md: "12vw" }}
    >
      <Link href="/" passHref>
        <Box pb="8px">
          <Box display={["none", "block"]}>
            <Image
              cursor="pointer"
              src="../../marinade-logo-black.svg"
              alt="Marinade Logo"
              width={200}
            />
          </Box>
          <Box display={["block", "none"]}>
            <Image
              cursor="pointer"
              src="../../marinade-icon-black.svg"
              alt="Marinade Logo"
              width={38}
            />
          </Box>
        </Box>
      </Link>

      <Flex flexDirection="row" alignContent="center">
        <Link href="/app/staking" passHref>
          <Button
            variant="link"
            color={colors.black}
            rounded="none"
            isActive={isStakingActive}
            width="80px"
            fontWeight="normal"
            mb="4px"
            py={isStakingActive ? "4px" : "7px"}
            _active={activeMenu}
            _hover={activeMenu}
          >
            {t("appPage.stake-menu-item")}
          </Button>
        </Link>

        <Link href="/app/defi" passHref>
          <Button
            variant="link"
            color={colors.black}
            rounded="none"
            isActive={!isStakingActive}
            width="107px"
            fontWeight="normal"
            mb="4px"
            py={!isStakingActive ? "4px" : "7px"}
            _active={activeMenu}
            _hover={activeMenu}
          >
            {t("appPage.use-msol-menu-item")}
          </Button>
        </Link>
      </Flex>

      <Box pb="8px">
        <Button
          size="sm"
          rounded="md"
          bg={colors.green}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.green}
          color={colors.white}
          display="flex"
          leftIcon={<Image src="/icons/wallet.svg" width="0.8rem" />}
          rightIcon={<Image src="/icons/expand-more.svg" width="0.5rem" />}
        >
          {isLargerThan430 ? t("appPage.connect-wallet") : ""}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
