import { Box } from "@chakra-ui/react";

import BlogPosts from "components/index/BlogPostsSection";
import ContributorSection from "components/index/ContributorSection";
import HeroSection from "components/index/HeroSection";
import InfoSection from "components/index/InfoSection";
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
      <InfoSection />
      <WhySection />
      <ContributorSection />
      <SecuritySection />
      <BlogPosts />
    </Box>
  );
};

export default Home;
