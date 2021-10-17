import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { HiArrowRight } from "react-icons/hi";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function InfoSection() {
  const { t } = useTranslation();

  const readMode = t("indexPage.read-more");

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
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="center"
        marginTop={4}
      >
        {[0, 1, 2].map((index) => {
          return (
            <IconWithTextBelow
              marginTop={8}
              marginX={8}
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
      </Flex>
      <Box
        marginTop="4"
        marginBottom="96px"
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
      <Flex flexDirection="column" alignItems="center">
        <Flex mb={[16, 24]} pr={[0, 640]} ml={[0, 8]} position="relative">
          <Box mt={[280, 4]} maxWidth="504" marginX={4} zIndex={4}>
            <Heading mb={4} fontWeight="bold">
              <Box display="inline-block" color={colors.green}>
                {t("indexPage.info-section-items.0.emphasis")}
              </Box>{" "}
              {t("indexPage.info-section-items.0.heading")}
            </Heading>

            <Text mb={4} fontSize="22">
              {t("indexPage.info-section-items.0.desc")}
            </Text>

            <Button
              variant="link"
              color={colors.black}
              bg="none"
              rightIcon={<HiArrowRight />}
              mb={8}
            >
              {readMode}
            </Button>

            <Box
              bg={colors.marinadeLighterGreen}
              height="160"
              width="520"
              p={4}
              mt={4}
              rounded="md"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Text mb={2} fontSize="14">
                &quot;{t("indexPage.info-section-items.0.quote")}&quot;
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
                  {t("indexPage.info-section-items.0.name")},
                </Text>
                <Text display="inline-block" fontSize="14">
                  {t("indexPage.info-section-items.0.company")}
                </Text>
              </Box>
            </Box>
          </Box>

          <Image
            src="/ilustrations/how-it-works1.svg"
            p={[2, 4]}
            position="absolute"
            height={[280, 440]}
            overflow="hidden"
            width={["100vw", 640]}
            right={0}
            top={0}
          />
        </Flex>

        <Flex mb={[16, 24]} pl={[0, 640]} mr={[0, 8]} position="relative">
          <Box mt={[280, 4]} maxWidth="504" marginX={4} zIndex={4}>
            <Heading mb={4} fontWeight="bold">
              <Box display="inline-block" color={colors.green}>
                {t("indexPage.info-section-items.1.emphasis")}
              </Box>{" "}
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
              {readMode}
            </Button>

            <Box
              bg={colors.marinadeLighterGreen}
              height="160"
              width="520"
              p={4}
              mt={4}
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
            p={[2, 4]}
            position="absolute"
            height={[280, 440]}
            overflow="hidden"
            width={["100vw", 720]}
            left={[0, -4]}
            top={[0, 8]}
          />
        </Flex>

        <Flex mb={[16, 16]} pr={[0, 560]} mr={[0, 8]} position="relative">
          <Box mt={[328, 0]} maxWidth="504" marginX={4} zIndex={4}>
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
              {readMode}
            </Button>

            <Box
              bg={colors.marinadeLighterGreen}
              height="160"
              width="520"
              p={4}
              mt={4}
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
                  {t("indexPage.info-section-items.2.company")}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            height={[320, 560]}
            width={[640, 800]}
            position="absolute"
            right={[2, 0]}
            left={["-80px", 372]}
            top={[0, -8]}
            p={[0, 4]}
          >
            <Image
              src="/ilustrations/how-it-works3.svg"
              position="relative"
              height={[360, 560]}
              width={[440, 800]}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
