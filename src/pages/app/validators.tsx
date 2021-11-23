import { Box } from "@chakra-ui/layout";
import colors from "styles/customTheme/colors";
import ValidatorsSection from "../../components/app/ValidatorsSection";

const Validators = () => {
  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
      <ValidatorsSection />
    </Box>
  );
};

export default Validators;
