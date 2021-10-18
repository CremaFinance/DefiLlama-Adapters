import { Heading, Image, Link, Text, Square } from "@chakra-ui/react";
import htmlParser from "html-react-parser";
import { useTranslation } from "next-export-i18n";

import colors from "styles/customTheme/colors";

type IconWithTextBelowProps = {
  icon: string;
  title: string;
  subtitle?: string;
  externalUrl?: string;
  height?: number;
  opacity?: string;
  marginTop?: number;
};

const IconWithTextBelow = ({
  icon,
  title,
  subtitle,
  externalUrl,
  height = 100,
  opacity = "1",
  marginTop = 0,
}: IconWithTextBelowProps) => {
  const { t } = useTranslation();

  return (
    <Square
      display="flex"
      flexDirection="column"
      flex="1"
      marginBottom="4"
      marginTop={marginTop}
      maxWidth="16em"
    >
      <Image
        src={icon}
        opacity={opacity}
        height={height}
        alt={`${title} Logo`}
      />
      <Heading
        as="h4"
        color={colors.white}
        marginBottom="4"
        marginTop="8"
        wordBreak="keep-all"
        textAlign="center"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text color={colors.white800} textAlign="center" fontSize="18">
          {htmlParser(subtitle)}
        </Text>
      )}
      {externalUrl && (
        <Link
          mt="4"
          href={externalUrl}
          isExternal
          color={colors.greenVibrant}
          fontWeight="bold"
          display="flex"
          flexDirection="row"
        >
          {t("indexPage.read-more")}
          <Image
            src="/icons/external-link-green.svg"
            width="1rem"
            marginLeft="10px"
          />
        </Link>
      )}
    </Square>
  );
};

export default IconWithTextBelow;
