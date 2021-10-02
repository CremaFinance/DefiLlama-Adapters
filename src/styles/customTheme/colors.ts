import { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  brand: {
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
  greenLight: "#C8ECE1",
  greenVibrant: "#08B898",
  green: "#308D8A",
  black: "#171923",
};

export default colors;
