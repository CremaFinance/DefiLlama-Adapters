import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

import colors from "../../../styles/customTheme/colors";

const defaults = {
  size: "sm",
  rounded: "md",
  _hover: { bg: colors.green800 },
  colorScheme: colors.marinadeGreen,
  font: "text-lg",
};

const selectVariant = (variant = "") =>
  ({
    solid: {
      bg: colors.marinadeGreen,
      color: colors.white,
    },
    outline: {
      variant: "outline",
      bg: colors.white,
      color: colors.marinadeGreen,
      borderRadius: "8px",
    },
    "big-solid": {
      size: "lg",
      rounded: "md",
      bg: "green",
      _hover: { bg: "green800" },
      colorScheme: "green",
      color: "white",
    },
  }[variant] ?? {});

const selectFontSize = (font = "") => {
  const fontSize =
    {
      "text-xl": ["16px", "18px"],
      "text-lg": ["14px", "16px"],
      "text-md": ["12px", "14px"],
      "text-sm": ["10px", "12px"],
    }[font] ?? undefined;

  return fontSize
    ? {
        fontSize,
        fontWeight: "bold",
      }
    : {};
};

type Props = ButtonProps & {
  font?: string;
};

const Button = forwardRef(
  (props: Props, ref: LegacyRef<HTMLButtonElement> | undefined) => {
    return (
      <ChakraButton
        ref={ref}
        {...defaults}
        {...selectFontSize(props.font)}
        {...selectVariant(props.variant)}
        {...props}
        _focus={{ boxShadow: "none" }}
      />
    );
  }
);

export default Button;
