import {
  Box,
  Breadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink,
  Link,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

import colors from "styles/customTheme/colors";

export interface BreadcrumbItem {
  title: string;
  link: string;
}

interface BreadcrumbWithRouterProps {
  breadcrumbItems: BreadcrumbItem[];
}

const BreadcrumbWithRouter: FunctionComponent<BreadcrumbWithRouterProps> = ({
  breadcrumbItems,
}) => {
  const router = useRouter();
  const renderItems = () => {
    return breadcrumbItems.map((item, i) => {
      return (
        <ChakraBreadcrumbItem key={item.title + item.link}>
          {i + 1 === breadcrumbItems.length ? (
            <Text color={colors.black}>{item.title}</Text>
          ) : (
            <BreadcrumbLink as={Link} onClick={() => router.push(item.link)}>
              {item.title}
            </BreadcrumbLink>
          )}
        </ChakraBreadcrumbItem>
      );
    });
  };

  return (
    <Box
      px={{ base: 4, md: 10, lg: 180 }}
      pt={["72px", "80px"]}
      width="100%"
      bg={colors.greenLight}
      zIndex="500"
      position="fixed"
    >
      <Breadcrumb
        fontWeight="bold"
        fontSize="md"
        spacing={4}
        color={colors.marinadeGreen}
        separator={
          <Image src="/icons/arrow-right-green.svg" width="7px" height="13px" />
        }
      >
        {renderItems()}
      </Breadcrumb>
    </Box>
  );
};

export default BreadcrumbWithRouter;