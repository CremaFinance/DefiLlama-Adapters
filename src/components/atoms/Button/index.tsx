import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

const selectVariant = (variant = "") =>
  ({
    solid: {
      size: "sm",
      rounded: "md",
      bg: "green",
      _hover: { bg: "green800" },
      colorScheme: "green",
      color: "white",
    },
    outline: {
      size: "sm",
      rounded: "md",
      variant: "outline",
      bg: "white",
      color: "green",
      _hover: { color: "green800" },
      colorScheme: "green",
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
        {...selectFontSize(props.font)}
        {...selectVariant(props.variant)}
        {...props}
        _focus={{ boxShadow: "none" }}
      />
    );
  }
);

export default Button;
