import { Button, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import {
  ResponsiveValue,
  Union,
} from "@chakra-ui/styled-system/dist/types/utils";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import colors from "styles/customTheme/colors";

type ImagePosition = "left" | "right";

type InfoPostItemProps = {
  titleEmphasis: string;
  title: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  authorCompany: string;
  image: string;
  imagePosition: ImagePosition;
  imageWidth?: ResponsiveValue<Union<number | "px" | string>>;
  imageHeight?: ResponsiveValue<Union<number | "px" | string>>;
  marginBottom?: ResponsiveValue<Union<number | "px" | string>>;
};

const InfoPostItem = ({
  titleEmphasis,
  title,
  description,
  quote,
  quoteAuthor,
  authorCompany,
  image,
  imagePosition = "right",
  imageWidth = ["100%", 640],
  imageHeight = [200, 400],
  marginBottom = [16, 24],
}: InfoPostItemProps) => {
  const { t } = useTranslation();

  const direction = imagePosition === "right" ? "row" : "row-reverse";
  const imageControl =
    imagePosition === "right" ? (
      <Image
        src={image}
        layout="fill"
        objectFit="contain"
        p={[2, 4]}
        right={[0, 100]}
        height={imageHeight}
        position={["relative", "absolute"]}
        width={imageWidth}
        overflow="auto"
      />
    ) : (
      <Image
        src={image}
        layout="fill"
        objectFit="contain"
        p={[2, 4]}
        left={[0, 100]}
        height={imageHeight}
        position={["relative", "absolute"]}
        width={imageWidth}
        overflow="auto"
      />
    );

  return (
    <Flex
      width="1120"
      flexDirection={["column-reverse", direction]}
      mb={marginBottom}
      mt={[0, 2]}
    >
      <Box maxWidth="504" marginX={4} zIndex={4}>
        <Heading mb={4} fontWeight="bold">
          <Box display="inline-block" color={colors.green}>
            {titleEmphasis}
          </Box>{" "}
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

      {imageControl}
    </Flex>
  );
};

export default InfoPostItem;
