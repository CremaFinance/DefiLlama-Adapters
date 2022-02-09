import { Flex, Image, useMediaQuery, MenuItem, Box } from "@chakra-ui/react";
import type { FC } from "react";

import { format2Dec, format5Dec } from "../../../utils/number-to-short-version";
import { shortenAddress } from "../../../utils/shorten-address";
import MText from "../../atoms/Text";

interface StakeInputMenuItemProps {
  icon: string;
  balance: number;
  title: string | undefined;
  subTitle: string | undefined;
  isDisabled?: boolean;
  shortenSubtitle?: boolean;
  onClick?: () => void;
}

const StakeInputMenuItem: FC<StakeInputMenuItemProps> = ({
  icon,
  balance,
  title,
  subTitle,
  onClick = () => {},
  shortenSubtitle,
  isDisabled,
}) => {
  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");

  const children = (
    <Flex width="100%" alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Image src={icon} mr={2} boxSize={30} />
        <Flex direction="column" alignItems="start">
          <MText type="text-lg">{title}</MText>
          <MText type="text-sm">
            {shortenSubtitle ? shortenAddress(`${subTitle}`) : subTitle}
          </MText>
        </Flex>
      </Flex>

      <MText type="text-lg" fontWeight="bold">
        {isWiderThan768 ? format5Dec(balance) : format2Dec(balance)}
      </MText>
    </Flex>
  );

  if (isWiderThan768)
    return (
      <MenuItem
        isDisabled={isDisabled}
        width="100%"
        onClick={() => onClick()}
        _focus={{ outline: "none", background: "gray-100" }}
        px={4}
        py={2}
      >
        {children}
      </MenuItem>
    );
  return (
    <Box
      as="button"
      disabled={isDisabled}
      width="100%"
      onClick={() => onClick()}
      _focus={{ outline: "none", backgroundColor: "gray.200" }}
      _hover={{ backgroundColor: "gray.100" }}
      _disabled={{
        opacity: "0.4",
        pointerEvents: "none",
        cursor: "not-allowed",
      }}
      px={1}
      py={2}
    >
      {children}
    </Box>
  );
};

export default StakeInputMenuItem;
