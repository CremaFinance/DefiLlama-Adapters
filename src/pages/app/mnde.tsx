import { Box, Flex, Image } from "@chakra-ui/react";

import Footer from "components/app/Footer";
import Header from "components/app/Header";
import MndeSection from "components/app/MndeSection";
import LogoStripSection from "components/index/LogoStripSection";
import TestimonialSection from "components/index/TestimonialSection";
import colors from "styles/customTheme/colors";

const Mnde = () => {
  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
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
      <MndeSection />
      <LogoStripSection />
      <TestimonialSection />
      <Footer />
    </Box>
  );
};

export default Mnde;
