import {
  Box,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import MText from "../../atoms/Text/index";

interface Props {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  MENUS: string[];
}

const MobileMenu = ({ selectedMenu, setSelectedMenu, MENUS }: Props) => {
  return (
    <Box display={{ base: "flex", lg: "None" }}>
      <Menu>
        <MenuButton
          variant="unstyled"
          as={Button}
          border="1px solid #E2E8F0"
          borderRadius="6px"
          width="160px"
          height="40px"
          rightIcon={
            <Box position="relative" right="10px">
              <BsChevronDown />
            </Box>
          }
          fontSize="16px"
          fontWeight="normal"
          fontFamily="Maven Pro"
          display="flex"
        >
          <MText>{selectedMenu}</MText>
        </MenuButton>
        <MenuList>
          {MENUS.filter((menu) => menu !== selectedMenu).map((menu) => (
            <MenuItem onClick={() => setSelectedMenu(menu)}>{menu}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MobileMenu;
