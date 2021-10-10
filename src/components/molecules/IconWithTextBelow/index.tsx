import { ExternalLinkIcon } from "@chakra-ui/icons";
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
      maxWidth="17em"
    >
      <Image
        src={icon}
        opacity={opacity}
        height={height}
        alt={`${title} Logo`}
      />
      <Heading
        as="h3"
        color={colors.white}
        marginBottom="4"
        marginTop="4"
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
        <Link mt="4" href={externalUrl} isExternal color={colors.greenVibrant}>
          {t("indexPage.read-more")}
          <ExternalLinkIcon mb="0.5" ml="1" />
        </Link>
      )}
    </Square>
  );
};

export default IconWithTextBelow;
