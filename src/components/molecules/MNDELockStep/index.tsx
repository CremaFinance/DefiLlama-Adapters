import { Flex, Image, Text, Icon, Link } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

import colors from "styles/customTheme/colors";

type MNDELockStepProps = {
  stepTitle: string;
  stepLinkEnabled?: boolean;
  stepIllustrationPath: string;
  href?: string;
};

const MNDELockStep = ({
  stepTitle,
  stepLinkEnabled = false,
  stepIllustrationPath,
  href,
}: MNDELockStepProps) => {
  return (
    <Flex
      width={{ base: "101px", md: "235px" }}
      height={{ base: "90px", md: "133px" }}
      flexDirection="column"
      mb="16px"
      mx={{ base: "8px", md: "0px" }}
      justifyContent="bottom"
      alignItems="center"
      zIndex={6}
    >
      <Image
        width={{ base: "40px", md: "100px" }}
        height={{ base: "40px", md: "100px" }}
        src={stepIllustrationPath}
      />
      <Link
        isExternal
        href={href}
        cursor={href ? "pointer" : "initial"}
        _hover={{ textDecoration: "none" }}
        rel="noreferrer noopener"
        _focus={{ boxShadow: "none" }}
        alignItems="center"
        textAlign="center"
      >
        <Flex justifyContent="center" alignItems="center">
          <Text
            marginTop="8px"
            fontSize={{ base: "14px", md: "18px" }}
            fontWeight="bold"
            lineHeight="25.2px"
            textAlign="center"
            color={stepLinkEnabled ? colors.marinadeGreen : colors.blackMate}
          >
            {stepTitle}
          </Text>
          {stepLinkEnabled ? (
            <Icon
              color={stepLinkEnabled ? colors.marinadeGreen : colors.blackMate}
              as={FiExternalLink}
              width={{ base: "14px", md: "18px" }}
              height={{ base: "14px", md: "18px" }}
              cursor="pointer"
              marginLeft="4px"
              marginTop="8px"
            />
          ) : null}
        </Flex>
      </Link>
    </Flex>
  );
};
export default MNDELockStep;
