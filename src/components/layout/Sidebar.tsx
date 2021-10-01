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

import { IoIosMenu, IoMdArrowRoundForward } from "react-icons/io";
import Link from "next/link";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        fontSize="2xl"
        _hover={{ bg: "none" }}
        _active={{ bg: "gray.100" }}
        rounded="md"
        size="sm"
        variant="ghost"
        onClick={onOpen}
        aria-label="Sidebar"
        icon={<IoIosMenu />}
      />

      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#C8ECE1">
          <DrawerCloseButton />
          <DrawerHeader>
            <Link href="/">
              <Image
                cursor="pointer"
                src="./marinade-logo.png"
                alt="Marinade Logo"
                width={200}
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

            <Button
              size="sm"
              rounded="md"
              bg="#08B898"
              _hover={{ bg: "#08B898aa" }}
              color="white"
              rightIcon={<IoMdArrowRoundForward />}
            >
              Go to app
            </Button>
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
