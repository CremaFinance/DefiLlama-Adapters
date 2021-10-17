import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import InfoPostItem from "components/molecules/InfoPostItem";
import colors from "styles/customTheme/colors";

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <Box
      paddingTop="24"
      paddingBottom={[8, 8, 0]}
      bg="greenLight"
      as="section"
      aria-label="info-section"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading
        alignSelf="center"
        textAlign="center"
        maxWidth="720"
        fontWeight="bold"
      >
        {t("indexPage.info-section-title")}
      </Heading>
      <Box
        display="flex"
        alignItems="flex-start"
        flexWrap="wrap"
        flexDirection={["column", "row"]}
        justifyContent="space-around"
        marginX={[8, 40]}
        marginTop={4}
      >
        {[0, 1, 2].map((index) => {
          return (
            <IconWithTextBelow
              marginTop={8}
              key={`info-item-${index}`}
              icon={`/icons/${index + 1}.svg`}
              titleColor={colors.black}
              subtitleColor={colors.black}
              title={t(`indexPage.info-section-step-items.${index}.title`)}
              subtitle={t(
                `indexPage.info-section-step-items.${index}.subtitle`
              )}
            />
          );
        })}
      </Box>
      <Box
        marginTop="4"
        marginBottom="112"
        display="flex"
        justifyContent="center"
      >
        <Button
          bg={colors.green}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.green}
          width="200px"
          rounded="md"
        >
          {t("indexPage.info-section-action")}
        </Button>
      </Box>

      <InfoPostItem
        titleEmphasis={t("indexPage.info-section-items.0.emphasis")}
        title={t("indexPage.info-section-items.0.heading")}
        description={t("indexPage.info-section-items.0.desc")}
        quote={t("indexPage.info-section-items.0.quote")}
        quoteAuthor={t("indexPage.info-section-items.0.name")}
        authorCompany={t("indexPage.info-section-items.0.company")}
        image="/ilustrations/how-it-works1.svg"
      />

      <Flex
        maxWidth="1120"
        marginX="auto"
        flexDirection={["column-reverse", "row-reverse"]}
        mb={[8, 32]}
      >
        <Box maxWidth="500" marginX={[4, 0]}>
          <Heading mb={4} fontWeight="bold">
            <Box display="inline-block" color={colors.green} mr={1}>
              {t("indexPage.info-section-items.1.emphasis")}
            </Box>
            {t("indexPage.info-section-items.1.heading")}
          </Heading>

          <Text mb={4} fontSize="22">
            {t("indexPage.info-section-items.1.desc")}
          </Text>

          <Button
            variant="link"
            color={colors.black}
            bg="none"
            rightIcon={<HiArrowRight />}
            mb={8}
          >
            {t("indexPage.read-more")}
          </Button>

          <Box
            bg={colors.marinadeLighterGreen}
            height="160"
            maxWidth="480"
            p={5}
            rounded="md"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Text mb={2} fontSize="14">
              &quot;{t("indexPage.info-section-items.1.quote")}&quot;
            </Text>
            <Box display="flex" alignItems="center">
              {/* TODO: replace with actual logo/image */}
              <Box
                bg={colors.black}
                rounded="full"
                height="32px"
                width="32px"
                mr="2"
              />

              <Text
                display="inline-block"
                fontSize="14"
                fontWeight="bold"
                mr={2}
              >
                {t("indexPage.info-section-items.1.name")},
              </Text>
              <Text display="inline-block" fontSize="14">
                {t("indexPage.info-section-items.1.company")}
              </Text>
            </Box>
          </Box>
        </Box>

        <Image
          src="/ilustrations/how-it-works2.svg"
          layout="fill"
          objectFit="contain"
          p={[2, 5]}
          height={[200, 400]}
          position="relative"
          width={["100%", 640]}
        />
      </Flex>

      <Flex
        maxWidth="1120"
        marginX="auto"
        flexDirection={["column-reverse", "row"]}
        mb={[8, 32]}
      >
        <Box width="500" marginX={[4, 0]}>
          <Heading mb={4} fontWeight="bold">
            <Box display="inline-block" color={colors.green}>
              {t("indexPage.info-section-items.2.emphasis")}
            </Box>{" "}
            {t("indexPage.info-section-items.2.heading")}
          </Heading>

          <Text mb={4} fontSize="22">
            {t("indexPage.info-section-items.2.desc")}
          </Text>

          <Button
            variant="link"
            color={colors.black}
            bg="none"
            rightIcon={<HiArrowRight />}
            mb={8}
          >
            {t("indexPage.read-more")}
          </Button>

          <Box
            bg={colors.marinadeLighterGreen}
            height="160"
            maxWidth="480"
            p={5}
            rounded="md"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Text mb={2} fontSize="14">
              &quot;{t("indexPage.info-section-items.2.quote")}&quot;
            </Text>
            <Box display="flex" alignItems="center">
              {/* TODO: replace with actual logo/image */}
              <Box
                bg={colors.black}
                rounded="full"
                height="32px"
                width="32px"
                mr="2"
              />

              <Text
                display="inline-block"
                fontSize="14"
                fontWeight="bold"
                mr={2}
              >
                {t("indexPage.info-section-items.2.name")},
              </Text>
              <Text display="inline-block" fontSize="14">
                {t("indexPage.info-section-items.0.company")}
              </Text>
            </Box>
          </Box>
        </Box>

        <Image
          src="/ilustrations/how-it-works3.svg"
          layout="fill"
          objectFit="contain"
          p={[2, 5]}
          height={[200, 512]}
          right="0"
          left={[0, 500]}
          width={["100%", 730]}
        />
      </Flex>
    </Box>
  );
}
