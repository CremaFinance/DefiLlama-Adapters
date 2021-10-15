import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
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
        marginX={[8, 64]}
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
      {[0, 1, 2].map((index) => {
        return (
          <SimpleGrid
            key={`info-item-${index}`}
            maxWidth="1120"
            margin="0 auto"
            columns={[1, 1, 2]}
            mb={[8, 8, 32]}
          >
            <Box
              gridColumn={[
                index % 2 ? 1 : 2,
                index % 2 ? 1 : 2,
                index % 2 ? 2 : 1,
              ]}
              p="2"
            >
              <Heading mb={4} fontWeight="bold">
                <Box display="inline-block" color={colors.green}>
                  {t(`indexPage.info-section-items.${index}.emphasis`)}
                </Box>{" "}
                {t(`indexPage.info-section-items.${index}.heading`)}
              </Heading>

              <Text mb={4} fontSize="22">
                {t(`indexPage.info-section-items.${index}.desc`)}
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
                  &quot;{t(`indexPage.info-section-items.${index}.quote`)}&quot;
                </Text>
                <Box display="flex" alignItems="center">
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
                    {t(`indexPage.info-section-items.${index}.name`)},
                  </Text>
                  <Text display="inline-block" fontSize="14">
                    {t(`indexPage.info-section-items.${index}.company`)}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box p={[2, 2, 5]} gridRow={1} gridColumn={index % 2 ? 1 : 2}>
              <Image
                src={`/ilustrations/how-it-works${index + 1}.svg`}
                layout="fill"
                objectFit="contain"
                height={[200, 200, 400]}
                position="relative"
                width={["100%", "100%", 640]}
              />
            </Box>
          </SimpleGrid>
        );
      })}
    </Box>
  );
}
