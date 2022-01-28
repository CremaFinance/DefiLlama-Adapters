import { Flex } from "@chakra-ui/react";

import AllPoolsSection from "../AllPoolsSection";
import CallToActionSection from "../CallToActionSection";
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
      <CallToActionSection />
    </Flex>
  );
};

export default DefiSection;
