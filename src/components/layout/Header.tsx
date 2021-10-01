import Link from "next/link";

import {
  HStack,
  useColorModeValue,
  Image,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

import { BiCaretDown } from "react-icons/bi";
import { IoMdArrowRoundForward } from "react-icons/io";

import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const bg = useColorModeValue("#C8ECE1", "#C8ECE1");

  return (
    <Flex
      position="fixed"
      top={0}
      width="100vw"
      as="header"
      bg={bg}
      align="center"
      py={3}
      zIndex={1000}
      px={5}
    >
      <Heading as="h1" size="md">
        <Link href="/">
          <Image
            cursor="pointer"
            src="./marinade-logo.png"
            alt="Marinade Logo"
            width={200}
          />
        </Link>
      </Heading>

      <Box marginLeft="auto">
        <Box display={["block", "block", "none"]}>
          <Sidebar />
        </Box>
        <HStack spacing={4} display={["none", "none", "flex"]}>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                rounded="md"
                variant="link"
                color="gray.900"
                p={1.5}
                rightIcon={<BiCaretDown />}
              >
                Product
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="link"
                color="gray.900"
                rounded="md"
                p={1.5}
                rightIcon={<BiCaretDown />}
              >
                Learn
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box>
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
          </Box>
        </HStack>
      </Box>

      <Box float="right" display="none">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
