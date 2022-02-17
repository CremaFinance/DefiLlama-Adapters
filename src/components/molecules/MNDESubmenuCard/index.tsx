import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import colors from "styles/customTheme/colors";

type MNDESubmenuCardProps = {
  cardTitle: string;
  cardDescription: string;
  cardButtonText: string;
  cardButtonDisabled?: boolean;
  cardIllustrationPath: string;
  onClickCardButton?: () => void;
  isExternal?: boolean;
};

const MNDESubmenuCard = ({
  cardTitle,
  cardDescription,
  cardButtonText,
  cardButtonDisabled = false,
  cardIllustrationPath,
  onClickCardButton,
  isExternal,
}: MNDESubmenuCardProps) => {
  return (
    <Flex
      ml="8px"
      mr="8px"
      height={{ base: "347px", md: "216px", xl: "352px" }}
      width={{ base: "90%", md: "224px", xl: "360px" }}
      flexDirection="column"
      padding={{ base: "32px", md: "10px", lg: "32px" }}
      mb="16px"
      background="white"
      border="1px solid"
      borderColor={colors.lightGray}
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      zIndex={6}
    >
      <Image
        width="80px"
        height={{ base: "80px", md: "54px", xl: "80px" }}
        src={cardIllustrationPath}
      />
      <Text
        marginTop={{ base: "16pxpx", md: "4px", xl: "16px" }}
        fontSize={{ base: "28.13px", md: "16.13px", xl: "28.13px" }}
        fontWeight="bold"
        lineHeight="140%"
        color={colors.blackMate}
      >
        {cardTitle}
      </Text>
      <Text
        marginTop="8px"
        fontSize={{ base: "18px", md: "12px", xl: "18px" }}
        lineHeight="150%"
        textAlign="center"
        justifyContent="center"
        color={colors.blackMate}
      >
        {cardDescription}
      </Text>
      <Flex marginTop={{ base: "24px", md: "10px", xl: "24px" }} width="100%">
        <MButton
          width="100%"
          height={{ base: "40px", md: "24px", xl: "40px" }}
          variant="big-solid"
          fontSize={{ base: "16px", sm: "10px", md: "10px", xl: "16px" }}
          lineHeight="140%"
          fontWeight="bold"
          paddingX="44px"
          isDisabled={cardButtonDisabled}
          onClick={() => onClickCardButton && onClickCardButton()}
        >
          {cardButtonText}
          {isExternal ? (
            <Icon
              as={FiExternalLink}
              width="16px"
              height="16px"
              cursor="pointer"
              marginLeft="9px"
            />
          ) : null}
        </MButton>
      </Flex>
    </Flex>
  );
};
export default MNDESubmenuCard;
