import { Heading, Image, Text, Square } from "@chakra-ui/react";
import htmlParser from "html-react-parser";

import colors from "styles/customTheme/colors";

type IconWithTextBelowProps = {
  title: string;
  subtitle?: string;
  icon: string;
};

const IconWithTextBelow = ({
  icon,
  title,
  subtitle,
}: IconWithTextBelowProps) => (
  <Square
    display="flex"
    flexDirection="column"
    flex="1"
    marginLeft="5"
    marginRight="5"
    marginBottom="5"
    justifyContent="flex-start"
    maxWidth="320"
    minWidth="320"
  >
    <Image src={icon} maxW="sm" objectFit="contain" alt={`${title} Logo`} />
    <Heading
      size="md"
      color={colors.white}
      marginBottom="5"
      marginTop="5"
      wordBreak="keep-all"
      textAlign="center"
    >
      {title}
    </Heading>
    {subtitle && (
      <Text color="whiteAlpha.800" textAlign="center">
        {htmlParser(subtitle)}
      </Text>
    )}
  </Square>
);

export default IconWithTextBelow;
