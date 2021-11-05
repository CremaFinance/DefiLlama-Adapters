import { Flex } from "@chakra-ui/react";

import PoolRow from "components/molecules/PoolRow";
import colors from "styles/customTheme/colors";

import { exampleData } from "./constants";

const DefiSection = () => {
  return (
    <Flex
      py="72px"
      pb={[12, 8]}
      aria-label="hero-section"
      position="relative"
      height="100vh"
      zIndex={4}
      flexDirection="column"
      backgroundColor={colors.greenLight}
      alignItems="stretch"
    >
      <Flex flexDir="column" marginX={{ base: "10px", lg: "170px" }}>
        {exampleData.map((props) => (
          <Flex
            flexDirection="column"
            // eslint-disable-next-line react/prop-types
            key={`${props.currencies.left}-${props.currencies?.right}`}
            marginBottom="14px"
          >
            <PoolRow {...props} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DefiSection;
