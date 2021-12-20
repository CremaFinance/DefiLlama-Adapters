import { Center, Flex, Image, Box } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

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
      bg={colors.white}
    >
      <Center height="100%" ml={[0, 8]} mb={4}>
        <Image
          src={t("indexPage.testimonial-section-image")}
          width="200px"
          height="200px"
          rounded="full"
        />
      </Center>

      <Box width={{ base: "88vw", md: "50vw" }} ml={[0, 8]} pl={2} pt={8}>
        <Box mb={6}>
          <Image src="/solana-logo.png" width="160px" />
        </Box>

        <MHeading type="heading-xsm" lineHeight="140%" mb={4} fontWeight="bold">
          “{t("indexPage.testimonial-section-quote")}”
        </MHeading>

        <MText
          type="text-lg"
          fontWeight="bold"
          mb={[0, 4]}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
        >
          {t("indexPage.testimonial-section-name")}, {"   "}
          <MText
            position="relative"
            left={{ base: "0px", md: "5px" }}
            as="span"
            type="text-lg"
            fontWeight="normal"
            mb={4}
          >
            {t("indexPage.testimonial-section-position")}
          </MText>
        </MText>
      </Box>
    </Flex>
  );
};

export default TestimonialSection;
