import { Box, Flex, Image, Icon, Link, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import IconWithTextBelow from "components/molecules/IconWithTextBelow";
import colors from "styles/customTheme/colors";

export default function InfoSection() {
  const router = useRouter();
  const { t } = useTranslation();

  const [isWiderThan1050] = useMediaQuery("(min-width: 1050px)");

  const readMode = t("indexPage.read-more");
  const columnReverse = "column-reverse";

  return (
    <Flex
      paddingTop={24}
      paddingBottom={[8, 0]}
      bg={colors.greenLight}
      as="section"
      aria-label="info-section"
      flexDirection="column"
      alignItems="stretch"
      overflow="hidden"
      position="relative"
    >
      <MHeading
        mt={6}
        type="heading-md"
        alignSelf="center"
        textAlign="center"
        maxWidth="720"
        fontWeight="bold"
      >
        {t("indexPage.info-section-title")}
      </MHeading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "unset", lg: "center" }}
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
      <Box marginBottom="104px" mt={4} display="flex" justifyContent="center">
        <MButton
          font="text-xl"
          bg={colors.marinadeGreen}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.marinadeGreen}
          width="200px"
          height="48px"
          rounded="md"
          onClick={() => router.push("/app/staking")}
        >
          {t("indexPage.info-section-action")}
        </MButton>
      </Box>
      <Flex mt={4} mb={[0, 24]} flexDirection="column" alignItems="center">
        <Flex
          mb={[16, 24]}
          flexDirection={isWiderThan1050 ? "row" : columnReverse}
          alignItems="center"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "40vw", "2xl": "24vw" }}
            marginX={{ base: 4, lg: 8 }}
            zIndex={4}
            mr={{ base: 4, lg: "40vw", "2xl": "24vw" }}
          >
            <MHeading mb={6} fontWeight="bold" type="heading-md">
              <MHeading
                as="span"
                type="heading-md"
                color={colors.marinadeGreen}
              >
                {t("indexPage.info-section-items.0.emphasis")}
              </MHeading>{" "}
              {t("indexPage.info-section-items.0.heading")}
            </MHeading>

            <MText mb={6} pr={8} type="text-2xl">
              {t("indexPage.info-section-items.0.desc")}
            </MText>

            <MButton
              font="text-xl"
              variant="link"
              color={colors.black}
              bg="none"
              _hover={{ textDecoration: "underline" }}
              rightIcon={
                <Icon
                  as={FiExternalLink}
                  width="16px"
                  height="16px"
                  cursor="pointer"
                />
              }
              mb={8}
            >
              <Link
                as={Link}
                target="_blank"
                href="https://docs.marinade.finance/faq/faq#unstake-now"
                _hover={{ textDecoration: "none" }}
                rel="noreferrer noopener"
                _focus={{ boxShadow: "none" }}
              >
                {readMode}
              </Link>
            </MButton>

            <Flex
              bg={colors.marinadeLighterGreen}
              width={{ base: "88vw", md: "60vw", lg: "34vw", "2xl": "24vw" }}
              p={6}
              mt={4}
              rounded="md"
              flexDirection="column"
              justifyContent="space-around"
            >
              <MText mb={2} type="text-xl" wordBreak="normal">
                &quot;{t("indexPage.info-section-items.0.quote")}&quot;
              </MText>
              <Flex alignItems="center">
                <Image
                  src="icons/raydium-color.svg"
                  height="32px"
                  width="32px"
                  mr={2}
                />
                <MText type="text-md" wordBreak="normal">
                  <MText as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.0.name")}
                  </MText>
                  {", "}
                  {t("indexPage.info-section-items.0.company")}
                </MText>
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
              "2xl": "24vw",
            }}
            ml={{ base: 0, lg: "40vw", "2xl": "26vw" }}
            mb={{ base: 8, lg: 16, "2xl": 0 }}
          />
        </Flex>

        <Flex
          mt={[0, 8]}
          mb={[16, 24]}
          flexDirection={{ base: columnReverse, lg: "row" }}
          alignItems="center"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "32vw", "2xl": "24vw" }}
            marginX={{ base: 4, lg: 0 }}
            zIndex={4}
            ml={{ base: 4, lg: "40vw", "2xl": "24vw" }}
          >
            <MHeading mb={6} fontWeight="bold" type="heading-md">
              <MHeading
                as="span"
                type="heading-md"
                color={colors.marinadeGreen}
              >
                {t("indexPage.info-section-items.1.emphasis")}
              </MHeading>{" "}
              {t("indexPage.info-section-items.1.heading")}
            </MHeading>

            <MText mt={6} mb={4} type="text-2xl">
              {t("indexPage.info-section-items.1.desc")}
            </MText>

            <MButton
              font="text-xl"
              variant="link"
              color={colors.black}
              bg="none"
              _hover={{ textDecoration: "underline" }}
              rightIcon={
                <Icon
                  as={FiExternalLink}
                  width="16px"
                  height="16px"
                  cursor="pointer"
                />
              }
              mb={8}
              mt={2}
            >
              <Link
                as={Link}
                target="_blank"
                href="https://docs.marinade.finance/marinade-protocol/validators"
                _hover={{ textDecoration: "none" }}
                rel="noreferrer noopener"
                _focus={{ boxShadow: "none" }}
              >
                {readMode}
              </Link>
            </MButton>

            <Flex
              bg={colors.marinadeLighterGreen}
              width={{ base: "88vw", md: "60vw", lg: "34vw", "2xl": "24vw" }}
              p={6}
              mt={4}
              rounded="md"
              flexDirection="column"
              justifyContent="space-around"
            >
              <MText mb={2} type="text-xl" wordBreak="normal">
                &quot;{t("indexPage.info-section-items.1.quote")}&quot;
              </MText>
              <Box display="flex" alignItems="center">
                <Image
                  src="/icons/solana-foundation.svg"
                  height="32px"
                  width="32px"
                  mr={2}
                />
                <MText type="text-md" wordBreak="normal">
                  <MText as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.1.name")}
                  </MText>
                  {", "}
                  {t("indexPage.info-section-items.1.company")}
                </MText>
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
              "2xl": "24vw",
            }}
            ml={{ base: 0, lg: -8 }}
            mb={8}
          />
        </Flex>

        <Flex
          mt={[0, 8]}
          mb={16}
          flexDirection={{ base: columnReverse, lg: "row" }}
          alignItems="center"
        >
          <Box
            width={{ base: "88vw", md: "60vw", lg: "36vw", "2xl": "24vw" }}
            marginX={{ base: 4, lg: 0 }}
            zIndex={4}
            mr={{ base: 4, lg: "40vw", "2xl": "24vw" }}
          >
            <MHeading mb={4} fontWeight="bold" type="heading-md">
              <MHeading
                as="span"
                display="inline-block"
                type="heading-md"
                color={colors.marinadeGreen}
              >
                {t("indexPage.info-section-items.2.emphasis")}
              </MHeading>{" "}
              {t("indexPage.info-section-items.2.heading")}
            </MHeading>

            <MText my={6} pr={4} type="text-2xl">
              {t("indexPage.info-section-items.2.desc")}
            </MText>

            <MButton
              font="text-xl"
              variant="link"
              color={colors.black}
              bg="none"
              _hover={{ textDecoration: "underline" }}
              rightIcon={<Image src="/icons/arrow-right.svg" width="0.8rem" />}
              mb={8}
              onClick={() => router.push("/app/defi")}
            >
              {t("indexPage.info-section-items.2.explore-defi")}
            </MButton>

            <Box
              bg={colors.marinadeLighterGreen}
              width={{ base: "88vw", md: "60vw", lg: "34vw", "2xl": "24vw" }}
              p={6}
              mt={4}
              rounded="md"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <MText mb={2} type="text-xl" wordBreak="normal">
                &quot;{t("indexPage.info-section-items.2.quote")}&quot;
              </MText>
              <Box display="flex" alignItems="center">
                <Image
                  src="/icons/saber.svg"
                  height="32px"
                  width="32px"
                  mr={2}
                />
                <MText type="text-md" wordBreak="normal">
                  <MText as="span" display="inline-block" fontWeight="bold">
                    {t("indexPage.info-section-items.2.name")}
                  </MText>
                  {", "}
                  {t("indexPage.info-section-items.2.company")}
                </MText>
              </Box>
            </Box>
          </Box>

          <Image
            position={{ base: "relative", lg: "absolute" }}
            src="/ilustrations/how-it-works3.svg"
            width={{ base: "100vw", md: "72vw", lg: "52vw", "2xl": "32vw" }}
            height={{ base: 320, md: "auto" }}
            mr={[2, 0]}
            ml={{ base: 0, lg: "26vw", "2xl": "18vw" }}
            mt={{ base: 0, lg: 8 }}
            mb={{ base: 8, lg: 0 }}
            objectPosition={{ base: "right", sm: "center", md: "right" }}
            objectFit={{ base: "cover", sm: "contain" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
