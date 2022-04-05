import { Box, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import MButton from "../../atoms/Button";
import Sidebar from "../../layout/Sidebar";
import HeaderMenu from "../HeaderMenu";
import colors from "styles/customTheme/colors";

const Header = () => {
  const router = useRouter();
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
      top="0"
      zIndex={1000}
      bg={headerBackground}
      direction="column"
    >
      <Flex id="system-message" flexDirection="column" bg={colors.greenLight} />
      <Flex
        width="100vw"
        as="header"
        align="center"
        justifyContent="space-between"
        transition="background 0.3s ease, box-shadow 0.3s ease"
        py={[2, 4]}
        px={{ base: 4, md: "32px", lg: 160 }}
      >
        <Link href="/" passHref>
          <Image
            mt={1}
            cursor="pointer"
            src="/marinade-logo-black.svg"
            alt="Marinade Logo"
            width={[160, 200]}
            height="40px"
          />
        </Link>

        <Box display={["none", "none", "block"]}>
          <HeaderMenu />
        </Box>

        <Box mr={2}>
          <Box display={["block", "block", "none"]}>
            <Sidebar />
          </Box>
          <MButton
            display={["none", "none", "flex"]}
            size="sm"
            font="text-lg"
            rounded="md"
            bg={colors.marinadeGreen}
            _hover={{ bg: colors.green800 }}
            colorScheme={colors.marinadeGreen}
            color={colors.white}
            width="130px"
            height="40px"
            flexDirection="row"
            justifyContent="space-around"
            onClick={() => router.push("/app/staking")}
          >
            {t("indexPage.go-to-app-action")}
            <Image src="/icons/arrow-right-white.svg" width="0.8rem" />
          </MButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
