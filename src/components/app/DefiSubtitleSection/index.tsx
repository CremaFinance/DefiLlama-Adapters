import {
  Flex,
  Text,
  Button,
  Icon,
  useBreakpointValue,
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

  const values = useBreakpointValue({
    base: { tooltip: true, subtitleKey: "body-mobile" },
    md: { tooltip: false, subtitleKey: "body-desktop" },
  });

  return (
    <Flex
      direction="column"
      alignItems="center"
      marginTop={{ base: "24px", lg: "40px" }}
      marginBottom={{ base: "24px", lg: "80px" }}
      marginX="8px"
    >
      {values?.tooltip ? (
        <Popover
          placement="bottom"
          trigger="click"
          arrowSize={11}
          arrowPadding={100}
          arrowShadowColor="transparent"
        >
          <PopoverTrigger>
            <Button
              variant="link"
              _hover={{}}
              textAlign="center"
              fontWeight="bold"
              fontSize="22.5px"
              lineHeight="150%"
              marginBottom="8px"
              color={colors.black}
            >
              {t("appPage.defi-subtitle.header")}
              <Icon
                as={HiOutlineInformationCircle}
                width="16px"
                height="16px"
                marginLeft="9px"
                color="green800"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent width="220px" borderWidth="0">
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
                fontSize="18px"
                lineHeight="27px"
                maxWidth="670px"
              >
                {t("appPage.defi-subtitle.body-desktop")}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="43.95px"
          lineHeight="61.53px"
          marginBottom="8px"
          color={colors.black}
        >
          {t("appPage.defi-subtitle.header")}
        </Text>
      )}
      <Text
        color={colors.black}
        textAlign="center"
        fontSize={{ base: "14px", md: "18px" }}
        lineHeight={{ base: "20px", md: "27px" }}
        maxWidth={{ base: "288px", md: "670px" }}
      >
        {t(`appPage.defi-subtitle.${values?.subtitleKey}`)}
      </Text>
    </Flex>
  );
};

export default DefiSubtitleSection;
