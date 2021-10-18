import { Button, Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import BlogPostItem from "components/molecules/BlogPostItem";
import colors from "styles/customTheme/colors";

export default function BlogPosts() {
  const { t } = useTranslation();

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
        src="/bbq-dudes.png"
        width={["90%", 350, 380]}
        display="block"
        margin="0 auto"
        mb={8}
      />
      <Heading
        textAlign="center"
        marginBottom={4}
        color={colors.black}
        fontWeight="bold"
      >
        {t("indexPage.blog-section-title")}
      </Heading>
      <Heading
        size="md"
        maxW="600"
        alignSelf="center"
        maxWidth="800"
        textAlign="center"
        marginBottom="20"
        color={colors.black}
        fontWeight="300"
      >
        {t("indexPage.blog-section-subtitle")}
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
            key={`blogpost-item-${index}`}
            date={t(`indexPage.blog-section-items.${index}.date`)}
            link={t(`indexPage.blog-section-items.${index}.link`)}
            title={t(`indexPage.blog-section-items.${index}.title`)}
            subtitle={t(`indexPage.blog-section-items.${index}.subtitle`)}
          />
        ))}
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
          colorScheme={colors.green}
          rounded="md"
          mx={4}
          my={2}
        >
          {t("indexPage.blog-section-primary-button")}
        </Button>

        <Button
          mx={4}
          my={2}
          variant="ghost"
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
