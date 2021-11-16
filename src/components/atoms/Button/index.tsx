import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

import colors from "../../../styles/customTheme/colors";

const defaults = {
  size: "sm",
  rounded: "md",
  _hover: { bg: colors.green800 },
  colorScheme: colors.green,
  font: "text-lg",
};

const selectVariant = (variant = "") =>
  ({
    solid: {
      bg: colors.green,
      color: colors.white,
    },
    outline: {
      variant: "outline",
      bg: colors.white,
      color: colors.green,
      borderRadius: "8px",
    },
  }[variant] ?? {});

const selectFontSize = (fontWeight = "bold", size = "") => {
  const fontSize =
    {
      "text-xl": ["16px", "18px"],
      "text-lg": ["14px", "16px"],
      "text-md": ["12px", "14px"],
      "text-sm": ["10px", "12px"],
    }[size] ?? undefined;

  return fontSize
    ? {
        fontSize,
        fontWeight,
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
      />
    );
  }
);

export default Button;
