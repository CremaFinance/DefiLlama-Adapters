import { HStack, Button, Image, Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const HeroSection = () => {
  const { t } = useTranslation("index");

  return (
    <Box
      py="72px"
      pb={8}
      bg="#C8ECE1"
      position="relative"
      height="100vh"
      minHeight="650px"
    >
      <Box
        pt={[5, 5, "10vh"]}
        pl={[0, 0, 10]}
        position="relative"
        zIndex={10}
        textAlign={["center", "center", "left"]}
      >
        <Box mb={[2, 2, 4]}>
          <Heading color="#08B898" fontWeight="bold">
            {t("hero-section-title")}
          </Heading>

          <Heading fontWeight="bold" maxWidth={300}>
            {t("hero-section-subtitle")}
          </Heading>
        </Box>

        <Box mb={[2, 2, 4]} maxWidth={300}>
          <Box>{t("hero-section-desc")}</Box>
        </Box>

        <Box mb={[2, 2, 4]}>
          <Button
            bg="#308D8A"
            _hover={{ bg: "#308D8Aaa" }}
            _active={{ bg: "#308D8A77" }}
            color="white"
            rounded="md"
          >
            {t("hero-section-button")}
          </Button>
        </Box>

        <Box fontSize="sm" color="gray.500">
          6.21% APY
        </Box>
      </Box>

      {/* friends chilling image */}

      <Box display={["none", "none", "block"]}>
        <Image
          src="./cloud-leaves.png"
          width="420px"
          position="absolute"
          top={"0"}
          right={0}
          zIndex={10}
        />
      </Box>
      <Box
        position={["relative", "relative", "absolute", "absolute"]}
        top={[0, 0, "10vh", "10vh"]}
        overflow="hidden"
        textAlign="center"
        right={0}
        my={[4, 4, "none"]}
      >
        <Image
          display="inline-block"
          position="relative"
          left={["0%", "5%", "0", "0"]}
          mt={[0, 0, 20, 8]}
          src="./beach-party.png"
          width={["100%", "90%", 600, "800px"]}
          alt="Hero"
        />
      </Box>

      <Box
        fontSize="lg"
        px={5}
        display={["block", "block", "none"]}
        textAlign="center"
      >
        {[0, 1, 2].map((index) => {
          return (
            <Box>
              <Box
                fontWeight="bold"
                display="inline-block"
                color="green"
                mr={2}
              >
                {t(`hero-section-stats.${index}.number`)}
              </Box>

              <Box fontWeight="bold" display="inline-block">
                {t(`hero-section-stats.${index}.desc`)}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        pl={10}
        position="absolute"
        bottom={12}
        display={["none", "none", "block"]}
      >
        <HStack spacing={8}>
          {[0, 1, 2].map((index) => {
            return (
              
                <HStack fontSize="lg">
                  <Heading size="md" fontWeight="bold" color="green">
                    {t(`hero-section-stats.${index}.number`)}
                  </Heading>

                  <Heading size="md" fontWeight="bold">
                    {t(`hero-section-stats.${index}.desc`)}
                  </Heading>
                </HStack>
            );
          })}


        </HStack>
      </Box>
    </Box>
  );
};

export default HeroSection;
