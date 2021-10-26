import { Button, Box, Image, Heading, Text, Square } from "@chakra-ui/react";

import colors from "styles/customTheme/colors";

type SectionProps = {
  title: string;
  subtitle?: string;
  link: string;
  date: string;
};

const BlogPostItem = ({ title, subtitle, link, date }: SectionProps) => (
  <Square
    display="flex"
    flexDirection="column"
    flex="1"
    p={[4, 4, 6]}
    mb="10"
    bg={colors.white}
    mx={5}
    justifyContent="flex-start"
    maxWidth="320"
    minWidth="320"
  >
    <Box color="gray.500" letterSpacing={2} mb={6}>
      {date}
    </Box>

    <Heading
      size="md"
      color={colors.black}
      mb={2}
      wordBreak="keep-all"
      textAlign="center"
    >
      {title}
    </Heading>

    <Text color={colors.black} textAlign="center" mb={4}>
      {subtitle}
    </Text>

    <Box>
      <Button
        as="a"
        variant="link"
        color={colors.green}
        href={link}
        target="_blank"
        rightIcon={<Image src="/icons/external-link-green.svg" width="1rem" />}
      >
        Read more
      </Button>
    </Box>
  </Square>
);

export default BlogPostItem;
