import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function InfoSection() {
  const { t } = useTranslation();

  const [isWiderThan1050] = useMediaQuery("(min-width: 1050px)");

  const readMode = t("indexPage.read-more");
  const columnReverse = "column-reverse";

  return (
    <Flex
      paddingTop="16"
      paddingBottom={[8, 0]}
      bg="greenLight"
      as="section"
      aria-label="info-section"
      flexDirection="column"
      alignItems="stretch"
      overflow="hidden"
      position="relative"
    >
      <Heading
        mt={8}
        alignSelf="center"
        textAlign="center"
        maxWidth="720"
        fontWeight="bold"
      >
        {t("indexPage.info-section-title")}
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
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
      <Box marginBottom="104px" display="flex" justifyContent="center">
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
      <Flex mt={4} mb={[0, 24]} flexDirection="column" alignItems="center">
        <Flex
          mb={[16, 24]}
          flexDirection={isWiderThan1050 ? "row" : columnReverse}
          alignItems="center"
          overflow="hidden"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "40vw" }}
            marginX={{ base: 4, lg: 8 }}
            zIndex={4}
            mr={{ base: 4, lg: "40vw" }}
          >
            <Heading mb={4} fontWeight="bold">
              <Box as="span" display="inline-block" color={colors.green}>
                {t("indexPage.info-section-items.0.emphasis")}
              </Box>{" "}
              {t("indexPage.info-section-items.0.heading")}
            </Heading>

            <Text mb={4} pr={8} fontSize={["16", "22"]}>
              {t("indexPage.info-section-items.0.desc")}
            </Text>

            <Button
              variant="link"
              color={colors.black}
              bg="none"
              rightIcon={<Image src="/icons/arrow-right.svg" width="0.8rem" />}
              mb={8}
            >
              {readMode}
            </Button>

            <Flex
              bg={colors.marinadeLighterGreen}
              height={{ base: "auto", md: "160px" }}
              width={{ base: "88vw", md: "60vw", lg: "34vw" }}
              p={4}
              mt={4}
              rounded="md"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Text mb={2} fontSize="14">
                &quot;{t("indexPage.info-section-items.0.quote")}&quot;
              </Text>
              <Flex alignItems="center">
                {/* TODO: replace with actual logo/image */}
                <Box
                  bg={colors.black}
                  rounded="full"
                  height="32px"
                  width="32px"
                  mr="2"
                />
                <Text fontSize="14">
                  <Box as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.0.name")}
                  </Box>
                  {", "}
                  {t("indexPage.info-section-items.0.company")}
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Image
            position={{
              base: "relative",
              lg: "absolute",
            }}
            src="/ilustrations/how-it-works1.svg"
            width={{
              base: "88vw",
              md: "72vw",
              lg: "44vw",
            }}
            ml={{ base: 0, lg: "40vw" }}
            mb={{ base: 8, lg: 16 }}
          />
        </Flex>

        <Flex
          mt={[0, 4]}
          mb={[16, 24]}
          flexDirection={{ base: columnReverse, lg: "row" }}
          alignItems="center"
          overflow="hidden"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "32vw" }}
            marginX={{ base: 4, lg: 0 }}
            zIndex={4}
            ml={{ base: 4, lg: "40vw" }}
          >
            <Heading mb={4} fontWeight="bold">
              <Box as="span" display="inline-block" color={colors.green}>
                {t("indexPage.info-section-items.1.emphasis")}
              </Box>{" "}
              {t("indexPage.info-section-items.1.heading")}
            </Heading>

            <Text mb={4} fontSize={["16", "22"]}>
              {t("indexPage.info-section-items.1.desc")}
            </Text>

            <Button
              variant="link"
              color={colors.black}
              bg="none"
              rightIcon={<Image src="/icons/arrow-right.svg" width="0.8rem" />}
              mb={8}
            >
              {readMode}
            </Button>

            <Flex
              bg={colors.marinadeLighterGreen}
              height={{ base: "auto", md: "160px" }}
              width={{ base: "88vw", md: "60vw", lg: "34vw" }}
              p={4}
              mt={4}
              rounded="md"
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
                  mr={2}
                />
                <Text fontSize="14">
                  <Box as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.1.name")}
                  </Box>
                  {", "}
                  {t("indexPage.info-section-items.1.company")}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Image
            position={{ base: "relative", lg: "absolute" }}
            src="/ilustrations/how-it-works2.svg"
            width={{
              base: "88vw",
              md: "72vw",
              lg: "40vw",
            }}
            ml={{ base: 0, lg: -8 }}
            mt={{ base: 0, lg: -8 }}
            mb={{ base: 8, lg: 0 }}
          />
        </Flex>

        <Flex
          mt={[0, 1]}
          mb={[16, 16]}
          flexDirection={{ base: columnReverse, lg: "row" }}
          alignItems="center"
          overflow="hidden"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "36vw" }}
            marginX={{ base: 4, lg: 0 }}
            zIndex={4}
            mr={{ base: 4, lg: "40vw" }}
          >
            <Heading mb={4} fontWeight="bold">
              <Box as="span" display="inline-block" color={colors.green}>
                {t("indexPage.info-section-items.2.emphasis")}
              </Box>{" "}
              {t("indexPage.info-section-items.2.heading")}
            </Heading>

            <Text mb={4} fontSize={["16", "22"]}>
              {t("indexPage.info-section-items.2.desc")}
            </Text>

            <Button
              variant="link"
              color={colors.black}
              bg="none"
              rightIcon={<Image src="/icons/arrow-right.svg" width="0.8rem" />}
              mb={8}
            >
              {readMode}
            </Button>

            <Box
              bg={colors.marinadeLighterGreen}
              height={{ base: "auto", md: "160px" }}
              width={{ base: "88vw", md: "60vw", lg: "34vw" }}
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
                <Image
                  src="/ian-macalinao.jpeg"
                  rounded="full"
                  height="32px"
                  width="32px"
                  mr="2"
                />
                <Text fontSize="14">
                  <Box as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.2.name")}
                  </Box>
                  {", "}
                  {t("indexPage.info-section-items.2.company")}
                </Text>
              </Box>
            </Box>
          </Box>

          <Image
            position={{ base: "relative", lg: "absolute" }}
            src="/ilustrations/how-it-works3.svg"
            width={{ base: "100vw", md: "72vw", lg: "52vw" }}
            height={{ base: 320, md: "auto" }}
            mr={[2, 0]}
            ml={{ base: 0, lg: "26vw" }}
            mt={{ base: 0, lg: 8 }}
            mb={{ base: 8, lg: 0 }}
            objectPosition="right"
            objectFit={{ base: "cover", lg: "contain" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
