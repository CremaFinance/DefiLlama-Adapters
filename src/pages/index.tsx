import { Box } from "@chakra-ui/react";

import LogoStripSection from "components/index/LogoStripSection";
import HeroSection from "components/index/HeroSection";
import TestemonialSection from "components/index/TestimonialSection";

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <LogoStripSection />
      <TestemonialSection />
    </Box>
  );
};

export default Home;
