import {
  Heading as ChakraHeading,
  HeadingProps,
  ChakraProps,
} from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

type Props = HeadingProps &
  ChakraProps & {
    type?: string;
  };

const selectFontSize = (type = "") => {
  const fontSize =
    {
      "heading-lg": ["32px", "40px", "55px"],
      "heading-md": ["26px", "32px", "44px"],
      "heading-sm": ["28.13px", "35.16px"],
      "heading-xsm": ["18px", "28px"],
    }[type] ?? undefined;

  return fontSize
    ? {
        fontSize,
        lineHeight: "110%",
      }
    : {};
};

const Heading = forwardRef(
  (props: Props, ref: LegacyRef<HTMLParagraphElement> | undefined) => {
    return (
      <ChakraHeading ref={ref} {...selectFontSize(props.type)} {...props} />
    );
  }
);

export default Heading;
