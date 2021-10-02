import { HStack, Button, Image, Box, Heading } from "@chakra-ui/react";

const HeroSection = () => {
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
            Steak Solana
          </Heading>

          <Heading fontWeight="bold">without locking in</Heading>

          <Heading fontWeight="bold">your funds</Heading>
        </Box>

        <Box mb={[2, 2, 4]}>
          <Box>Receive mSOL, the ultimate unit</Box>

          <Box>of the Solana ecosystem.</Box>
        </Box>

        <Box mb={[1, 1, 3]}>
          <Button
            bg="#308D8A"
            _hover={{ bg: "#308D8Aaa" }}
            _active={{ bg: "#308D8A77" }}
            color="white"
            rounded="md"
          >
            Start staking SOL
          </Button>
        </Box>

        <Box fontSize="sm" color="gray.500">
          6.21% APY
        </Box>
      </Box>

      {/* friends chilling image */}

      <Box display={["none", "none", "block"]}>
        <Image src="./cloud-leaves.png" width="420px" position="absolute" top={"0"} right={0} zIndex={10} />
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
            color="green"
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
            color="green"
            mr={2}
          >
            300+
          </Box>

          <Box fontWeight="bold" display="inline-block">
            Validators
          </Box>
        </Box>

        <Box>
          <Heading
            fontWeight="bold"
            size="md"
            display="inline-block"
            color="green"
            mr={2}
          >
            $334M+
          </Heading>

          <Heading fontWeight="bold" display="inline-block">
            TVL
          </Heading>
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
            <Heading size="md" fontWeight="bold" color="green">
              20+
            </Heading>

            <Heading size="md" fontWeight="bold">DeFi Integrations</Heading>
          </HStack>

          <HStack>
            <Heading size="md" fontWeight="bold" color="green">
              300+
            </Heading>

            <Heading size="md" fontWeight="bold">Validators</Heading>
          </HStack>

          <HStack>
            <Heading size="md" fontWeight="bold" color="green">
              $334M+
            </Heading>

            <Heading size="md" fontWeight="bold">TVL</Heading>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default HeroSection;
