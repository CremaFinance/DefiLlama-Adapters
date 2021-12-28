import { Flex } from "@chakra-ui/react";

import AllPoolsSection from "../AllPoolsSection";
import DefiSubtitleSection from "../DefiSubtitleSection";

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
      <DefiSubtitleSection />
      <AllPoolsSection />
    </Flex>
  );
};

export default DefiSection;
