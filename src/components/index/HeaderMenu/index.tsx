import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";

import colors from "styles/customTheme/colors";

import { useHeaderConfig } from "./header.config";

const HeaderMenu = () => {
  const config = useHeaderConfig();

  return (
    <Flex>
      {config.map((menu) => {
        return (
          <Menu key={menu.title} autoSelect={false}>
            <MenuButton
              as={Button}
              color={colors.black}
              backgroundColor="transparent"
              rightIcon={<Image src="/icons/arrow-down-black-fill.svg" />}
              _hover={{
                background: "gray.100",
                borderRadius: "6px",
              }}
              _focus={{ outline: "none" }}
              _active={{
                background: "transparent",
              }}
            >
              {menu.title}
            </MenuButton>
            <MenuList>
              {menu.items.map((item) => {
                return (
                  <MenuItem
                    key={item.title}
                    {...item?.props}
                    backgroundColor={
                      item?.title === "MNDE" ? "gray.100" : "white"
                    }
                  >
                    <>
                      {item.title}{" "}
                      {item?.icon && (
                        <Image ml="11px" width="12px" src={item?.icon} />
                      )}
                    </>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        );
      })}
    </Flex>
  );
};

export default HeaderMenu;
