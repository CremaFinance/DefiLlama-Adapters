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
import Link from "next/link";
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
      px={[5, 5, 10]}
    >
      <Heading as="h1" size="md">
        <Link href="/" passHref>
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
              <MenuList bg="#C8ECE1" border="none" rounded="md" shadow="none">
                <MenuItem bg="none" _hover={{ bg: "none" }}>
                  <Link href="/">Stake SOL</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Validators</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Receive mSOL</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Marinade DAO</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">DeFi recipes / integrations</Link>
                </MenuItem>
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
              <MenuList bg="#C8ECE1" border="none" rounded="md" shadow="none">
                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Docs</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Security</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">About us</Link>
                </MenuItem>

                <MenuItem _hover={{ bg: "none" }}>
                  <Link href="/">Roadmap</Link>
                </MenuItem>
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
