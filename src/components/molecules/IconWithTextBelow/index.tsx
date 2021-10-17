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
  titleSize?: "h1" | "h2" | "h3" | "h4" | "h5";
  subtitleSize?: number | string;
  maxWidth?: string;
  titleColor?: string;
  subtitleColor?: string;
  marginX?: number;
};

const IconWithTextBelow = ({
  icon,
  title,
  subtitle,
  externalUrl,
  height = 100,
  opacity = "1",
  marginTop = 0,
  titleSize = "h4",
  subtitleSize = 18,
  maxWidth = "16rem",
  titleColor = colors.white,
  subtitleColor = colors.white800,
  marginX = 0,
}: IconWithTextBelowProps) => {
  const { t } = useTranslation();

  return (
    <Square
      display="flex"
      flexDirection="column"
      flex="1"
      marginBottom="4"
      marginTop={marginTop}
      maxWidth={maxWidth}
      marginX={marginX}
    >
      <Image
        src={icon}
        opacity={opacity}
        height={height}
        alt={`${title} Logo`}
      />
      <Heading
        as={titleSize}
        color={titleColor}
        marginBottom="8"
        marginTop="8"
        wordBreak="keep-all"
        textAlign="center"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text color={subtitleColor} textAlign="center" fontSize={subtitleSize}>
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
