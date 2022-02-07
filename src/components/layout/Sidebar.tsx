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
import MHeading from "../atoms/Heading";
import MLink from "../atoms/Link";
import colors from "styles/customTheme/colors";

function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stakingPath = "/app/staking";

  return (
    <>
      <IconButton
        fontSize="3xl"
        _hover={{ bg: "none" }}
        _active={{ bg: "gray.100" }}
        _focus={{ boxShadow: "none" }}
        rounded="md"
        variant="ghost"
        onClick={onOpen}
        aria-label="Sidebar"
        icon={<IoIosMenu />}
      />

      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={colors.greenLight}>
          <DrawerCloseButton _focus={{ boxShadow: "none" }} />
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
            <MHeading type="heading-xsm" mb={2}>
              {t("indexPage.product-menu-item")}
            </MHeading>

            <Flex flexDirection="column" mb={5}>
              <MLink
                font="text-xl"
                fontWeight="normal"
                mb={2}
                onClick={() => router.push(stakingPath)}
              >
                {t("indexPage.stake-sol-menu-item")}
              </MLink>

              <MLink
                font="text-xl"
                fontWeight="normal"
                mb={2}
                _focus={{ boxShadow: "none" }}
                onClick={() =>
                  router.push(
                    {
                      pathname: stakingPath,
                      query: { showValidatorsModal: true },
                    },
                    stakingPath
                  )
                }
              >
                {t("indexPage.validators-menu-item")}
              </MLink>

              <MLink
                font="text-xl"
                fontWeight="normal"
                mb={2}
                _focus={{ boxShadow: "none" }}
                onClick={() => router.push(stakingPath)}
              >
                {t("indexPage.receive-msol-menu-item")}
              </MLink>

              <MLink
                href="https://docs.marinade.finance/marinade-dao"
                font="text-xl"
                fontWeight="normal"
                mb={2}
                _focus={{ boxShadow: "none" }}
              >
                {t("indexPage.marinade-dao-menu-item")}
              </MLink>

              <MLink
                font="text-xl"
                fontWeight="normal"
                mb={2}
                _focus={{ boxShadow: "none" }}
                onClick={() => router.push("/app/defi")}
              >
                {t("indexPage.defi-recipes-menu-item")}
              </MLink>
            </Flex>

            <MHeading type="heading-xsm" mb={2}>
              {t("indexPage.learn-menu-item")}
            </MHeading>

            <Flex flexDirection="column" mb={5}>
              <MLink
                href="https://docs.marinade.finance/"
                font="text-xl"
                fontWeight="normal"
                _focus={{ boxShadow: "none" }}
                mb={2}
              >
                {t("indexPage.docs-menu-item")}
              </MLink>

              <MLink
                href="https://docs.marinade.finance/marinade-protocol/security"
                font="text-xl"
                fontWeight="normal"
                _focus={{ boxShadow: "none" }}
                mb={2}
              >
                {t("indexPage.security-menu-item")}
              </MLink>

              <MLink
                href="https://docs.marinade.finance/#what-is-marinade"
                font="text-xl"
                fontWeight="normal"
                _focus={{ boxShadow: "none" }}
                mb={2}
              >
                {t("indexPage.about-us-menu-item")}
              </MLink>

              <MLink
                href="https://docs.marinade.finance/marinade-dao/roadmap"
                font="text-xl"
                fontWeight="normal"
                _focus={{ boxShadow: "none" }}
                mb={2}
              >
                {t("indexPage.roadmap-menu-item")}
              </MLink>
            </Flex>

            <MButton
              font="text-xl"
              size="sm"
              rounded="md"
              bg={colors.marinadeGreen}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.marinadeGreen}
              color={colors.white}
              rightIcon={<IoMdArrowRoundForward />}
              onClick={() => router.push(stakingPath)}
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
