import { Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import BlogPostItem from "components/molecules/BlogPostItem";

export default function BlogPosts() {
  const { t } = useTranslation("index");

  return (
    <Box
      paddingTop="16"
      paddingBottom="16"
      bg="greenLight"
      px={5}
      as="section"
      aria-label="blog-posts-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Image
        src="/bbq-dudes.png"
        width={["90%", 350, 380]}
        display="block"
        margin="0 auto"
        mb={8}
      />

      <Heading
        textAlign="center"
        marginBottom={4}
        color="black"
        fontWeight="bold"
      >
        {t("blog-section-title")}
      </Heading>
      <Heading
        size="md"
        maxW="600"
        alignSelf="center"
        maxWidth="1000"
        textAlign="center"
        marginBottom="20"
        color="black"
        fontWeight="300"
      >
        {t("blog-section-subtitle")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
        mb={5}
      >
        {[0, 1, 2].map((index) => (
          <BlogPostItem
            date={t(`blog-section-items.${index}.date`)}
            link={t(`blog-section-items.${index}.link`)}
            title={t(`blog-section-items.${index}.title`)}
            subtitle={t(`blog-section-items.${index}.subtitle`)}
          />
        ))}
      </Box>

      <Heading
        textAlign="center"
        marginBottom={4}
        color="black"
        size="lg"
        fontWeight="bold"
        maxWidth={[440, 440, 500]}
        margin="0 auto"
      >
        {t("blog-section-blurb")}
      </Heading>

      <Heading
        textAlign="center"
        marginBottom={4}
        color="green"
        maxWidth="440px"
        margin="0 auto"
        size="lg"
        fontWeight="bold"
      >
        {t("blog-section-blurb-highlight")}
      </Heading>
    </Box>
  );
}
