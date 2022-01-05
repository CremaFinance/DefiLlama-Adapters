import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import MButton from "../../atoms/Button";
import { ConnectWallet } from "../../molecules/ConnectWallet";
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
  const [isLargerThan430] = useMediaQuery("(min-width: 430px)");
  const isStakingActive =
    !onValidatorsPage && router.pathname.includes("staking");
  const isDefiActive = !onValidatorsPage && router.pathname.includes("defi");
  const isMndeActive = !onValidatorsPage && router.pathname.includes("mnde");

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
      flexWrap={isLargerThan430 ? "nowrap" : "wrap"}
    >
      <Link href="/" passHref>
        <Box>
          <Image
            cursor="pointer"
            src="../../marinade-logo-black.svg"
            alt="Marinade Logo"
            width={200}
            height="40px"
            display={["none", "block"]}
          />
          <Image
            cursor="pointer"
            src="../../marinade-icon-black.svg"
            alt="Marinade Logo"
            width={38}
            display={["block", "none"]}
          />
        </Box>
      </Link>

      <Flex flexDirection="row" alignContent="center">
        <MButton
          variant="link"
          color={colors.black}
          rounded="none"
          isActive={isStakingActive}
          width="80px"
          fontWeight="normal"
          font="text-xl"
          mb="4px"
          py={isStakingActive ? "4px" : "7px"}
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
          isActive={isDefiActive}
          width="80px"
          fontWeight="normal"
          font="text-xl"
          mb="4px"
          py={isDefiActive ? "4px" : "7px"}
          _active={activeMenu}
          _hover={activeMenu}
          onClick={() => router.push("/app/defi")}
        >
          {t("appPage.defi-menu-item")}
        </MButton>

        <MButton
          variant="link"
          color={colors.black}
          rounded="none"
          isActive={isMndeActive}
          width="80px"
          fontWeight="normal"
          font="text-xl"
          mb="4px"
          py={isMndeActive ? "4px" : "7px"}
          _active={activeMenu}
          _hover={activeMenu}
          onClick={() => router.push("/app/mnde")}
        >
          {t("appPage.mnde-menu-item")}
        </MButton>
      </Flex>

      {!onValidatorsPage && (
        <Flex
          pt={[2, 0]}
          width={isLargerThan430 ? "160px" : "100%"}
          justifyContent="flex-end"
          pb="8px"
        >
          <ConnectWallet />
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
