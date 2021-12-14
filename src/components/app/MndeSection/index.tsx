import { Flex, Box } from "@chakra-ui/react";

import MText from "../../atoms/Text";
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
    >
      <Box
        ml="auto"
        mr="auto"
        height={{ base: "466px", lg: "476px" }}
        width={{ base: "288px", lg: "360px" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={{ base: "16px", lg: "32px" }}
        background="white"
        border="1px solid #E2E8F0"
        box-boxSizing="border-box"
        borderRadius="8px"
      >
        <Flex justifyContent="space-between">
          <MText>MNDE Retro</MText>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MndeSection;
