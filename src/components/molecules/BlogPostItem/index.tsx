import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";

type SectionProps = {
  title: string;
  content: string;
  link: string;
  date: string;
};

const BlogPostItem = ({ title, content, link, date }: SectionProps) => {
  const { t } = useTranslation();
  const [isTallerThan700] = useMediaQuery("(min-height: 700px)");

  const [contentPreview] = useState(() => {
    let textToShow = content.replace(/<[^>]+>/g, "");
    textToShow = textToShow?.trimEnd();
    const maxChars = isTallerThan700 ? 100 : 80;
    return `${textToShow.slice(0, maxChars)}...`;
  });

  function parseDate(dateString: string) {
    const pubDate = new Date(dateString.replace(/-/g, "/"));
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${pubDate.getDate()} ${
      months[pubDate.getMonth()]
    } ${pubDate.getFullYear()}`;
  }

  return (
    <Flex
      flexDirection="column"
      px={3}
      py={8}
      mb="10"
      bg={colors.white}
      width={["auto", 352]}
      height={[340, 360]}
      mx={[0, 3]}
      alignItems="center"
      rounded="md"
    >
      <MText mb={4} type="text-xl" color={colors.black600}>
        {parseDate(date)}
      </MText>

      <MHeading
        textAlign="center"
        mt={[1, 4]}
        lineHeight="100%"
        type="heading-xsm"
        noOfLines={3}
      >
        {title}
      </MHeading>

      <MText flex={1} textAlign="center" fontSize="18px" mt={4} type="text-lg">
        {contentPreview}
      </MText>

      <MLink
        font="text-xl"
        variant="link"
        as="a"
        color={colors.green}
        href={link}
        target="_blank"
        display="flex"
        alignItems="center"
      >
        {t("indexPage.read-more")}
        <Image
          src="/icons/external-link-green.svg"
          width="1rem"
          marginLeft="10px"
        />
      </MLink>
    </Flex>
  );
};

export default BlogPostItem;
