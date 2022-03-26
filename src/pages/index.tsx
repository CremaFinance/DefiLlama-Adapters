import { Box } from "@chakra-ui/react";

import BlogPosts from "components/index/BlogPostsSection";
import ContributorSection from "components/index/ContributorSection";
import Header from "components/index/Header";
import HeroSection from "components/index/HeroSection";
import InfoSection from "components/index/InfoSection";
import LogoStripSection from "components/index/LogoStripSection";
import SecuritySection from "components/index/SecuritySection";
import TestemonialSection from "components/index/TestimonialSection";
import WhySection from "components/index/WhySection";
import Footer from "components/layout/Footer";
import SystemNotificationHandler from "components/molecules/SystemNotificationHandler";
import colors from "styles/customTheme/colors";

const Home = () => {
  return (
    <Box bg={colors.greenLight}>
      <Header />
      <SystemNotificationHandler>
        <HeroSection />
        <LogoStripSection />
        <TestemonialSection />
        <InfoSection />
        <WhySection />
        <ContributorSection />
        <SecuritySection />
        <BlogPosts />
        <Footer />
      </SystemNotificationHandler>
    </Box>
  );
};

export default Home;
