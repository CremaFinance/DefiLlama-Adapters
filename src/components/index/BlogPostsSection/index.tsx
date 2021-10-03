import { HStack, Button, Box, Heading, Image } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { HiArrowRight } from "react-icons/hi";

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
        maxWidth="800"
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
        color="black"
        lineHeight="36px"
        fontSize="28"
        fontWeight="bold"
        maxWidth={[440, 520, 580]}
        margin="0 auto"
        mb={[10, 10, 14]}
      >
        {t("blog-section-blurb")}
        <Heading
          color="green"
          fontSize="28"
          display="inline-block"
          fontWeight="bold"
        >
          {t("blog-section-blurb-highlight")}
        </Heading>
      </Heading>
      <Box textAlign="center">
        <HStack spacing={5} display="inline-flex">
          <Button bg="green" colorScheme="green" rounded="md">
            {t("blog-section-primary-button")}
          </Button>

          <Button
            variant="ghost"
            colorScheme="green"
            rounded="md"
            rightIcon={<HiArrowRight />}
          >
            {t("blog-section-secondary-button")}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
