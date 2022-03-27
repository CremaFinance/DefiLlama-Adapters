import { Flex, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import colors from "styles/customTheme/colors";

const MobileMenu = () => {
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
  const isStakingActive = router.pathname.includes("staking");
  const isDefiActive = router.pathname.includes("defi");
  const isMndeActive = router.pathname.includes("mnde");

  return (
    <Flex
      position="fixed"
      width="100vw"
      height="56px"
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
        flex={0.25}
        fontWeight="normal"
        font="text-2xl"
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
        flex={0.25}
        fontWeight="normal"
        font="text-2xl"
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
        flex={0.25}
        fontWeight="normal"
        font="text-2xl"
        py={isMndeActive ? "6px" : "9px"}
        mb={isMndeActive ? 0 : "3px"}
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
        flex={0.25}
        fontWeight="normal"
        font="text-2xl"
        _active={{}}
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
  );
};

export default MobileMenu;
