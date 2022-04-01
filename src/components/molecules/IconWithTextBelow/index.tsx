import { Flex, Image } from "@chakra-ui/react";
import htmlParser from "html-react-parser";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

type IconWithTextBelowProps = {
  icon: string;
  title: string;
  subtitle?: string;
  externalUrl?: string;
  height?: number | string;
  width?: string;
  opacity?: string;
  marginBottom?: number;
  marginTop?: number;
  titleColor?: string;
  subtitleColor?: string;
  marginX?: number | string;
  singleLineTitle?: boolean;
};

const IconWithTextBelow = ({
  icon,
  title,
  subtitle,
  externalUrl,
  height = 100,
  width = "auto",
  opacity = "1",
  marginBottom = 4,
  marginTop = 0,
  titleColor = colors.white,
  subtitleColor = colors.white800,
  marginX = 0,
  singleLineTitle = false,
}: IconWithTextBelowProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDirection="column"
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginX={marginX}
      width="19rem"
      alignItems="center"
    >
      <Image
        src={icon}
        opacity={opacity}
        height={height}
        width={width}
        alt={`${title} Logo`}
      />
      <MHeading
        color={titleColor}
        marginBottom="4"
        marginTop="8"
        wordBreak="keep-all"
        whiteSpace={singleLineTitle ? "pre" : "unset"}
        type="heading-xsm"
        textAlign="center"
      >
        {title}
      </MHeading>
      {subtitle && (
        <MText type="text-xl" color={subtitleColor} textAlign="center">
          {htmlParser(subtitle)}
        </MText>
      )}
      {externalUrl && (
        <MLink
          font="text-xl-bold"
          mt="6"
          href={externalUrl}
          isExternal
          rel="noreferrer noopener"
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
    </Flex>
  );
};

export default IconWithTextBelow;
