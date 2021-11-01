import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

const Button = forwardRef(
  (props: ButtonProps, ref: LegacyRef<HTMLButtonElement> | undefined) => {
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
            ref={ref}
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
            ref={ref}
            {...rest}
          >
            {children}
          </ChakraButton>
        );
      default:
        return <ChakraButton ref={ref} {...props} />;
    }
  }
);

export default Button;
