import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LogoStripSection from "components/index/LogoStripSection";
import HeroSection from "components/index/HeroSection";
import TestemonialSection from "components/index/TestimonialSection";
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
    </Box>
  );
};

export default Home;
