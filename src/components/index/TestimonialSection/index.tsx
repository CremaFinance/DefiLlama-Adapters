import { Center, Grid, Image, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const TestimonialSection = () => {
  const { t } = useTranslation("index");

  return (
    <Box
      paddingTop={["10", 10, 16]}
      paddingBottom="16"
      as="section"
      px={[5, 8]}
      aria-label="why-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Grid
        templateColumns={[
          "repeat(100%)",
          "repeat(100%)",
          "160px calc(100% - 180px)",
        ]}
        maxWidth="880px"
        margin="0 auto"
      >
        <Box textAlign="center" minHeight="200px">
          <Center height="100%">
            <Image
              src={t("testimonial-section-image")}
              width="150px"
              height="150px"
              rounded="full"
            />
          </Center>
        </Box>

        <Box pl={[0, 0, 8]} gridColumn={[1, 1, 2]}>
          <Box mb={4}>
            <Image src="/solana-logo.png" width="120px" />
          </Box>

          <Box fontWeight="bold" fontSize={["xl", "xl", "2xl"]} mb={4}>
            “{t("testimonial-section-quote")}”
          </Box>

          <Box>
            <Box
              fontWeight="bold"
              mr={2}
              display={["block", "block", "inline-block"]}
            >
              {t("testimonial-section-name")}
            </Box>{" "}
            {t("testimonial-section-position")}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default TestimonialSection;
