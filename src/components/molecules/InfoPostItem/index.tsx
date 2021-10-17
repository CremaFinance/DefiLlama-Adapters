import { Button, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import colors from "styles/customTheme/colors";

type InfoPostItemProps = {
  titleEmphasis: string;
  title: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  authorCompany: string;
  image: string;
};

const InfoPostItem = ({
  titleEmphasis,
  title,
  description,
  quote,
  quoteAuthor,
  authorCompany,
  image,
}: InfoPostItemProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      maxWidth="1120"
      marginX={[0, 160]}
      flexDirection={["column-reverse", "row"]}
      mb={[8, 32]}
    >
      <Box maxWidth="504" marginX={4}>
        <Heading mb={4} fontWeight="bold">
          <Box display="inline-block" color={colors.green} mr={1}>
            {titleEmphasis}
          </Box>
          {title}
        </Heading>

        <Text mb={4} fontSize="22">
          {description}
        </Text>

        <Button
          variant="link"
          color={colors.black}
          bg="none"
          rightIcon={<HiArrowRight />}
          mb={8}
        >
          {t("indexPage.read-more")}
        </Button>

        <Box
          bg={colors.marinadeLighterGreen}
          height="160"
          width="520"
          p={4}
          mt={4}
          rounded="md"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Text mb={2} fontSize="14">
            &quot;{quote}&quot;
          </Text>
          <Box display="flex" alignItems="center">
            {/* TODO: replace with actual logo/image */}
            <Box
              bg={colors.black}
              rounded="full"
              height="32px"
              width="32px"
              mr="2"
            />

            <Text display="inline-block" fontSize="14" fontWeight="bold" mr={2}>
              {quoteAuthor},
            </Text>
            <Text display="inline-block" fontSize="14">
              {authorCompany}
            </Text>
          </Box>
        </Box>
      </Box>

      <Image
        src={image}
        layout="fill"
        objectFit="contain"
        p={[2, 4]}
        right={[0, 100]}
        height={[200, 400]}
        position="absolute"
        width={["100%", 640]}
      />
    </Flex>
  );
};

export default InfoPostItem;
