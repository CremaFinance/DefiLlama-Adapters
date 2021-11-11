import { Box, Flex, Image } from "@chakra-ui/react";

import FAQSection from "components/app/FAQSection";
import Footer from "components/app/Footer";
import Header from "components/app/Header";
import StakingSection from "components/app/StakingSection";
import LogoStripSection from "components/index/LogoStripSection";
import TestimonialSection from "components/index/TestimonialSection";
import colors from "styles/customTheme/colors";

const Staking = () => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      backgroundColor={colors.greenLight}
    >
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
      <StakingSection />
      <FAQSection />
      <LogoStripSection />
      <TestimonialSection />
      <Footer />
    </Box>
  );
};

export default Staking;
