import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

type Props = LinkProps & {
  textType?: string;
};

const Link = (props: Props) => {
  switch (props.textType) {
    case "text-xl":
      return (
        <ChakraLink {...props} fontWeight="bold" fontSize={["16px", "18px"]}>
          {props.children}
        </ChakraLink>
      );

    case "text-lg":
      return (
        <ChakraLink {...props} fontWeight="bold" fontSize={["14px", "16px"]}>
          {props.children}
        </ChakraLink>
      );

    case "text-md":
      return (
        <ChakraLink {...props} fontWeight="bold" fontSize={["12px", "14px"]}>
          {props.children}
        </ChakraLink>
      );

    case "text-sm":
      return (
        <ChakraLink {...props} fontWeight="bold" fontSize={["10px", "12px"]}>
          {props.children}
        </ChakraLink>
      );

    default:
      return <ChakraLink {...props} />;
  }
};

export default Link;
