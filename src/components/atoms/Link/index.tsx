import type { LinkProps, ChakraProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import type { LegacyRef } from "react";
import { forwardRef } from "react";

type Props = ChakraProps &
  LinkProps & {
    font?: string;
  };

const selectFontSize = (size = "") => {
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
        fontWeight: "bold",
      }
    : {};
};

const Link = forwardRef(
  (props: Props, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
    return <ChakraLink ref={ref} {...selectFontSize(props.font)} {...props} />;
  }
);

export default Link;
