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

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>
            <Heading size="sm" mb={2}>
              Product
            </Heading>

            <Box mb={5}>
              <Box mb={1}>
                <Link href="/">Product 1</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Product 2</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Product 3</Link>
              </Box>
            </Box>

            <Heading size="sm" my={2}>
              Learn
            </Heading>

            <Box mb={5}>
              <Box mb={1}>
                <Link href="/">Learn 1</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Learn 2</Link>
              </Box>

              <Box mb={1}>
                <Link href="/">Learn 3</Link>
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
