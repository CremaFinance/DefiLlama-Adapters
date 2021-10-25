import { Box } from "@chakra-ui/react";

import colors from "styles/customTheme/colors";

const DefiSection = () => {
  return (
    <Box
      py="72px"
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="hero-section"
      position="relative"
      height="100vh"
    />
  );
};

export default DefiSection;
