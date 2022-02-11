import { Flex, Image, Stack, useBreakpointValue } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

import MText from "../../atoms/Text";

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
  const breakpoint = useBreakpointValue({ base: "base", lg: "lg" });
  const renderTextSection = (): JSX.Element => {
    return (
      <Flex
        justifyContent="left"
        alignItems="center"
        direction="column"
        flex={1}
        marginInlineStart="0.5rem"
        marginInlineEnd="0.5rem"
        alignSelf={{ base: "center", lg: "flex-start" }}
        maxWidth="530px"
      >
        {header}
        <MText type="text-2xl">{text}</MText>
        {footer}
      </Flex>
    );
  };

  const renderIlustration = (): JSX.Element => {
    return (
      <Flex
        alignItems="center"
        flex={1}
        alignSelf={{ base: "center", lg: "end" }}
        maxWidth="530px"
        mb={{ base: 20, md: "unset" }}
      >
        <Image
          src={ilustrationData.src}
          width={[
            "200px",
            ilustrationData.width ? ilustrationData.width : "492px",
          ]}
          alt={ilustrationData.alt}
        />
      </Flex>
    );
  };
  return (
    <Stack
      gap={{ base: 10, md: 10, lg: 20 }}
      direction={{ base: "column-reverse", lg: "row" }}
      align="end"
      justify="center"
    >
      {(!reverseSections || breakpoint?.includes("base")) &&
        renderTextSection()}
      {renderIlustration()}
      {reverseSections && !breakpoint?.includes("base") && renderTextSection()}
    </Stack>
  );
};

export default CardWithIlustration;
