import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

import colors from "styles/customTheme/colors";

type MNDELockStepProps = {
  stepTitle: string;
  stepLinkEnabled?: boolean;
  stepIllustrationPath: string;
};

const MNDELockStep = ({
  stepTitle,
  stepLinkEnabled = false,
  stepIllustrationPath,
}: MNDELockStepProps) => {
  return (
    <Flex
      width={{ base: "85.5px", md: "235px" }}
      flexDirection="column"
      mb="16px"
      mx={{ base: "8px", md: "0px" }}
      justifyContent="center"
      alignItems="center"
      zIndex={6}
    >
      <Image
        width={{ base: "40px", md: "100px" }}
        height={{ base: "40px", md: "100px" }}
        src={stepIllustrationPath}
      />
      <Text
        marginTop="8px"
        fontSize={{ base: "14px", md: "18px" }}
        fontWeight="bold"
        lineHeight="25.2px"
        textAlign="center"
        color={stepLinkEnabled ? colors.marinadeGreen : colors.blackMate}
      >
        {stepTitle}
        {stepLinkEnabled ? (
          <Icon
            as={FiExternalLink}
            width={{ base: "14px", md: "18px" }}
            height={{ base: "14px", md: "18px" }}
            cursor="pointer"
            marginLeft="4px"
          />
        ) : null}
      </Text>
    </Flex>
  );
};
export default MNDELockStep;
