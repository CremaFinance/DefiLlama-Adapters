import {
  SimpleGrid,
  Flex,
  Tooltip,
  Center,
  Image,
  Box,
  Heading,
} from "@chakra-ui/react";

const LogoStripSection = () => {
  const ecosystem = [
    {
      title: "Solana",
      image: "/logos/asset-77.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-70.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-71.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-72.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-73.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-78.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-75.svg",
    },

    {
      title: "Solana",
      image: "/logos/asset-76.svg",
    },
  ];

  return (
    <Box p={8} py={16} bg="#242731" as="section">
      <Heading
        size="md"
        textAlign="center"
        mb={4}
        color="white"
        fontWeight="300"
      >
        Use mSOL across all ecosystem
      </Heading>

      <Box textAlign="center">
        <Flex gap={4} flexWrap="wrap" display={["none", "none", "inline-flex"]}>
          {ecosystem.map((el) => {
            return (
              <Box flex={1} height="80px" width="90px">
                <Center height="100%" color="white">
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

        <SimpleGrid
          columns={[3, 3, 4]}
          spacing={4}
          display={["grid", "grid", "none"]}
        >
          {ecosystem.map((el) => {
            return (
              <Box flex={1} height="80px" width="90px" margin="0 auto">
                <Center height="100%" color="white">
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
