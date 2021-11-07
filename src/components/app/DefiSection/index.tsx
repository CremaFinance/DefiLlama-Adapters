import { Box } from "@chakra-ui/react";

import InfoBoxesSection from "../InfoBoxesSection";
import colors from "styles/customTheme/colors";

const DefiSection = () => {
  return (
    <Box
      py="72px"
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="defi-section"
      position="relative"
      height="100vh"
    >
      <InfoBoxesSection />
    </Box>
  );
};

export default DefiSection;
