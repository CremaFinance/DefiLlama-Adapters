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
import { useHeaderConfig } from "components/index/HeaderMenu/header.config";
import colors from "styles/customTheme/colors";

function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const config = useHeaderConfig();
  const stakingPath = "/app/staking";
  const isMndeActive = router.pathname.includes("tokens/mnde");

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
                src="/marinade-logo-black.svg"
                alt="Marinade Logo"
                width={[160, 200]}
              />
            </Link>
          </DrawerHeader>

          <DrawerBody>
            {config.map((menu) => {
              return (
                <>
                  <MHeading key={menu.title} type="heading-xsm" mb={2}>
                    {menu.title}
                  </MHeading>
                  <Flex flexDirection="column" mb={5}>
                    {menu.items.map((item) => {
                      return (
                        <MLink
                          font="text-xl"
                          fontWeight="normal"
                          mb={2}
                          textDecoration={
                            isMndeActive && item?.title === "MNDE"
                              ? "underline"
                              : "none"
                          }
                          {...item.props}
                          display="flex"
                          flexDirection="row"
                        >
                          {item.title}{" "}
                          {item?.icon && (
                            <Image ml="11px" width="12px" src={item?.icon} />
                          )}
                        </MLink>
                      );
                    })}
                  </Flex>
                </>
              );
            })}

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
