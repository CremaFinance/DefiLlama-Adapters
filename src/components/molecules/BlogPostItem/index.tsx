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
  const isLenghtyTitle = title.length > 70;

  const [contentPreview] = useState(() => {
    let textToShow = content.replace(/<[^>]+>/g, "");
    textToShow = textToShow?.trimEnd();
    let maxChars = isTallerThan700 ? 100 : 80;
    if (isLenghtyTitle) {
      maxChars -= 40;
    }

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

      <Flex flexDirection="column" justifyContent="flex-start" flex={1}>
        <MHeading
          textAlign="center"
          type="heading-xsm"
          lineHeight="130%"
          pb={4}
        >
          {title}
        </MHeading>

        <MText textAlign="center" fontSize="18px" type="text-lg">
          {contentPreview}
        </MText>
      </Flex>

      <MLink
        font="text-xl"
        variant="link"
        as="a"
        color={colors.marinadeGreen}
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
