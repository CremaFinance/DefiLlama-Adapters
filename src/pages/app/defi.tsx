import { Box, Flex, Image } from "@chakra-ui/react";

import DefiSection from "components/app/DefiSection";
import Header from "components/app/Header";
import MobileMenu from "components/app/MobileMenu";
import Footer from "components/layout/Footer";
import SystemNotificationHandler from "components/molecules/SystemNotificationHandler";
import colors from "styles/customTheme/colors";

const Defi = () => {
  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
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
        <DefiSection />
        <Footer isAppPage />
        <MobileMenu />
      </SystemNotificationHandler>
    </Box>
  );
};

export default Defi;
