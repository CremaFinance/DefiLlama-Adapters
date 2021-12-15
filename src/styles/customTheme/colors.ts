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
const overridenChakraColors: DeepPartial<Theme["colors"]> = {
  // overrides for chakra alert status info used in toast
  blue: {
    100: "#ECFAF5",
    500: "#308D8A",
  },
  green: {
    100: "#ECFAF5",
    500: "#308D8A",
  },
  orange: {
    100: "#FDF3E6",
    500: "#EB8302",
  },
  red: {
    100: "#FDEEEB",
    500: "#E2543D",
  },
};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
  black: "#171923",
  black600: "#17192399",
  blackMate: "#242731",
  blackMate800: "#242731CC",
  greenLight: "#C8ECE1",
  greenVibrant: "#08B898",
  greenVibrant800: "#08B898CC",
  marinadeGreen: "#308D8A",
  green800: "#308D8ACC",
  marinadeLighterGreen: "#DFF4ED",
  marinadeEvenLighterGreen: "#ECFAF5",
  white: "#FFFFFF",
  white800: "#FFFFFFCC",
  lightGray: "#EDF2F7",
};

export default colors;
