import { Flex } from "@chakra-ui/react";

import Footer from "components/app/Footer";
import Header from "components/app/Header";
import type { BreadcrumbItem } from "components/molecules/BreadcrumbWithRouter";
import BreadcrumbWithRouter from "components/molecules/BreadcrumbWithRouter";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const Lock = () => {
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: "MNDE", link: "/app/mnde" },
    { title: t("mndePage.breadcrumbs.lock") || "", link: "/app/mnde/lock" },
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
