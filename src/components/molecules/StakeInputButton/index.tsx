import { Button, MenuButton, Image } from "@chakra-ui/react";
import { createElement, FC } from "react";

interface StakeInputButtonProps {
  component: "Button" | "MenuButton";
  tokenIcon: string;
  rightIcon?: string;
  onClick?: () => void;
}

const components = {
  Button,
  MenuButton,
};

const StakeInputButton: FC<StakeInputButtonProps> = ({
  component,
  tokenIcon,
  rightIcon,
  onClick = () => {},
  children,
}) => {
  return createElement(
    components[component],
    {
      boxShadow: "md",
      as: Button,
      rounded: "md",
      bg: "white",
      _active: { boxShadow: "none" },
      _focus: { outline: "none" },
      variant: "solid",
      font: "text-lg",
      height: "44px",
      px: 2,
      leftIcon: <Image src={tokenIcon} mr={1} width={["24px", "30px"]} />,
      rightIcon: rightIcon ? <Image src={rightIcon} width="1.5rem" /> : null,
      onClick,
    },
    children
  );
};

export default StakeInputButton;
