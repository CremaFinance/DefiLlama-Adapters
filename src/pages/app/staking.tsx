import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";

import FAQSection from "components/app/FAQSection";
import Header from "components/app/Header";
import MobileMenu from "components/app/MobileMenu";
import StakeInputsSection from "components/app/StakeInputsSection";
import StakingSection from "components/app/StakingSection";
import Footer from "components/layout/Footer";
import PerformanceNotification from "components/molecules/PerformanceNotification";
import { useTracking } from "hooks/useTracking";
import colors from "styles/customTheme/colors";

const Staking = () => {
  const { track } = useTracking();

  useEffect(() => {
    track({
      event: "Init Stake Page",
      category: "Page Inits",
      action: "Load",
      label: "Success",
    });
  }, [track]);

  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
      <PerformanceNotification />
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
      <StakingSection />
      <StakeInputsSection />
      <FAQSection />
      <Footer />
      <MobileMenu />
    </Box>
  );
};

export default Staking;
