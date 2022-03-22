import { Flex, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Header from "components/app/Header";
import MobileMenu from "components/app/MobileMenu";
import NftDetailsSection from "components/app/NftDetailsSection";
import Footer from "components/layout/Footer";
import type { BreadcrumbItem } from "components/molecules/BreadcrumbWithRouter";
import BreadcrumbWithRouter from "components/molecules/BreadcrumbWithRouter";
import { useNftDetails } from "hooks/useNftDetails";
import colors from "styles/customTheme/colors";

const NftDetails = () => {
  const router = useRouter();

  const { pid } = router.query;

  const { data, isError } = useNftDetails(pid as string);
  if (isError) {
    router.push("/404");
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: "MNDE", link: "/app/mnde" },
    { title: data?.name || "", link: `/app/mnde/nft?pid=${pid}` },
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
      <NftDetailsSection id={pid as string} />
      <Spacer />
      <Footer />
      <MobileMenu />
    </Flex>
  );
};

export default NftDetails;
