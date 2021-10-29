import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { IoIosMenu, IoMdArrowRoundForward } from "react-icons/io";

import MButton from "../atoms/Button";
import MLink from "../atoms/Link";
import MText from "../atoms/Text";
import colors from "styles/customTheme/colors";

function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        fontSize="3xl"
        _hover={{ bg: "none" }}
        _active={{ bg: "gray.100" }}
        rounded="md"
        variant="ghost"
        onClick={onOpen}
        aria-label="Sidebar"
        icon={<IoIosMenu />}
      />

      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colors.greenLight}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Link href="/" passHref>
              <Image
                cursor="pointer"
                src="./marinade-logo-black.svg"
                alt="Marinade Logo"
                width={[160, 200]}
              />
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <MText type="heading-xsm" mb={2}>
              {t("indexPage.product-menu-item")}
            </MText>

            <Flex flexDirection="column" mb={5}>
              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.stake-sol-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.validators-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.receive-msol-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.marinade-dao-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.defi-recipes-menu-item")}
              </MLink>
            </Flex>

            <MText type="heading-xsm" mb={2}>
              {t("indexPage.learn-menu-item")}
            </MText>

            <Flex flexDirection="column" mb={5}>
              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.docs-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.security-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.about-us-menu-item")}
              </MLink>

              <MLink href="/" font="text-xl-normal" mb={2}>
                {t("indexPage.roadmap-menu-item")}
              </MLink>
            </Flex>

            <MButton
              font="text-xl"
              size="sm"
              rounded="md"
              bg={colors.greenVibrant}
              _hover={{ bg: colors.greenVibrant800 }}
              color={colors.white}
              rightIcon={<IoMdArrowRoundForward />}
              onClick={() => router.push("/app/staking")}
            >
              {t("indexPage.go-to-app-action")}
            </MButton>
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
