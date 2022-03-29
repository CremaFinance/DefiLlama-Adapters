import { Flex, Image } from "@chakra-ui/react";

import ExplanationSection from "components/app/MndeSection/ExplanationSection";
import InfoSection from "components/app/MndeSection/InfoSection";
import WhySection from "components/app/WhySection";
import Header from "components/index/Header";
import Footer from "components/layout/Footer";
import colors from "styles/customTheme/colors";

const Mnde = () => {
  return (
    <Flex
      position="relative"
      overflowX="hidden"
      bg={colors.greenLight}
      flexDirection="column"
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
      <Flex flex={1}>
        <InfoSection />
      </Flex>
      <WhySection />
      <ExplanationSection />
      <Footer />
    </Flex>
  );
};
export default Mnde;
