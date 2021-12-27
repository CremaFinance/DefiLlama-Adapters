import { Box } from "@chakra-ui/react";

import InfoBoxesSection from "../InfoBoxesSection";
import colors from "styles/customTheme/colors";

const StakingSection = () => {
  return (
    <Box
      pt={["100px", "72px"]}
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="staking-section"
      position="relative"
    >
      <InfoBoxesSection />
    </Box>
  );
};

export default StakingSection;
