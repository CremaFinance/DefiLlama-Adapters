import {
  SimpleGrid,
  Flex,
  Tooltip,
  Center,
  Image,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import colors from "styles/customTheme/colors";

const LogoStripSection = () => {
  const { t } = useTranslation();

  const ecosystem = [
    {
      title: "Saber",
      image: "/logos/saber.svg",
    },

    {
      title: "Raydium",
      image: "/logos/raydium.svg",
    },

    {
      title: "Solend",
      image: "/logos/solend.svg",
    },

    {
      title: "Mercurial Finance",
      image: "/logos/mercurial-finance.svg",
    },

    {
      title: "Serum",
      image: "/logos/serum.svg",
    },

    {
      title: "Port",
      image: "/logos/port.svg",
    },

    {
      title: "Orca",
      image: "/logos/orca.svg",
    },

    {
      title: "Parrot Protocol",
      image: "/logos/parrot-protocol.svg",
    },
  ];

  return (
    <Box p={8} py={16} bg={colors.blackMate} as="section">
      <Heading
        size="md"
        textAlign="center"
        mb={4}
        color={colors.white}
        fontWeight="300"
      >
        {t("indexPage.logo-strip-section-title")}
      </Heading>

      {/* DESKTOP LAYOUT */}
      <Box textAlign="center">
        <Flex gap={4} display={["none", "none", "inline-flex"]}>
          {ecosystem.map((el) => {
            return (
              <Box
                flex={1}
                height="80px"
                width="90px"
                key={`ecosystem-${el.title}`}
              >
                <Center height="100%" color={colors.white}>
                  <Tooltip label={el.title} placement="bottom">
                    <Image
                      src={el.image}
                      width="50px"
                      objectFit="contain"
                      alt={el.title}
                    />
                  </Tooltip>
                </Center>
              </Box>
            );
          })}
        </Flex>

        {/* MOBILE LAYOUT */}
        <SimpleGrid
          columns={[2, 3]}
          spacing={4}
          display={["grid", "grid", "none"]}
        >
          {ecosystem.map((el) => {
            return (
              <Box
                flex={1}
                height="80px"
                width="90px"
                margin="0 auto"
                key={`ecosystem-${el.title}`}
              >
                <Center height="100%" color={colors.white}>
                  <Tooltip label={el.title} placement="bottom">
                    <Image
                      src={el.image}
                      width="50px"
                      objectFit="contain"
                      alt={el.title}
                    />
                  </Tooltip>
                </Center>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default LogoStripSection;
