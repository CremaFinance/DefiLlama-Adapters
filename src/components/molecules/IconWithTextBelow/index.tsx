import { Image, Square } from "@chakra-ui/react";
import htmlParser from "html-react-parser";
import { useTranslation } from "next-export-i18n";

import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

type IconWithTextBelowProps = {
  icon: string;
  title: string;
  subtitle?: string;
  externalUrl?: string;
  height?: number;
  width?: string;
  opacity?: string;
  marginTop?: number;
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
  width = "auto",
  opacity = "1",
  marginTop = 0,
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
        width={width}
        alt={`${title} Logo`}
      />
      <MText
        color={titleColor}
        marginBottom="4"
        marginTop="8"
        wordBreak="keep-all"
        type="heading-xsm"
        textAlign="center"
      >
        {title}
      </MText>
      {subtitle && (
        <MText type="text-lg" color={subtitleColor} textAlign="center">
          {htmlParser(subtitle)}
        </MText>
      )}
      {externalUrl && (
        <MLink
          font="text-xl-bold"
          mt="6"
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
        </MLink>
      )}
    </Square>
  );
};

export default IconWithTextBelow;
