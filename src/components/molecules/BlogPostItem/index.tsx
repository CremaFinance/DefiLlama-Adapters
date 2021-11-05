import { Container, Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

type SectionProps = {
  title: string;
  content: string;
  link: string;
  date: string;
};

const BlogPostItem = ({ title, content, link, date }: SectionProps) => {
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

  const { t } = useTranslation();

  function parseContent() {
    let textToShow = content.replace(/<[^>]+>/g, "");
    textToShow = textToShow?.trimEnd();
    return `${textToShow.slice(0, 100)}...`;
  }

  return (
    <Flex
      flexDirection="column"
      px={3}
      py={8}
      mb="10"
      bg={colors.white}
      width={352}
      height={[340, 360]}
      mx={3}
      alignItems="center"
      rounded="md"
    >
      <MText mb={4} type="text-xl" color={colors.black600}>
        {parseDate(date)}
      </MText>

      <MHeading textAlign="center" mt={4} type="heading-xsm">
        {title}
      </MHeading>

      <Container
        flex={1}
        textAlign="center"
        fontSize="18px"
        mt={4}
        type="text-lg"
      >
        {parseContent()}
      </Container>

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
