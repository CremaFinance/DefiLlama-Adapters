import { Box, Flex, Image } from "@chakra-ui/react";

import DefiSection from "components/app/DefiSection";
import Header from "components/app/Header";

const Defi = () => {
  return (
    <Box position="relative" overflow="hidden">
      <Flex width="100vw" justifyContent="flex-end">
        <Image
          src="../../ilustrations/left-leaf.svg"
          width={{ base: 0, md: "21vw", "2xl": "16vw" }}
          alt="Leaf"
          position="absolute"
          right={-10}
          top="10vh"
          zIndex={3}
        />

        <Image
          src="../../ilustrations/right-leaf.svg"
          width={{ base: 0, md: "16vw", "2xl": "16vw" }}
          alt="Leaf"
          position="absolute"
          right={-14}
          top="15vh"
          zIndex={3}
        />
      </Flex>
      <Header />
      <DefiSection />
    </Box>
  );
};

export default Defi;
