import {
  Box,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import Link from "next/link";
import { IoIosMenu, IoMdArrowRoundForward } from "react-icons/io";

import MText from "../atoms/Text";
import colors from "styles/customTheme/colors";

function Sidebar() {
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

            <Box mb={5}>
              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.stake-sol-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.validators-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.receive-msol-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.marinade-dao-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.defi-recipes-menu-item")}
                </MText>
              </Link>
            </Box>

            <MText type="heading-xsm" mb={2}>
              {t("indexPage.learn-menu-item")}
            </MText>

            <Box mb={5}>
              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.docs-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.security-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.about-us-menu-item")}
                </MText>
              </Link>

              <Link href="/" passHref>
                <MText type="text-xl" mb={2}>
                  {t("indexPage.roadmap-menu-item")}
                </MText>
              </Link>
            </Box>

            <Link href="/app/staking" passHref>
              <Button
                size="sm"
                rounded="md"
                bg={colors.greenVibrant}
                _hover={{ bg: colors.greenVibrant800 }}
                color={colors.white}
                rightIcon={<IoMdArrowRoundForward />}
              >
                {t("indexPage.go-to-app-action")}
              </Button>
            </Link>
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
