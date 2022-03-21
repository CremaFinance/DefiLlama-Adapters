import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Icon,
} from "@chakra-ui/react";
import type { PropsWithChildren, FunctionComponent } from "react";
import { HiCheckCircle } from "react-icons/hi";

import { useTranslation } from "../../../hooks/useTranslation";
import type {
  Leverage,
  LeverageConfig,
} from "../../../services/domain/leverage";
import type { Rewards, RewardsConfig } from "../../../services/domain/rewards";
import Text from "../../atoms/Text";
import { formatNumberLocale } from "utils/format-number-locale";

type ApyAndRewardTooltipProps = PropsWithChildren<{
  tradingApy?: number;
  rewards?: Rewards | RewardsConfig;
  leverage?: Leverage | LeverageConfig;
}>;

const ApyAndRewardTooltip: FunctionComponent<ApyAndRewardTooltipProps> = ({
  tradingApy,
  rewards,
  leverage,
  children,
}) => {
  const { t } = useTranslation();

  const rewardText = (name: string, amount: number) => {
    return t("appPage.pool-row.apyPopover.reward")
      ?.replace("{{reward}}", formatNumberLocale(Math.floor(amount)))
      .replace("{{provider}}", name);
  };

  const rewardsList = rewards
    ? Object.entries(rewards).map(([name, reward]) => {
        return { ...reward, ...{ name } };
      })
    : [];

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
          padding="8px 8px 0 8px"
          backgroundColor="marinadeEvenLighterGreen"
          borderRadius="4px"
        >
          {leverage && (
            <Text fontSize="14.40px" marginBottom="8px" fontWeight="bold">
              {leverage.leverageAmount}x{" "}
              {t("appPage.pool-row.apyPopover.leverage")}
            </Text>
          )}

          <Text fontSize="14.40px" marginBottom="8px">
            {t("appPage.pool-row.apyPopover.trading")}:
            <Text as="span" fontWeight="bold">
              {tradingApy && tradingApy.toFixed(2)}%
            </Text>
          </Text>
          {rewardsList.map((reward) => (
            <Text
              key={`${reward.apy}-${reward.aprDescription}`}
              fontSize="14.40px"
              marginBottom="8px"
            >
              {reward?.aprDescription}:
              <Text as="span" fontWeight="bold">
                {reward?.apy && reward?.apy.toFixed(2)}%
              </Text>
            </Text>
          ))}
          {leverage && leverage.selectedToken && (
            <Text fontSize="14.40px" marginBottom="8px">
              {leverage.selectedToken.symbol}{" "}
              {t("appPage.pool-row.apyPopover.borrow")}:
              <Text as="span" fontWeight="bold">
                {leverage.selectedToken?.borrowApr
                  ? leverage.selectedToken?.borrowApr.toFixed(2)
                  : 0}
                %
              </Text>
            </Text>
          )}
          {rewardsList.map((reward) => (
            <Text
              key={`${reward.name}-${reward.dailyRate}`}
              fontSize="14.40px"
              marginBottom="8px"
            >
              <Icon
                as={HiCheckCircle}
                color="green800"
                w="1rem"
                h="1rem"
                marginBottom="-0.3rem"
                marginRight="0.3rem"
              />
              {reward.dailyRate && rewardText(reward.name, reward.dailyRate)}
            </Text>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ApyAndRewardTooltip;
