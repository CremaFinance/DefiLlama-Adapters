import { Box } from "@chakra-ui/layout";

import Header from "../../components/app/Header/index";
import ValidatorsSection from "../../components/app/ValidatorsSection";
import colors from "styles/customTheme/colors";

const Validators = () => {
  return (
    <Box>
      <Header onValidatorsPage />
      <Box
        backgroundColor={colors.greenLight}
        display={{ lg: "block", xl: "none" }}
        height="30px"
      />
      <Box
        bg={colors.greenLight}
        width="100vw"
        minHeight={{ xl: "950px" }}
        height="100vh"
        display="flex"
        alignItems="center"
      >
        <ValidatorsSection />
      </Box>
    </Box>
  );
};

export default Validators;
