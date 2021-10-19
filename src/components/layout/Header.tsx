import {
  HStack,
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
import { useState, useEffect, useCallback } from "react";

import colors from "styles/customTheme/colors";

import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [onTop, setOnTop] = useState(true);
  const [first, setFirst] = useState(true);

  const checkTop = useCallback(() => {
    if (window.scrollY >= 10 && onTop) {
      setOnTop(false);
    } else if (window.scrollY < 10) {
      setOnTop(true);
    }
  }, [onTop]);

  useEffect(() => {
    if (first) {
      window.addEventListener("scroll", checkTop);
      checkTop();
      setFirst(false);
    }
  }, [first, checkTop]);

  const headerBackground = onTop ? colors.transparent : colors.greenLight;

  return (
    <Flex
      position="fixed"
      top={0}
      width="100vw"
      as="header"
      bg={headerBackground}
      display="flex"
      align="center"
      transition="background 0.3s ease, box-shadow 0.3s ease"
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

      <Box
        marginLeft={["auto", "auto", "auto"]}
        marginRight={["none", "none", "auto"]}
      >
        <Box display={["block", "block", "none"]}>
          <Sidebar />
        </Box>
        <HStack spacing={5} display={["none", "none", "flex"]}>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                rounded="md"
                variant="link"
                color="gray.900"
                fontSize="md"
                aria-label="Products dropdown"
                p={1.5}
                rightIcon={<Image src="/icons/arrow-down.svg" width="10px" />}
              >
                Product
              </MenuButton>
              <MenuList border="none" rounded="md" shadow="none">
                <MenuItem>
                  <Link href="/">Stake SOL</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">Validators</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">Receive mSOL</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">Marinade DAO</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">DeFi recipes / integrations</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                size="sm"
                fontSize="md"
                color="gray.900"
                rounded="md"
                aria-label="Learn more dropdown"
                p={1.5}
                rightIcon={<Image src="/icons/arrow-down.svg" width="10px" />}
              >
                Learn
              </MenuButton>

              <MenuList border="none" rounded="md" shadow="none">
                <MenuItem>
                  <Link href="/">Docs</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">Security</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">About us</Link>
                </MenuItem>

                <MenuItem>
                  <Link href="/">Roadmap</Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Box>

      <Button
        float="right"
        size="sm"
        rounded="md"
        bg="greenVibrant"
        colorScheme={colors.green}
        color={colors.white}
        display={["none", "none", "block"]}
        rightIcon={<Image src="/icons/arrow-right-white.svg" width="0.8rem" />}
      >
        Go to app
      </Button>

      <Box float="right" display="none">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
