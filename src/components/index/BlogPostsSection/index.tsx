import { Skeleton, Box, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import BlogPostItem from "components/molecules/BlogPostItem";
import colors from "styles/customTheme/colors";

type PostProps = {
  guid: string;
  content: string;
  title: string;
  link: string;
  pubDate: string;
};

export default function BlogPosts() {
  const router = useRouter();
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [first, setFirst] = useState(true);

  async function getPosts() {
    const req = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/marinade-finance"
    );
    const postsParsed = await req.json();
    setPosts(postsParsed.items.slice(0, 3)?.reverse());
  }

  function blogPosts() {
    if (posts.length) {
      return posts.map((post: PostProps) => (
        <BlogPostItem
          key={post.guid}
          date={post.pubDate}
          content={post.content}
          link={post.link}
          title={post.title}
        />
      ));
    }

    return [
      <Skeleton key="firstSkeleton" height="150px" />,
      <Skeleton key="secondSkeleton" height="150px" />,
      <Skeleton key="thirdSkeleton" height="150px" />,
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
      paddingTop={24}
      paddingBottom={24}
      bg={colors.greenLight}
      px={5}
      as="section"
      aria-label="blog-posts-section"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src="/octo-chef.svg"
        width={["90%", 390, 430]}
        display="block"
        margin="0 auto"
        mt={4}
        mb={4}
      />
      <MHeading textAlign="center" mt={4} type="heading-md">
        {t("indexPage.blog-section-title")}
      </MHeading>

      <MText
        textAlign="center"
        alignSelf="center"
        my={8}
        maxW={720}
        type="text-2xl"
        color={colors.black}
      >
        {t("indexPage.blog-section-subtitle")}
      </MText>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
        mt={6}
        mb={16}
        maxWidth="90vw"
      >
        {blogPosts()}
      </Box>

      <MHeading
        textAlign="center"
        alignSelf="center"
        maxW={[440, 520, 700]}
        mt={16}
        type="heading-sm"
      >
        {t("indexPage.blog-section-blurb")}
        <MHeading
          as="span"
          display={{ base: "inline", md: "block" }}
          color={colors.marinadeGreen}
          maxW={[440, 520, 700]}
          type="heading-sm"
          mb={8}
        >
          {" "}
          {t("indexPage.blog-section-blurb-highlight")}
        </MHeading>
      </MHeading>

      <Flex
        textAlign="center"
        mt={2}
        mb={8}
        flexDirection={["column", "row"]}
        alignContent="center"
      >
        <MButton
          font="text-xl"
          bg={colors.marinadeGreen}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.marinadeGreen}
          rounded="md"
          width={200}
          height="48px"
          mx={4}
          my={[2, 0]}
          onClick={() => router.push("/app/staking")}
        >
          {t("indexPage.blog-section-primary-button")}
        </MButton>

        <MButton
          font="text-xl"
          variant="link"
          mx={4}
          my={[2, 0]}
          colorScheme={colors.marinadeGreen}
          _hover={{ textDecoration: "underline" }}
          rounded="md"
          rightIcon={<HiArrowRight />}
        >
          {t("indexPage.blog-section-secondary-button")}
        </MButton>
      </Flex>
    </Box>
  );
}
