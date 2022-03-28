import { Flex, Spacer } from "@chakra-ui/react";

import Header from "components/app/Header";
import LockMNDESection from "components/app/LockMNDESection";
import MndeFAQSection from "components/app/MndeFAQSection";
import MndeLockInfoSection from "components/app/MndeLockInfoSection";
import MobileMenu from "components/app/MobileMenu";
import Footer from "components/layout/Footer";
import SystemNotificationHandler from "components/molecules/SystemNotificationHandler";
import { GovernanceContextProvider } from "contexts/GovernanceContext";
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
      <Header />
      <SystemNotificationHandler>
        <MndeLockInfoSection />
        <GovernanceContextProvider>
          <LockMNDESection />
        </GovernanceContextProvider>
        <MndeFAQSection />
        <Spacer />
        <Footer />
        <MobileMenu />
      </SystemNotificationHandler>
    </Flex>
  );
};

export default Mnde;
