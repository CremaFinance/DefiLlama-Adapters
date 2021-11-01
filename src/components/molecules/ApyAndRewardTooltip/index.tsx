import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Icon,
} from "@chakra-ui/react";
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
  const marinadeRPD = `≈ ${marinade.toFixed(2)} MNDE/day reward`;
  const providerRPD = provider
    ? `≈ ${provider.toFixed(2)} ${providerShortName}/day reward`
    : null;

  return (
    <Popover placement="bottom" trigger="hover">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow
          backgroundColor="marinadeEvenLighterGreen"
          borderWidth="0"
        />
        <PopoverBody padding="8px" backgroundColor="marinadeEvenLighterGreen">
          <Text>
            Trading APR:{" "}
            <Text as="span" fontWeight="bold">
              {trading}%
            </Text>
          </Text>
          <Text>
            Emissions APR:
            <Text as="span" fontWeight="bold">
              {emission}%
            </Text>
          </Text>
          <Text marginBottom="8px">
            Double Dip APR:
            <Text as="span" fontWeight="bold">
              {doubleDip}%
            </Text>
          </Text>
          {providerRPD && (
            <Text verticalAlign="center">
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
          <Text>
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
