import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import { ConnectWallet } from "../../molecules/ConnectWallet";
import colors from "styles/customTheme/colors";

interface Props {
  onValidatorsPage?: boolean;
}

const Header = ({ onValidatorsPage = false }: Props) => {
  const { t } = useTranslation();

  const headerBackground = colors.greenLight;

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
  const isStakingActive =
    !onValidatorsPage && router.pathname.includes("staking");
  const isDefiActive = !onValidatorsPage && router.pathname.includes("defi");
  const isMndeActive = !onValidatorsPage && router.pathname.includes("mnde");

  return (
    <Flex
      position="fixed"
      top="0"
      zIndex={1000}
      bg={headerBackground}
      direction="column"
    >
      <Flex id="system-message" flexDirection="column" />
      <Flex
        width="100vw"
        as="header"
        bg={headerBackground}
        align="center"
        justifyContent="space-between"
        transition="background 0.3s ease, box-shadow 0.3s ease"
        py={[0, 4]}
        pt="14px"
        px={{ base: 4, md: "32px", lg: 160 }}
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
              width="36px"
              display={["block", "none"]}
            />
          </Box>
        </Link>

        <Flex
          flexDirection="row"
          alignContent="center"
          display={["none", "flex"]}
        >
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

          <MButton
            variant="link"
            color={colors.black}
            rounded="none"
            isActive={false}
            width="80px"
            fontWeight="normal"
            font="text-xl"
            mb="4px"
            py="7px"
            _active={{}}
            _focus={{}}
            _hover={activeMenu}
            onClick={() =>
              window.open("https://vote.marinade.finance/gov/mnde", "_blank")
            }
            rightIcon={
              <Icon
                as={FiExternalLink}
                width="16px"
                height="16px"
                cursor="pointer"
              />
            }
          >
            {t("appPage.vote-menu-item")}
          </MButton>
        </Flex>

        <Flex pt={[2, 0]} justifyContent="flex-end" pb="8px">
          <ConnectWallet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
