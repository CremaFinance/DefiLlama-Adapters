import type { ChakraProps, TextProps } from "@chakra-ui/react";
import { Text as ChakraText } from "@chakra-ui/react";
import type { LegacyRef } from "react";
import { forwardRef } from "react";

type Props = TextProps &
  ChakraProps & {
    type?: string;
  };

const selectFontSize = (type = "") => {
  const fontSize =
    {
      "text-2xl": ["18px", "22.5px"],
      "text-xl": ["16px", "18px"],
      "text-lg": ["14px", "16px"],
      "text-md": ["12px", "14px"],
      "text-sm": ["10px", "12px"],
    }[type] ?? undefined;

  return fontSize
    ? {
        fontSize,
        lineHeight: "150%",
      }
    : {};
};

const Text = forwardRef(
  (props: Props, ref: LegacyRef<HTMLParagraphElement> | undefined) => {
    return <ChakraText ref={ref} {...selectFontSize(props.type)} {...props} />;
  }
);

export default Text;
