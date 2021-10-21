import { Skeleton, Button, Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

import BlogPostItem from "components/molecules/BlogPostItem";
import colors from "styles/customTheme/colors";

type PostProps = {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
};

export default function BlogPosts() {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [first, setFirst] = useState(true);

  async function getPosts() {
    const req = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/marinade-finance"
    );
    const postsParsed = await req.json();
    setPosts(postsParsed.items.slice(0, 3));
  }

  function blogPosts() {
    if (posts.length) {
      return posts.map((post: PostProps) => (
        <Box key={post.guid}>
          <BlogPostItem
            date={post.pubDate}
            link={post.link}
            title={post.title}
          />
        </Box>
      ));
    }

    return [
      <Skeleton height="150px" />,
      <Skeleton height="150px" />,
      <Skeleton height="150px" />,
    ];
  }

  useEffect(() => {
    if (first) {
      getPosts();
      setFirst(false);
    }
  }, [first, posts]);

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg={colors.greenLight}
      px={5}
      as="section"
      aria-label="blog-posts-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Image
        src="/octo-chef.svg"
        width={["90%", 390, 390]}
        display="block"
        margin="0 auto"
        mb={4}
      />
      <Heading
        textAlign="center"
        marginBottom={4}
        size="lg"
        color={colors.black}
        fontWeight="bold"
      >
        {t("indexPage.blog-section-title")}
      </Heading>

      <Box
        alignSelf="center"
        maxWidth="600"
        textAlign="center"
        marginBottom="8"
        color={colors.black}
        fontWeight="300"
      >
        {t("indexPage.blog-section-subtitle")}
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
        margin="0 auto"
        mb={16}
        maxWidth="860px"
      >
        {blogPosts()}
      </Box>
      <Heading
        textAlign="center"
        color={colors.black}
        fontWeight="bold"
        maxWidth={[440, 520, 700]}
        size="lg"
        margin="0 auto"
      >
        {t("indexPage.blog-section-blurb")}
      </Heading>

      <Heading
        textAlign="center"
        color={colors.green}
        size="lg"
        fontWeight="bold"
        mb={8}
      >
        {t("indexPage.blog-section-blurb-highlight")}
      </Heading>

      <Box textAlign="center" mb={8}>
        <Button
          bg={colors.green}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.green}
          rounded="md"
          mx={4}
          my={[2, 0]}
        >
          {t("indexPage.blog-section-primary-button")}
        </Button>

        <Button
          variant="link"
          mx={4}
          my={[2, 0]}
          colorScheme={colors.green}
          rounded="md"
          rightIcon={<HiArrowRight />}
        >
          {t("indexPage.blog-section-secondary-button")}
        </Button>
      </Box>
    </Box>
  );
}
