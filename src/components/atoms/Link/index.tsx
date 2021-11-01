import { Link as ChakraLink, LinkProps, ChakraProps } from "@chakra-ui/react";

type Props = ChakraProps &
  LinkProps & {
    font?: string;
  };

const Link = (props: Props) => {
  switch (props.font) {
    case "text-xl-bold":
      return (
        <ChakraLink {...props} fontWeight="bold" fontSize={["16px", "18px"]}>
          {props.children}
        </ChakraLink>
      );

    case "text-xl-normal":
      return (
        <ChakraLink {...props} fontSize={["16px", "18px"]}>
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
