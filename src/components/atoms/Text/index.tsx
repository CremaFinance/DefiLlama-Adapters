import { Heading, Text as ChakraText, TextProps } from "@chakra-ui/react";

type Props = TextProps & {
  type?: string;
};

const Text = (props: Props) => {
  switch (props.type) {
    case "heading-lg":
      return (
        <Heading
          {...props}
          fontWeight="bold"
          fontSize={["32px", "40px", "55px"]}
          lineHeight={["110%"]}
        >
          {props.children}
        </Heading>
      );

    case "heading-md":
      return (
        <Heading
          {...props}
          fontSize={["26px", "32px", "44px"]}
          lineHeight={["110%"]}
        >
          {props.children}
        </Heading>
      );

    case "heading-sm":
      return (
        <Heading
          {...props}
          fontSize={["18px", "22px", "28px"]}
          lineHeight={["110%"]}
        >
          {props.children}
        </Heading>
      );

    case "text-large":
      return (
        <ChakraText
          {...props}
          fontSize={["16.5px", "18.5px", "22.5px"]}
          lineHeight={["150%"]}
        >
          {props.children}
        </ChakraText>
      );

    default:
      return (
        <ChakraText color="black" {...props}>
          {props.children}
        </ChakraText>
      );
  }
};

export default Text;
