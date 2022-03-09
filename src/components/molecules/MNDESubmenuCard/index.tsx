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
      flex={{ base: "inherit", md: "1 0 40%", lg: "inherit" }}
      direction="column"
      mx={{ base: "0px", md: "12px" }}
      height={{ base: "auto", md: "348px", xl: "363px" }}
      width={{ base: "100%", md: "210px", xl: "290px" }}
      flexDirection="column"
      p={6}
      mb="16px"
      background="white"
      border="1px solid"
      borderColor={colors.lightGray}
      borderRadius="8px"
      justifyContent="space-between"
      alignItems="center"
      zIndex={6}
    >
      <Flex direction="column" alignItems="center">
        <Image width="80px" height="80px" src={cardIllustrationPath} />
        <Text
          mt="16px"
          fontSize={{ base: "18px", xl: "28px" }}
          fontWeight="bold"
          lineHeight="140%"
          color={colors.blackMate}
        >
          {cardTitle}
        </Text>

        <Text
          marginTop="8px"
          fontSize={{ base: "16px", xl: "18px" }}
          lineHeight="150%"
          textAlign="center"
          justifyContent="center"
          color={colors.blackMate}
        >
          {cardDescription}
        </Text>
      </Flex>
      <Flex marginTop={{ base: "24px", md: "10px", xl: "24px" }} width="100%">
        <MButton
          width="100%"
          height="40px"
          variant="big-solid"
          fontSize="16px"
          fontWeight="bold"
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
              marginLeft="8px"
            />
          ) : null}
        </MButton>
      </Flex>
    </Flex>
  );
};
export default MNDESubmenuCard;
