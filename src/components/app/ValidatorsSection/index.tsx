import { Box } from "@chakra-ui/react";

import ValidatorTable from "./ValidatorTable";

const ValidatorsSection = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ base: "90vw", xl: "1100px" }}
      height={{ base: "min(90vh, 100vh - 120px)", xl: "770px" }}
      maxHeight="700px"
      bg="white"
      marginLeft="auto"
      marginRight="auto"
      marginTop="80px"
      border="1px solid #e2e8f0"
      borderRadius="8px"
    >
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#CCCCCC",
            borderRadius: "24px",
          },
          "&::-webkit-scrollbar:horizontal": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track::horizontal": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb::horizontal": {
            background: "#CCCCCC",
            borderRadius: "24px",
          },
        }}
        pt={{ base: "0px", xl: "none" }}
      >
        <ValidatorTable />
      </Box>
    </Box>
  );
};

export default ValidatorsSection;
