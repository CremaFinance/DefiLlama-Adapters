import { ChakraProps, Flex } from "@chakra-ui/react";

import MButton from "../../atoms/Button";
import colors from "styles/customTheme/colors";

type SwitchButtonsProps = ChakraProps & {
  leftText: string;
  rightText: string;
  height: number;
  width: number;
  my: number;
  active: boolean;
  display?: string;
  handleSwitch: (v: boolean) => void;
};

const SwitchButtons = ({
  leftText,
  rightText,
  height,
  width,
  my,
  active,
  display = "flex",
  handleSwitch,
}: SwitchButtonsProps) => {
  const buttonHeight = `${height - 4}px`;
  const buttonWidth = `${width / 2 - 6}px`;

  return (
    <Flex
      height={`${height}px`}
      width={`${width}px`}
      my={my}
      rounded="3xl"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
      display={display}
    >
      <MButton
        font="text-xl"
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
        font="text-xl"
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
