import { Box, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
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

  const renderHeaderText = (index: number): JSX.Element => {
    return (
      <MHeading mb={6} fontWeight="bold" type="heading-md">
        <MHeading as="span" type="heading-md" color={colors.marinadeGreen}>
          {t(`mndePage.explanation-section.items.${index}.header.green`)}
        </MHeading>{" "}
        {t(`mndePage.explanation-section.items.${index}.header.black`)}
      </MHeading>
    );
  };

  const renderCardWithIlustration = (index: number): JSX.Element => {
    return (
      <CardWithIlustration
        key={`card-with-ilustration-${index}`}
        header={<Box alignSelf="start">{renderHeaderText(index)}</Box>}
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
