import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HeroSection from "components/index/HeroSection";
import LogoStripSection from "components/index/LogoStripSection";
import SecuritySection from "components/index/SecuritySection";
import TestemonialSection from "components/index/TestimonialSection";
import WhySection from "components/index/WhySection";

interface StaticProps {
  locale: string;
}

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
    },
  };
}

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <LogoStripSection />
      <TestemonialSection />
      <WhySection />
      <SecuritySection />
    </Box>
  );
};

export default Home;
