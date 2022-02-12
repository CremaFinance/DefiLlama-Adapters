import { Flex } from "@chakra-ui/react";

import Footer from "components/app/Footer";
import Header from "components/app/Header";
import type { BreadcrumbItem } from "components/molecules/BreadcrumbWithRouter";
import BreadcrumbWithRouter from "components/molecules/BreadcrumbWithRouter";
import colors from "styles/customTheme/colors";

const Lock = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { title: "Home", link: "/app" },
    { title: "MNDE", link: "/app/mnde" },
    { title: "Lock", link: "/app/mnde/lock" },
  ];

  return (
    <Flex
      position="relative"
      overflowX="hidden"
      bg={colors.greenLight}
      height={{ base: "unset", "2xl": "100vh" }}
      flexDirection="column"
    >
      <Header />
      <BreadcrumbWithRouter breadcrumbItems={breadcrumbItems} />
      <Footer />
    </Flex>
  );
};

export default Lock;
