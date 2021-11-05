import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { PropsWithChildren, FunctionComponent } from "react";
import { HiCheckCircle } from "react-icons/hi";

import Text from "../../atoms/Text";

type ApyAndRewardTooltipProps = PropsWithChildren<{
  anualPercentageYield: {
    trading: number;
    emission: number;
    doubleDip: number;
  };
  rewardPerDay: {
    marinade: number;
    provider?: number;
    providerShortName?: string;
  };
}>;

const ApyAndRewardTooltip: FunctionComponent<ApyAndRewardTooltipProps> = ({
  anualPercentageYield: { trading, emission, doubleDip },
  rewardPerDay: { marinade, provider, providerShortName },
  children,
}) => {
  const { t } = useTranslation();

  const marinadeRPD = t("appPage.pool-row.apyPopover.mndeReward").replace(
    "{{reward}}",
    marinade.toFixed(2)
  );
  const providerRPD = provider
    ? t("appPage.pool-row.apyPopover.provReward")
        .replace("{{reward}}", provider.toFixed(2))
        .replace("{{provider}}", providerShortName)
    : null;

  return (
    <Popover
      placement="bottom"
      trigger="hover"
      arrowSize={11}
      arrowPadding={100}
      arrowShadowColor="transparent"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
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
          <Text fontSize="11.52px" marginBottom="4px">
            {t("appPage.pool-row.apyPopover.tradding")}:
            <Text as="span" fontWeight="bold">
              {trading}%
            </Text>
          </Text>
          <Text fontSize="11.52px" marginBottom="4px">
            {t("appPage.pool-row.apyPopover.emission")}:
            <Text as="span" fontWeight="bold">
              {emission}%
            </Text>
          </Text>
          <Text fontSize="11.52px" marginBottom="16px">
            {t("appPage.pool-row.apyPopover.doubleDip")}:
            <Text as="span" fontWeight="bold">
              {doubleDip}%
            </Text>
          </Text>
          {providerRPD && (
            <Text verticalAlign="center" fontSize="11.52px">
              <Icon
                as={HiCheckCircle}
                color="green800"
                w="1rem"
                h="1rem"
                marginBottom="0.2rem"
                marginRight="0.5rem"
              />
              {providerRPD}
            </Text>
          )}
          <Text fontSize="11.52px">
            <Icon
              as={HiCheckCircle}
              color="green800"
              w="1rem"
              h="1rem"
              marginBottom="0.2rem"
              marginRight="0.5rem"
            />
            {marinadeRPD}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ApyAndRewardTooltip;
