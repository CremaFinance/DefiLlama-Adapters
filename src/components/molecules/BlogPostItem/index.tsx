import { Button, Box, Heading, Square } from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";

import colors from "styles/customTheme/colors";

type SectionProps = {
  title: string;
  link: string;
  date: string;
  categories: Array<string>;
};

const BlogPostItem = ({ title, categories, link, date }: SectionProps) => {
  function parseDate(dateString: string) {
    const jsDate = new Date(dateString);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${jsDate.getDay()} ${
      months[jsDate.getMonth()]
    } ${jsDate.getFullYear()}`;
  }

  return (
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
      <Box color="gray.500" letterSpacing={2} mb={3}>
        {parseDate(date)}
      </Box>

      <Heading
        size="md"
        color={colors.black}
        mb={3}
        wordBreak="keep-all"
        textAlign="center"
      >
        {title}
      </Heading>

      <Box textAlign="center" mb={3}>
        {categories.map((category) => {
          return (
            <Box
              userSelect="none"
              m={0.5}
              display="inline-block"
              color="green"
              opacity={0.85}
              bg="greenLight"
              borderColor="greenVibrant"
              fontSize="xs"
              px={2}
              py={0.5}
              borderWidth={1}
              rounded="full"
              wordBreak="unset"
            >
              #{category}
            </Box>
          );
        })}
      </Box>

      <Box>
        <Button
          variant="link"
          as="a"
          color={colors.green}
          href={link}
          target="_blank"
          rightIcon={<HiOutlineExternalLink />}
        >
          Read more
        </Button>
      </Box>
    </Square>
  );
};

export default BlogPostItem;
