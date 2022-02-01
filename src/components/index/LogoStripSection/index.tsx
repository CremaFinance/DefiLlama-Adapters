import { Flex, Image, Link, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MText from "../../atoms/Text";
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
      <MText
        type="text-2xl"
        textAlign="center"
        mt={2}
        mb={4}
        color={colors.white}
      >
        {t("indexPage.logo-strip-section-title")}
      </MText>

      <Flex
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        my={2}
        maxWidth={{ base: "90vw", md: "60vw", lg: "100vw" }}
      >
        {ecosystem.map((el) => {
          return (
            <Tooltip
              hasArrow
              label={el.title}
              bg={colors.marinadeEvenLighterGreen}
              color="black"
            >
              <Link href={el.href} key={`ecosystem-${el.title}`} isExternal>
                <Image
                  cursor="pointer"
                  src={el.image}
                  alt={el.title}
                  _hover={{ opacity: "1" }}
                  opacity="0.6"
                  height={["38px", "56px"]}
                  marginX="20px"
                  mb={{ base: 4, lg: 0 }}
                />
              </Link>
            </Tooltip>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default LogoStripSection;
