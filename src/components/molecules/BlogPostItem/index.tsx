import { Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

type SectionProps = {
  title: string;
  link: string;
  date: string;
};

const BlogPostItem = ({ title, link, date }: SectionProps) => {
  function parseDate(dateString: string) {
    const jsDate = new Date(dateString);
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
    return `${jsDate.getDay()} ${
      months[jsDate.getMonth()]
    } ${jsDate.getFullYear()}`;
  }

  const { t } = useTranslation();

  return (
    <Flex
      flexDirection="column"
      flex="1"
      px={3}
      py={8}
      mb="10"
      bg={colors.white}
      maxWidth={260}
      mx={2}
      alignItems="center"
      rounded="md"
    >
      <MText mb={4} type="text-lg" color={colors.black600} letterSpacing={2}>
        {parseDate(date)}
      </MText>

      <MText textAlign="center" mt={4} type="heading-xsm" color={colors.black}>
        {title}
      </MText>

      <MLink
        font="text-xl-bold"
        variant="link"
        as="a"
        mt={8}
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
