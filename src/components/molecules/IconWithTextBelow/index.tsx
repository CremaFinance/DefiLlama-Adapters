import { Heading, Image, Text, Square } from "@chakra-ui/react";
import ReactHtmlParser from "html-react-parser";
import * as React from "react";

type IconWithTextBelowProps = {
  title: string;
  subtitle?: string;
  icon: string;
};

const IconWithTextBelow = (props: IconWithTextBelowProps) => (
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
    <Image
      src={props.icon}
      maxW="sm"
      objectFit="contain"
      alt={`${props.title} Logo`}
    />
    <Heading
      size="md"
      color="white"
      marginBottom="5"
      marginTop="5"
      wordBreak="keep-all"
      textAlign="center"
    >
      {props.title}
    </Heading>
    <Text color="whiteAlpha.800" textAlign="center">
      {ReactHtmlParser(props.subtitle)}
    </Text>
  </Square>
);

export default IconWithTextBelow;
