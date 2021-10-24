import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
