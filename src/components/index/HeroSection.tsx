import { HStack, Button, Image, Box, Heading } from "@chakra-ui/react";

type SectionProps = {
  title: string;
};

const HeroSection = ({ title }: SectionProps) => {
  return (
    <Box py="72px" pb={[8]} bg="#C8ECE1" position="relative" minHeight="100vh" id={ title }>
      <Box
        pt={[5, 5, "10vh"]}
        pl={[0, 0, 5]}
        position="relative"
        zIndex={10}
        textAlign={["center", "center", "left"]}
      >
        <Box mb={[2, 2, 4]}>
          <Heading fontSize={[30, 30, "40"]} color="#08B898" fontWeight="bold">
            Steak Solana
          </Heading>

          <Heading fontSize={[30, 30, "40"]} fontWeight="bold">
            without locking in
          </Heading>

          <Heading fontSize={[30, 30, "40"]} fontWeight="bold">
            your funds
          </Heading>
        </Box>

        <Box mb={[2, 2, 4]}>
          <Box>Receive mSOL, the ultimate unit</Box>

          <Box>of the Solana ecosystem.</Box>
        </Box>

        <Box mb={[1, 1, 3]}>
          <Button
            bg="#308D8A"
            _hover={{ bg: "#308D8Aaa" }}
            colorScheme="green"
            rounded="md"
          >
            Start staking SOL
          </Button>
        </Box>

        <Box fontSize="sm" color="gray.500">
          6.21% APY
        </Box>
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
        <Box>
          <Box
            fontWeight="bold"
            display="inline-block"
            color="green.500"
            mr={2}
          >
            20+
          </Box>

          <Box fontWeight="bold" display="inline-block">
            DeFi Integrations
          </Box>
        </Box>

        <Box>
          <Box
            fontWeight="bold"
            display="inline-block"
            color="green.500"
            mr={2}
          >
            300+
          </Box>

          <Box fontWeight="bold" display="inline-block">
            Validators
          </Box>
        </Box>

        <Box>
          <Box
            fontWeight="bold"
            display="inline-block"
            color="green.500"
            mr={2}
          >
            $334M+
          </Box>

          <Box fontWeight="bold" display="inline-block">
            TVL
          </Box>
        </Box>
      </Box>

      <Box
        px={5}
        pl={[5, 5, 10]}
        position={["relative", "relative", "absolute"]}
        width="100vw"
        bottom={[0, 0, 8]}
        display={["none", "none", "block"]}
      >
        <HStack spacing={8}>
          <HStack fontSize="lg">
            <Box fontWeight="bold" color="green.500">
              20+
            </Box>

            <Box fontWeight="bold">DeFi Integrations</Box>
          </HStack>

          <HStack>
            <Box fontWeight="bold" color="green.500">
              300+
            </Box>

            <Box fontWeight="bold">Validators</Box>
          </HStack>

          <HStack>
            <Box fontWeight="bold" color="green.500">
              $334M+
            </Box>

            <Box fontWeight="bold">TVL</Box>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

HeroSection.defaultProps = {
  title: "Hero Section"
};

export default HeroSection;
