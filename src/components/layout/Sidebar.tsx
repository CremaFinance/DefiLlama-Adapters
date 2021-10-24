import {
  Box,
  Heading,
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
import Link from "next/link";
import { IoIosMenu, IoMdArrowRoundForward } from "react-icons/io";

import colors from "styles/customTheme/colors";

function Sidebar() {
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
            <Heading size="sm" mb={2}>
              Product
            </Heading>

            <Box mb={5}>
              <Box mb={1}>
                <Link href="/">Stake SOL</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Validators</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Receive mSOL</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Marinade DAO</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">DeFi recipes / integrations</Link>
              </Box>
            </Box>

            <Heading size="sm" my={2}>
              Learn
            </Heading>

            <Box mb={5}>
              <Box mb={1}>
                <Link href="/">Docs</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Security</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">About us</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Roadmap</Link>
              </Box>
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
                Go to app
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
