import { Box, Heading, Link, Text, Square } from "@chakra-ui/react";
import ReactHtmlParser from "html-react-parser";
import * as React from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  link: string;
  date: string;
};

const BlogPostItem = (props: SectionProps) => (
  <Square
    display="flex"
    flexDirection="column"
    flex="1"
    p={[4, 4, 6]}
    mb="10"
    bg="white"
    mx={5}
    justifyContent="flex-start"
    maxWidth="320"
    minWidth="320"
  >
    <Box color="gray.500" letterSpacing={2} mb={6}>
      {props.date}
    </Box>

    <Heading
      size="md"
      color="black"
      mb={2}
      wordBreak="keep-all"
      textAlign="center"
    >
      {props.title}
    </Heading>

    <Text color="black" textAlign="center" mb={4}>
      {ReactHtmlParser(props.subtitle)}
    </Text>

    <Box fontWeight="bold" color="green" fontWeight="bold">
      <Link href={props.link} rounded="sm" target="_blank">
        Read more
      </Link>
    </Box>
  </Square>
);

export default BlogPostItem;
