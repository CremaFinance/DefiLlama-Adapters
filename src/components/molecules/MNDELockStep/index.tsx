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
      width={{ base: "235px" }}
      flexDirection="column"
      mb="16px"
      justifyContent="center"
      alignItems="center"
      zIndex={6}
    >
      <Image width="100px" height="100px" src={stepIllustrationPath} />
      <Text
        marginTop="8px"
        fontSize="18px"
        fontWeight="bold"
        lineHeight="25.2px"
        color={stepLinkEnabled ? colors.marinadeGreen : colors.blackMate}
      >
        {stepTitle}
        {stepLinkEnabled ? (
          <Icon
            as={FiExternalLink}
            width="18px"
            height="18px"
            cursor="pointer"
            marginLeft="4px"
          />
        ) : null}
      </Text>
    </Flex>
  );
};
export default MNDELockStep;
