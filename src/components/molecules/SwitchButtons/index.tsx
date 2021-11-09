import { ChakraProps, Flex, ResponsiveValue } from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/types/utils";

import MButton from "../../atoms/Button";
import colors from "styles/customTheme/colors";

type SwitchButtonsProps = ChakraProps & {
  leftText: string;
  rightText: string;
  height: number;
  width: ResponsiveValue<Union<string>>;
  buttonWidth: ResponsiveValue<Union<string>>;
  my: ResponsiveValue<Union<number>>;
  active: boolean;
  font?: string;
  display?: string;
  handleSwitch: (v: boolean) => void;
};

const SwitchButtons = ({
  leftText,
  rightText,
  height,
  width,
  buttonWidth,
  my,
  active,
  font = "text-xl",
  display = "flex",
  handleSwitch,
}: SwitchButtonsProps) => {
  const buttonHeight = `${height - 4}px`;

  return (
    <Flex
      height={`${height}px`}
      width={width}
      my={my}
      rounded="3xl"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
      display={display}
    >
      <MButton
        font={font}
        bg={active ? colors.green : "gray.100"}
        color={active ? colors.white : colors.black}
        fontWeight={active ? "bold" : "normal"}
        rounded="3xl"
        width={buttonWidth}
        height={buttonHeight}
        _hover={{}}
        mr={2}
        onClick={() => handleSwitch(true)}
      >
        {leftText}
      </MButton>
      <MButton
        font={font}
        bg={active ? "gray.100" : colors.green}
        color={active ? colors.black : colors.white}
        fontWeight={active ? "normal" : "bold"}
        rounded="3xl"
        width={buttonWidth}
        height={buttonHeight}
        _hover={{}}
        onClick={() => handleSwitch(false)}
      >
        {rightText}
      </MButton>
    </Flex>
  );
};

export default SwitchButtons;
