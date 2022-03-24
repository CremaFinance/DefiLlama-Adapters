import { Flex, Image } from "@chakra-ui/react";

import Header from "components/app/Header";
import MndeSection from "components/app/MndeSection";
import MobileMenu from "components/app/MobileMenu";
import Footer from "components/layout/Footer";
import SystemNotificationHandler from "components/molecules/SystemNotificationHandler";
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
      <SystemNotificationHandler>
        <Flex flex={1}>
          <MndeSection />
        </Flex>
        <Footer isAppPage />
        <MobileMenu />
      </SystemNotificationHandler>
    </Flex>
  );
};

export default Mnde;
