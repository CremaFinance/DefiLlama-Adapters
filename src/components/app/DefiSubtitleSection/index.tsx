import {
  Flex,
  Text,
  Button,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const DefiSubtitleSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      alignItems="center"
      marginTop={{ base: "24px", lg: "40px" }}
      marginBottom={{ base: "24px", lg: "80px" }}
      marginX="8px"
    >
      <Flex alignItems="center">
        <Text
          color={colors.black}
          textAlign="center"
          fontWeight="bold"
          fontSize={["22.5px", "43.95px"]}
          maxWidth="670px"
        >
          {t("appPage.defi-subtitle.header")}
        </Text>

        <Popover
          placement="bottom"
          trigger="hover"
          arrowSize={11}
          arrowShadowColor="transparent"
        >
          <PopoverTrigger>
            <Button
              variant="link"
              _hover={{}}
              textAlign="center"
              lineHeight="150%"
              color={colors.black}
              _focus={{ boxShadow: "none" }}
            >
              <Icon
                as={HiOutlineInformationCircle}
                width="16px"
                height="16px"
                marginLeft="9px"
                color="green800"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            _focus={{ boxShadow: "none" }}
            width="220px"
            borderWidth="0"
          >
            <PopoverArrow
              backgroundColor="marinadeEvenLighterGreen"
              borderWidth="0"
            />
            <PopoverBody
              padding="8px"
              backgroundColor="marinadeEvenLighterGreen"
              borderRadius="4px"
            >
              <Text
                color={colors.black}
                textAlign="center"
                fontSize="14.4px"
                lineHeight="27px"
                maxWidth="670px"
              >
                {t("appPage.defi-subtitle.body-desktop")}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Text
        color={colors.black}
        textAlign="center"
        fontSize={{ base: "14px", md: "18px" }}
        lineHeight={{ base: "20px", md: "27px" }}
        maxWidth={{ base: "288px", md: "670px" }}
      >
        {t("appPage.defi-subtitle.body-mobile")}
      </Text>
    </Flex>
  );
};

export default DefiSubtitleSection;
