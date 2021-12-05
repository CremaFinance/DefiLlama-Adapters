import { Box, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import MButton from "../../atoms/Button";
import { Wallet } from "../../molecules/Wallet";
import colors from "styles/customTheme/colors";

interface Props {
  onValidatorsPage?: boolean;
}

const Header = ({ onValidatorsPage = false }: Props) => {
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
    borderColor: colors.marinadeGreen,
    color: colors.marinadeGreen,
    fontWeight: "bold",
    mb: 0,
  };

  const router = useRouter();
  const isStakingActive = router.pathname.includes("staking");

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
        <MButton
          variant="link"
          color={colors.black}
          rounded="none"
          isActive={!onValidatorsPage && isStakingActive}
          width="80px"
          fontWeight="normal"
          font="text-xl"
          mb="4px"
          py={!onValidatorsPage && isStakingActive ? "4px" : "7px"}
          _active={activeMenu}
          _hover={activeMenu}
          onClick={() => router.push("/app/staking")}
        >
          {t("appPage.stake-menu-item")}
        </MButton>

        <MButton
          variant="link"
          color={colors.black}
          rounded="none"
          isActive={!onValidatorsPage && !isStakingActive}
          width="107px"
          fontWeight="normal"
          font="text-xl"
          mb="4px"
          py={!onValidatorsPage && !isStakingActive ? "4px" : "7px"}
          _active={activeMenu}
          _hover={activeMenu}
          onClick={() => router.push("/app/defi")}
        >
          {t("appPage.use-msol-menu-item")}
        </MButton>
      </Flex>

      {!onValidatorsPage && (
        <Box pb="8px">
          <Wallet />
        </Box>
      )}
    </Flex>
  );
};

export default Header;
