import {
  ChakraProps,
  Heading,
  Text as ChakraText,
  TextProps,
} from "@chakra-ui/react";

type Props = TextProps &
  ChakraProps & {
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
          fontSize={["28.13px", "35.16px"]}
          lineHeight={["110%"]}
        >
          {props.children}
        </Heading>
      );

    case "heading-xsm":
      return (
        <Heading {...props} fontSize={["18px", "28px"]} lineHeight={["110%"]}>
          {props.children}
        </Heading>
      );

    case "text-2xl":
      return (
        <ChakraText
          {...props}
          fontSize={["22.5px", "28px"]}
          lineHeight={["140%"]}
        >
          {props.children}
        </ChakraText>
      );

    case "text-xl":
      return (
        <ChakraText
          {...props}
          fontSize={["18px", "22.5px"]}
          lineHeight={["150%"]}
        >
          {props.children}
        </ChakraText>
      );

    case "text-lg":
      return (
        <ChakraText
          {...props}
          fontSize={["16px", "18px"]}
          lineHeight={["150%"]}
        >
          {props.children}
        </ChakraText>
      );

    case "text-md":
      return (
        <ChakraText
          {...props}
          fontSize={["12.4px", "14.4px"]}
          lineHeight={["150%"]}
        >
          {props.children}
        </ChakraText>
      );

    case "text-sm":
      return (
        <ChakraText
          {...props}
          fontSize={["9.52px", "11.52px"]}
          lineHeight={["150%"]}
        >
          {props.children}
        </ChakraText>
      );

    case "text-xsm":
      return (
        <ChakraText
          {...props}
          fontSize={["7.22px", "9.5px"]}
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
