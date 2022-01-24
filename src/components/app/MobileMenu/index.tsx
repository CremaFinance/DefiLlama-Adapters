import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";

import MButton from "../../atoms/Button";
import colors from "styles/customTheme/colors";

interface Props {
  onValidatorsPage?: boolean;
}

const MobileMenu = ({ onValidatorsPage = false }: Props) => {
  const { t } = useTranslation();

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
      width="100vw"
      bottom="0"
      bg="white"
      display={["flex", "none"]}
      zIndex={1010}
      border="1px solid"
      borderColor={colors.lightGray}
      roundedTop="md"
    >
      <MButton
        variant="link"
        color={colors.black}
        rounded="none"
        isActive={isStakingActive}
        flex={0.33}
        fontWeight="normal"
        font="text-lg"
        py={isStakingActive ? "6px" : "9px"}
        mb={isStakingActive ? 0 : "3px"}
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
        flex={0.33}
        fontWeight="normal"
        font="text-lg"
        py={isDefiActive ? "6px" : "9px"}
        mb={isDefiActive ? 0 : "3px"}
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
        flex={0.33}
        fontWeight="normal"
        font="text-lg"
        py={isMndeActive ? "6px" : "9px"}
        mb={isMndeActive ? 0 : "3px"}
        _active={activeMenu}
        _hover={activeMenu}
        onClick={() => router.push("/app/mnde")}
      >
        {t("appPage.mnde-menu-item")}
      </MButton>
    </Flex>
  );
};

export default MobileMenu;
