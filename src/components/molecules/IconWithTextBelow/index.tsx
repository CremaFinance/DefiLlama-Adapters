import { Heading, Image, Text, Square } from "@chakra-ui/react";
import { ReactElement } from "react";

type IconWithTextBelowProps = {
  title: string;
  subtitle?: ReactElement | string;
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
      color="white"
      marginBottom="5"
      marginTop="5"
      wordBreak="keep-all"
      textAlign="center"
    >
      {title}
    </Heading>
    {typeof subtitle === "string" ? (
      <Text color="whiteAlpha.800" textAlign="center">
        {subtitle}
      </Text>
    ) : (
      subtitle
    )}
  </Square>
);

export default IconWithTextBelow;
