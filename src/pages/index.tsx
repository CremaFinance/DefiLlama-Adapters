import { Box } from "@chakra-ui/react";

import BlogPosts from "components/index/BlogPostsSection";
import HeroSection from "components/index/HeroSection";
import LogoStripSection from "components/index/LogoStripSection";
import SecuritySection from "components/index/SecuritySection";
import TestemonialSection from "components/index/TestimonialSection";
import WhySection from "components/index/WhySection";

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <LogoStripSection />
      <TestemonialSection />
      <WhySection />
      <SecuritySection />
      <BlogPosts />
    </Box>
  );
};

export default Home;
