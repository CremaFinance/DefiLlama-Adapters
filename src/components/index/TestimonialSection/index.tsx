import { Center, Flex, Image, Box } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MText from "../../atoms/Text";

const TestimonialSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      paddingTop={24}
      paddingBottom={24}
      as="section"
      aria-label="testimonial-section"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <Center height="100%" ml={[0, 8]}>
        <Image
          src={t("indexPage.testimonial-section-image")}
          width="200px"
          height="200px"
          rounded="full"
        />
      </Center>

      <Box width={{ base: "88vw", md: "50vw" }} ml={[0, 8]} pt={8}>
        <Box mb={6}>
          <Image src="/solana-logo.png" width="160px" />
        </Box>

        <MText type="heading-xsm" mb={4}>
          “{t("indexPage.testimonial-section-quote")}”
        </MText>

        <MText
          type="text-lg"
          fontWeight="bold"
          mb={[0, 4]}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
        >
          {t("indexPage.testimonial-section-name")}
          {", "}
          <MText as="span" type="text-lg" fontWeight="normal" mb={4}>
            {t("indexPage.testimonial-section-position")}
          </MText>
        </MText>
      </Box>
    </Flex>
  );
};

export default TestimonialSection;
