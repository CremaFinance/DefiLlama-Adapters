import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = (props: ButtonProps) => {
  const { variant, children, ...rest } = props;
  switch (variant) {
    case "solid":
      return (
        <ChakraButton
          variant="solid"
          size="sm"
          rounded="md"
          bg="green"
          _hover={{ bg: "green800" }}
          colorScheme="green"
          color="white"
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case "outline":
      return (
        <ChakraButton
          size="sm"
          rounded="md"
          variant="outline"
          bg="white"
          color="green"
          _hover={{ color: "green800" }}
          colorScheme="green"
          borderRadius="8px"
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    default:
      return <ChakraButton {...props} />;
  }
};

export default Button;
