import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  fonts,
  colors,
  components: {
    Button,
  },
  config,
});

export default customTheme;
