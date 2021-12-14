import { Flex } from "@chakra-ui/react";

import colors from "styles/customTheme/colors";

const MndeSection = () => {
  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      height="100vh"
      aria-label="mnde-section"
      position="relative"
      zIndex={1}
      flexDirection="column"
      backgroundColor={colors.greenLight}
      alignItems="stretch"
    />
  );
};

export default MndeSection;
