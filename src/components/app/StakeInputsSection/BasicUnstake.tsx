import { Flex, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import UnstakeTicketsSection from "../UnstakeTicketsSection";
import StakeInput, {
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import colors from "styles/customTheme/colors";

const BasicUnstake = () => {
  const { t } = useTranslation();

  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);

  const unstakeText = isUnstakeNowActive
    ? t("appPage.unstake-now-action")
    : t("appPage.start-delayed-unstake-action");

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.01002;
  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const sourceToken = "mSOL";
  const sourceTokenIcon = "/icons/mSOL.svg";
  const sourceTokenBalance = 12.3;
  const targetToken = "SOL";
  const targetTokenIcon = "/icons/solana-dark.png";
  const targetTokenBalance = 0;
  const timeToUnstake = "~7 days";

  return (
    <>
      <SwitchButtons
        leftText={t("appPage.unstake-now-action")}
        rightText={t("appPage.delayed-unstake-action")}
        mb={8}
        height={40}
        width={["254px", "322px"]}
        buttonWidth={["121px", "155px"]}
        active={isUnstakeNowActive}
        font="text-lg"
        display="flex"
        handleSwitch={setUnstakeNowActive}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Source}
        tokenName={sourceToken}
        tokenIcon={sourceTokenIcon}
        tokenBalance={sourceTokenBalance}
        width={["256px", "400px"]}
        mb={2}
      />
      <StakeInput
        stakeInputType={StakeInputTypeEnum.Target}
        tokenName={targetToken}
        tokenIcon={targetTokenIcon}
        tokenBalance={targetTokenBalance}
        tokenCardWidth={["87px"]}
        width={["256px", "400px"]}
        mb={2}
      />
      <Flex width={["256px", "400px"]} my={1} justifyContent="space-between">
        <Flex>
          <MText type="text-md">
            {t("appPage.stake-inputs-exchange-rate")}
          </MText>
          <IconButton
            variant="link"
            aria-label="Info epoch"
            size="sm"
            _focus={{ boxShadow: "none" }}
            icon={<MdInfoOutline />}
          />
        </Flex>
        <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity} SOL`}</MText>
      </Flex>
      <Flex
        width={["256px", "400px"]}
        mt={1}
        mb={1}
        justifyContent="space-between"
      >
        <Flex>
          <MText type="text-md">{t("appPage.stake-inputs-unstake-fee")}</MText>
          <IconButton
            variant="link"
            aria-label="Info unstake fee"
            size="sm"
            _focus={{ boxShadow: "none" }}
            icon={<MdInfoOutline />}
          />
        </Flex>
        <MText type="text-md">{`${minUnstakeFee}-${maxUnstakeFee}%`}</MText>
      </Flex>
      {!isUnstakeNowActive ? (
        <Flex width={["256px", "400px"]} my={1} justifyContent="space-between">
          <Flex>
            <MText type="text-md">
              {t("appPage.stake-inputs-time-to-unstake")}
            </MText>
            <TooltipWithContent
              tooltipText={t("appPage.tooltip-time-to-unstake-text")}
              link={t("appPage.tooltip-time-to-unstake-docs-link")}
            >
              <IconButton
                variant="link"
                aria-label="Info epoch"
                size="sm"
                _focus={{ boxShadow: "none" }}
                icon={<MdInfoOutline />}
              />
            </TooltipWithContent>
          </Flex>
          <MText type="text-md">{timeToUnstake}</MText>
        </Flex>
      ) : null}
      <MButton
        font="text-xl"
        bg={colors.marinadeGreen}
        _hover={{ bg: colors.green800 }}
        colorScheme={colors.marinadeGreen}
        rounded="md"
        px={4}
        height="48px"
        mx={4}
        mt={5}
      >
        {unstakeText}
      </MButton>
      {!isUnstakeNowActive ? <UnstakeTicketsSection /> : null}
    </>
  );
};

export default BasicUnstake;
