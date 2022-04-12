import { Flex, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Header from "components/app/Header";
import LockMNDESection from "components/app/LockMNDESection";
import MndeFAQSection from "components/app/MndeFAQSection";
import MndeLockInfoSection from "components/app/MndeLockInfoSection";
import MndeNotification from "components/app/MndeNotification";
import MobileMenu from "components/app/MobileMenu";
import Footer from "components/layout/Footer";
import SystemNotificationHandler from "components/molecules/SystemNotificationHandler";
import { GovernanceContextProvider } from "contexts/GovernanceContext";
import colors from "styles/customTheme/colors";

const Mnde = () => {
  const router = useRouter();

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
      <MndeNotification onClick={() => router.push("/app/defi")} />
    </Flex>
  );
};

export default Mnde;
