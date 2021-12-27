import { Flex } from "@chakra-ui/react";

import AllPoolsSection from "../AllPoolsSection";
import DefiSubtitleSection from "../DefiSubtitleSection";
import InfoBoxesSection from "../InfoBoxesSection";

const DefiSection = () => {
  return (
    <Flex
      pt={["100px", "72px"]}
      pb={[12, 8]}
      aria-label="defi-section"
      position="relative"
      flexDirection="column"
      alignItems="stretch"
    >
      <InfoBoxesSection />
      <DefiSubtitleSection />
      <AllPoolsSection />
    </Flex>
  );
};

export default DefiSection;
