import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

type Props = ButtonProps & {
  textType?: string;
};

const Button = (props: Props) => {
  switch (props.textType) {
    case "text-xl":
      return (
        <ChakraButton {...props} fontWeight="bold" fontSize={["16px", "18px"]}>
          {props.children}
        </ChakraButton>
      );

    case "text-lg":
      return (
        <ChakraButton {...props} fontWeight="bold" fontSize={["14px", "16px"]}>
          {props.children}
        </ChakraButton>
      );

    case "text-md":
      return (
        <ChakraButton {...props} fontWeight="bold" fontSize={["12px", "14px"]}>
          {props.children}
        </ChakraButton>
      );

    case "text-sm":
      return (
        <ChakraButton {...props} fontWeight="bold" fontSize={["10px", "12px"]}>
          {props.children}
        </ChakraButton>
      );

    default:
      return <ChakraButton {...props} />;
  }
};

export default Button;
