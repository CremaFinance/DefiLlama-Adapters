import { Flex } from "@chakra-ui/react";

import InfoBoxesSection from "../InfoBoxesSection";
import PoolRow from "components/molecules/PoolRow";
import colors from "styles/customTheme/colors";

import { exampleData } from "./constants";

const DefiSection = () => {
  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      aria-label="defi-section"
      position="relative"
      height="100vh"
      zIndex={4}
      flexDirection="column"
      backgroundColor={colors.greenLight}
      alignItems="stretch"
    >
      <InfoBoxesSection />
      <Flex
        flexDir="column"
        marginX={{ base: "10px", xl: "170px" }}
        marginTop="40px"
        alignItems="stretch"
      >
        {exampleData.map((props) => (
          <Flex
            flexDirection="row"
            // eslint-disable-next-line react/prop-types
            key={`${props.currencies.left}-${props.currencies?.right}`}
            marginBottom="14px"
            justifyContent="center"
          >
            <PoolRow {...props} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DefiSection;
