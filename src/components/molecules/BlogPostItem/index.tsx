import { Button, Box, Heading, Square } from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";

import colors from "styles/customTheme/colors";

type SectionProps = {
  title: string;
  link: string;
  date: string;
};

const BlogPostItem = ({ title, link, date }: SectionProps) => {
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
      px={3}
      py={8}
      mb="10"
      bg={colors.white}
      maxWidth={260}
      mx={2}
      justifyContent="flex-start"
      rounded="md"
    >
      <Box color="gray.500" fontSize="sm" letterSpacing={2} mb={3}>
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
