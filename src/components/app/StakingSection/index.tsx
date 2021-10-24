import { Box, Flex, Image } from "@chakra-ui/react";

import colors from "styles/customTheme/colors";

const StakingSection = () => {
  return (
    <Box
      py="72px"
      pb={[12, 8]}
      bg={colors.greenLight}
      aria-label="hero-section"
      position="relative"
      height="100vh"
    >
      <Flex width="100vw" justifyContent="flex-end">
        <Image
          src="./ilustrations/clouds-and-leaves.svg"
          width={{ base: 0, md: "64vw", lg: "40vw", "2xl": "32vw" }}
          alt="Clouds and Leaves"
          position="absolute"
          top={-8}
          zIndex={3}
        />
      </Flex>
    </Box>
  );
};

export default StakingSection;
