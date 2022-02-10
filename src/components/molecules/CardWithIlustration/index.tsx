import { Flex, Text, Image, Box, HStack } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import colors from "styles/customTheme/colors";

interface CardWithIlustrationProps {
  header: JSX.Element | string;
  text: string;
  ilustrationData: { src: string; alt: string; width?: number };
  footer?: JSX.Element;
  reverseSections?: boolean;
}

const CardWithIlustration: FunctionComponent<CardWithIlustrationProps> = ({
  header,
  text,
  ilustrationData,
  footer,
  reverseSections = false,
}) => {
  const renderTextSection = (): JSX.Element => {
    return (
      <Box
        maxWidth="530px"
        justifyContent="left"
        alignItems="center"
        direction="column"
        flex={1}
        ml={{ base: "0", lg: "0.5rem" }}
        alignSelf="start"
      >
        {header}
        <Text
          color={colors.black}
          textAlign="left"
          fontWeight="normal"
          fontSize={{ base: "16px", lg: "22.5px" }}
          lineHeight={{ base: "21px", lg: "27px" }}
          ml={0}
        >
          {text}
        </Text>
        {footer}
      </Box>
    );
  };

  const renderIlustration = (): JSX.Element => {
    return (
      <Flex
        justifyContent={reverseSections ? "start" : "end"}
        alignItems="center"
        flex={1}
        display={{ base: "none", md: "flex" }}
        alignSelf={{ base: "center", lg: "end" }}
      >
        <Image
          src={ilustrationData.src}
          width={[
            "60px",
            ilustrationData.width ? ilustrationData.width : "492px",
          ]}
          alt={ilustrationData.alt}
        />
      </Flex>
    );
  };
  return (
    <HStack
      gap={{ base: 0, md: 6 }}
      direction="row"
      align="end"
      justify="center"
    >
      {!reverseSections && renderTextSection()}
      {renderIlustration()}
      {reverseSections && renderTextSection()}
    </HStack>
  );
};

export default CardWithIlustration;
