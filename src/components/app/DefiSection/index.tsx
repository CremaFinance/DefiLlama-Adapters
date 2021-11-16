import { Flex } from "@chakra-ui/react";

import AllPoolsSection from "../AllPoolsSection";
import InfoBoxesSection from "../InfoBoxesSection";
import colors from "styles/customTheme/colors";

const DefiSection = () => {
  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      aria-label="defi-section"
      position="relative"
      zIndex={4}
      flexDirection="column"
      backgroundColor={colors.greenLight}
      alignItems="stretch"
    >
      <InfoBoxesSection />
      <AllPoolsSection />
    </Flex>
  );
};

export default DefiSection;
