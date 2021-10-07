import { Heading, Image, Text, Square } from "@chakra-ui/react";
import htmlParser from "html-react-parser";

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
    maxWidth="sm"
  >
    <Image
      src={icon}
      maxWidth="135px"
      width="100%"
      objectFit="contain"
      alt={`${title} Logo`}
    />
    <Heading
      size="xl"
      color="white"
      marginBottom="4"
      marginTop="7"
      wordBreak="keep-all"
      textAlign="center"
    >
      {title}
    </Heading>
    {subtitle && (
      <Text color="whiteAlpha.800" textAlign="center" fontSize="xl">
        {htmlParser(subtitle)}
      </Text>
    )}
  </Square>
);

export default IconWithTextBelow;
