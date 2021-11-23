import { Box } from "@chakra-ui/layout";

import ValidatorsSection from "../../components/app/ValidatorsSection";
import colors from "styles/customTheme/colors";

const Validators = () => {
  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
      <ValidatorsSection />
    </Box>
  );
};

export default Validators;
