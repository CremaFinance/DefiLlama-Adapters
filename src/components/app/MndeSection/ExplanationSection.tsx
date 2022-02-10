import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

import MButton from "../../atoms/Button";
import CardWithIlustration from "components/molecules/CardWithIlustration";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const ExplanationSection: FunctionComponent = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();

  const activeMenu = {
    opacity: 1,
    borderBottom: `3px solid`,
    borderColor: colors.black,
    color: colors.black,
    fontWeight: "bold",
    mb: 0,
  };

  const lockMndeButton = (
    <MButton
      variant="link"
      alignSelf="start"
      color={colors.black}
      rounded="none"
      fontWeight="bold"
      font="text-2xl"
      py="9px"
      ml="0"
      mb="3px"
      mt={14}
      _active={activeMenu}
      _hover={activeMenu}
      onClick={() => router.push("/app/mnde")}
    >
      Lock your MNDE
      <Image src="/icons/arrow-right.svg" width="16px" alt="Lock MNDE" ml={2} />
    </MButton>
  );

  const renderHeaderText = (index: number): JSX.Element[] => {
    const colorMap: { [key: string]: string } = {
      green: colors.marinadeGreen,
      black: colors.black,
    };
    return ["green", "black"].map((color) => {
      return (
        <Text
          color={colorMap[color]}
          textAlign="left"
          fontWeight="bold"
          fontSize={["30px", "43.95px"]}
          lineHeight={["35px", "48px"]}
          ml={0}
        >
          {t(`mndePage.explanation-section.items.${index}.header.${color}`)}
        </Text>
      );
    });
  };

  const renderCardWithIlustration = (index: number): JSX.Element => {
    return (
      <CardWithIlustration
        key={`card-with-ilustration-${index}`}
        header={
          <Box pb={4} alignSelf="start">
            {renderHeaderText(index)}
          </Box>
        }
        text={t(`mndePage.explanation-section.items.${index}.text`) || ""}
        ilustrationData={{
          src: `/ilustrations/explanation-section-${index}.svg`,
          alt:
            t(`mndePage.explanation-section.items.${index}.ilustration-alt`) ||
            "",
          width: index === 2 ? 363 : undefined,
        }}
        footer={index === 0 ? lockMndeButton : undefined}
        reverseSections={index % 2 !== 0}
      />
    );
  };

  return (
    <Flex
      aria-label="explanation-section"
      direction="column"
      px={{ base: 4, md: "12vw" }}
      pt={8}
      pb={20}
      gap={{ base: 50, lg: 120 }}
    >
      {[0, 1, 2].map(renderCardWithIlustration)}
    </Flex>
  );
};

export default ExplanationSection;
