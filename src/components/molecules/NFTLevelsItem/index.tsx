import { Flex, Image, Text, Icon, Spacer } from "@chakra-ui/react";
import { RiCheckboxCircleFill } from "react-icons/ri";

import colors from "styles/customTheme/colors";

type NFTLevelsItemProps = {
  ilustration: string;
  title: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  mb?: string;
};

const NFTLevelsItem = ({
  ilustration,
  title,
  selected = false,
  disabled = false,
  onClick,
  mb,
}: NFTLevelsItemProps) => {
  return (
    <Flex
      ml={{ base: "0px", md: "4px" }}
      mr={{ base: "0px", md: "4px" }}
      mt={{ base: "2px", md: "0px" }}
      mb={{ base: "2px", md: "0px" }}
      width={{ base: "100%", md: "73px" }}
      flexDirection={{ base: "row", md: "column" }}
      background="white"
      justifyContent="top"
      alignItems="top"
      zIndex={6}
      onClick={onClick}
      cursor={!disabled ? "pointer" : "not-allowed"}
    >
      <Flex
        height="67px"
        width="72px"
        flexDirection="column"
        background={
          !disabled && selected ? colors.marinadeEvenLighterGreen : "gray.50"
        }
        border="1px solid"
        borderColor={
          !disabled && selected ? colors.marinadeBorderGreen : colors.lightGray
        }
        borderRadius="4px"
        justifyContent="center"
        alignItems="center"
        zIndex={6}
      >
        {!disabled ? (
          <Icon
            marginLeft="52px"
            marginBottom="48px"
            as={RiCheckboxCircleFill}
            width="16.22px"
            height="16.14px"
            cursor="pointer"
            color={colors.marinadeGreen}
            position="absolute"
            display={selected ? "flex" : "none"}
          />
        ) : null}
        <Image src={ilustration} opacity={disabled ? "40%" : "100%"} mb={mb} />
      </Flex>
      <Spacer display={{ base: "flex", md: "none" }} />
      <Flex
        flexDirection="column"
        w={{ base: "120px", md: "72px" }}
        mt={{ base: "10px", md: "0px" }}
      >
        <Text
          opacity={disabled ? "40%" : "100%"}
          mt="4px"
          maxW={{ base: "120px", md: "64px" }}
          fontWeight="bold"
          textAlign={{ base: "right", md: "left" }}
          fontSize="11.52px"
          lineHeight="17.28px"
          color={colors.blackMate}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};
export default NFTLevelsItem;
