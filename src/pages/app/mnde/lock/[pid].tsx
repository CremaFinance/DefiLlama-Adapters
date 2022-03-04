import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Footer from "components/app/Footer";
import Header from "components/app/Header";
import NftDetailsSection from "components/app/NftDetailsSection";
import type { BreadcrumbItem } from "components/molecules/BreadcrumbWithRouter";
import BreadcrumbWithRouter from "components/molecules/BreadcrumbWithRouter";
import { useNftDetails } from "hooks/useNftDetails";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const NftDetails = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { pid } = router.query;

  const { data, isError, isLoading } = useNftDetails(pid as string);

  if (isError) {
    router.push("/404");
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: "MNDE", link: "/app/mnde" },
    { title: t("mndePage.breadcrumbs.lock") || "", link: "/app/mnde/lock" },
    { title: data?.name || "", link: `/app/mnde/lock/${pid}` },
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
      {!isLoading && <NftDetailsSection id={pid as string} />}
      <Footer />
    </Flex>
  );
};

export default NftDetails;
