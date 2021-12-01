import { Box } from "@chakra-ui/layout";

import ValidatorsSection from "../../components/app/ValidatorsSection";
import colors from "styles/customTheme/colors";

const Validators = () => {
  return (
    <Box
      bg={colors.greenLight}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
    >
      <ValidatorsSection />
    </Box>
  );
};

export default Validators;
