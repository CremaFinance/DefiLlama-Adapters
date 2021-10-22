import { Flex, Image, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import colors from "styles/customTheme/colors";

const LogoStripSection = () => {
  const { t } = useTranslation();

  const ecosystem = [
    {
      title: "Saber",
      image: "/logos/saber.svg",
      href: "https://saber.so/",
    },

    {
      title: "Raydium",
      image: "/logos/raydium.svg",
      href: "https://raydium.io/",
    },

    {
      title: "Solend",
      image: "/logos/solend.svg",
      href: "https://solend.fi/",
    },

    {
      title: "Mercurial Finance",
      image: "/logos/mercurial.svg",
      href: "https://mercurial.finance/",
    },

    {
      title: "Serum",
      image: "/logos/serum.svg",
      href: "https://www.projectserum.com/",
    },

    {
      title: "Port",
      image: "/logos/port.svg",
      href: "https://port.finance/",
    },

    {
      title: "Orca",
      image: "/logos/orca.svg",
      href: "https://www.orca.so/",
    },

    {
      title: "Parrot Protocol",
      image: "/logos/parrot.svg",
      href: "https://parrot.fi/",
    },
  ];

  return (
    <Flex
      py={8}
      bg={colors.blackMate}
      as="section"
      aria-label="logo-section"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontSize={["18px", "22px"]}
        textAlign="center"
        mb={4}
        color={colors.white}
        fontWeight="300"
      >
        {t("indexPage.logo-strip-section-title")}
      </Text>

      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        mt={2}
        maxWidth={{ base: "90vw", md: "60vw", lg: "100vw" }}
      >
        {ecosystem.map((el) => {
          return (
            <Link href={el.href} key={`ecosystem-${el.title}`} isExternal>
              <Image
                cursor="pointer"
                src={el.image}
                alt={el.title}
                opacity="0.8"
                height={["38px", "56px"]}
                marginX="20px"
                mb={{ base: 4, lg: 0 }}
              />
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default LogoStripSection;
