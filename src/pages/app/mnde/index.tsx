import { Flex, Image } from "@chakra-ui/react";

import Footer from "components/app/Footer";
import Header from "components/app/Header";
import MobileMenu from "components/app/MobileMenu";
import SubmenusMndeSection from "components/app/SubmenusSection";
import WhySection from "components/app/WhySection";
import colors from "styles/customTheme/colors";

const Mnde = () => {
  return (
    <Flex
      position="relative"
      overflowX="hidden"
      bg={colors.greenLight}
      height={{ base: "unset", "2xl": "100vh" }}
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
        <SubmenusMndeSection />
      </Flex>
      <WhySection />
      <Footer />
      <MobileMenu />
    </Flex>
  );
};

export default Mnde;
