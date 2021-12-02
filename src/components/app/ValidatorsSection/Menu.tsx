import { Box } from "@chakra-ui/react";

import MText from "../../atoms/Text";

interface Props {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  MENUS: string[];
}

const Menu = ({ selectedMenu, setSelectedMenu, MENUS }: Props) => {
  return (
    <Box display={{ base: "None", lg: "flex" }}>
      {MENUS.map((menu) => (
        <Box height="10px">
          {menu === selectedMenu ? (
            <Box
              cursor="pointer"
              px="16px"
              borderBottom="3px solid #308d8a"
              transition="ease-in"
              transitionDuration="0.1s"
            >
              <MText fontSize="18px" fontWeight="bold" color="#308d8a">
                {menu}
              </MText>
            </Box>
          ) : (
            <Box
              cursor="pointer"
              px="16px"
              onClick={() => setSelectedMenu(menu)}
            >
              <MText fontSize="18px" color="#4A5568">
                {menu}
              </MText>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Menu;
