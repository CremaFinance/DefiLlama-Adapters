import {
  Grid,
  Box,
  Heading,
  Button,
  SimpleGrid,
  Center,
  Image,
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
        marginBottom="120"
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
            maxWidth="1000"
            margin="0 auto"
            columns={[1, 1, 2]}
            mb={[8, 8, 16]}
          >
            <Box
              gridColumn={[
                index % 2 ? 1 : 2,
                index % 2 ? 1 : 2,
                index % 2 ? 2 : 1,
              ]}
              p={[2, 2, 5]}
            >
              <Heading mb={4} fontWeight="bold">
                <Box display="inline-block" color="green">
                  {t(`indexPage.info-section-items.${index}.emphasis`)}
                </Box>{" "}
                {t(`indexPage.info-section-items.${index}.heading`)}
              </Heading>

              <Box mb={4}>
                {t(`indexPage.info-section-items.${index}.desc`)}
              </Box>

              <Box mb={6}>
                <Button
                  variant="link"
                  color="black"
                  bg="none"
                  rightIcon={<HiArrowRight />}
                >
                  Read more
                </Button>
              </Box>

              <Box bg="#ffffff66" p={5} rounded="md">
                <Box mb={2} fontSize="sm">
                  &quot;{t(`indexPage.info-section-items.${index}.quote`)}&quot;
                </Box>
                <Grid templateColumns="24px calc(100% - 24px)">
                  <Box>
                    <Center height="100%">
                      <Box
                        bg="black"
                        rounded="full"
                        height="24px"
                        width="24px"
                      />
                    </Center>
                  </Box>

                  <Box pl={3}>
                    <Box display="inline-block" fontWeight="bold" mr={2}>
                      {t(`indexPage.info-section-items.${index}.name`)}
                    </Box>
                    <Box display="inline-block">
                      {t(`indexPage.info-section-items.${index}.company`)}
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>

            <Box p={[2, 2, 5]} gridRow={1} gridColumn={index % 2 ? 1 : 2}>
              <Center height="100%">
                <Box
                  height={[200, 200, "380"]}
                  position="relative"
                  width={["100%", "100%", 380]}
                  transform={`scaleX(${index % 2 ? -1 : 1})`}
                >
                  <Image
                    src="/octo-chef.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Center>
            </Box>
          </SimpleGrid>
        );
      })}
    </Box>
  );
}
