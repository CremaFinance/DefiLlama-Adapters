/* eslint-disable complexity */
import { Flex, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdArrowDownward, MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import UnstakeTicketsSection from "../UnstakeTicketsSection";
import StakeInput, {
  StakeAccountType,
  StakeInputTypeEnum,
} from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import colors from "styles/customTheme/colors";

const StakeInputsSection = () => {
  const { t } = useTranslation();

  const [isStakeActive, setStakeActive] = useState(true);
  const [isUnstakeNowActive, setUnstakeNowActive] = useState(true);
  const [stakeText, setStakeText] = useState(t("appPage.stake-sol-action"));

  const unstakeText = isUnstakeNowActive
    ? t("appPage.unstake-now-action")
    : t("appPage.start-delayed-unstake-action");

  // TODO: Use actual values from services
  const mSOLvsSOLParity = 1.01002;
  const minUnstakeFee = 0.3;
  const maxUnstakeFee = 3;
  const sourceToken = "SOL";
  const sourceTokenIcon = "/icons/solana-dark.png";
  const sourceTokenBalance = 123456;
  const targetToken = "mSOL";
  const targetTokenIcon = "/icons/mSOL.svg";
  const targetTokenBalance = 12.3;
  const timeToUnstake = "~7 days";
  const currentAccount: StakeAccountType = {
    address: "DKVAJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qdfbrvrt5",
    balance: 0.114543543543,
  };
  const stakeAccounts: StakeAccountType[] = [
    {
      address: "asdfJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qvdvwf5",
      balance: 0.115555,
    },
    {
      address: "wwadJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5q4vdg5",
      balance: 0.115454334534,
    },
    {
      address: "sfdsfdfVKRhTrWfVPxzydZQu8q15kWkpe5qpdv5",
      balance: 0.1454353451,
    },
    {
      address: "aaqwsA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qpi55rff",
      balance: 0.11353453534,
    },
    {
      address: "d234dvJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qcdsf4",
      balance: 0.1,
    },
    {
      address: "DKVAJA6ZQAVKRhTrWfVPxzydZQu8q15kWkpe5qpiswy5",
      balance: 0.11,
    },
  ];

  const handleStakeActive = (v: boolean) => {
    setStakeActive(v);
    setUnstakeNowActive(true);
  };

  const handleUnstakeNowActive = (v: boolean) => {
    setUnstakeNowActive(v);
  };

  const handleSelectAccountCallback = (value: boolean) => {
    setStakeText(
      value
        ? t("appPage.deposit-stake-account-action")
        : t("appPage.stake-sol-action")
    );
  };

  return (
    <Flex
      aria-label="stake-inputs-section"
      pb={20}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex
        width={["90vw", "480px"]}
        alignItems="center"
        flexDirection="column"
      >
        <MHeading type="heading-md" mt={4} mb={2}>
          {t("appPage.stake-inputs-title")}
        </MHeading>
        <MText type="text-xl" textAlign="center">
          {t("appPage.stake-inputs-subtitle")}
        </MText>
        <SwitchButtons
          leftText={t("appPage.stake-action")}
          rightText={t("appPage.unstake-action")}
          my={[6]}
          height={40}
          width={["218px"]}
          buttonWidth={["103px"]}
          active={isStakeActive}
          handleSwitch={handleStakeActive}
        />
        <Flex
          width={["90vw", "480px"]}
          bg={colors.white}
          rounded="md"
          alignItems="center"
          flexDirection="column"
          boxShadow="md"
          position="relative"
          p={[4, 10]}
        >
          <SwitchButtons
            leftText={t("appPage.unstake-now-action")}
            rightText={t("appPage.delayed-unstake-action")}
            mb={8}
            height={40}
            width={["254px", "322px"]}
            buttonWidth={["121px", "155px"]}
            active={isUnstakeNowActive}
            font="text-lg"
            display={isStakeActive ? "none" : "flex"}
            handleSwitch={handleUnstakeNowActive}
          />
          <Flex flexDirection={isStakeActive ? "column" : "column-reverse"}>
            <StakeInput
              selectAccountCallback={handleSelectAccountCallback}
              stakeInputType={
                isStakeActive
                  ? StakeInputTypeEnum.Source
                  : StakeInputTypeEnum.Target
              }
              tokenName={sourceToken}
              tokenIcon={sourceTokenIcon}
              tokenBalance={sourceTokenBalance}
              currentAccount={currentAccount}
              stakeAccounts={stakeAccounts}
              mb={2}
            />
            <StakeInput
              selectAccountCallback={handleSelectAccountCallback}
              stakeInputType={
                isStakeActive
                  ? StakeInputTypeEnum.Target
                  : StakeInputTypeEnum.Source
              }
              tokenName={targetToken}
              tokenIcon={targetTokenIcon}
              tokenBalance={targetTokenBalance}
              currentAccount={currentAccount}
              stakeAccounts={stakeAccounts}
              mb={2}
            />
          </Flex>
          <Flex width="100%" my={1} justifyContent="space-between">
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
          {isStakeActive ? (
            <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-stake-fee")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info stake fee"
                  size="sm"
                  _focus={{ boxShadow: "none" }}
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">0%</MText>
            </Flex>
          ) : (
            <Flex width="100%" mt={1} mb={1} justifyContent="space-between">
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-unstake-fee")}
                </MText>
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
          )}
          {!isUnstakeNowActive && !isStakeActive ? (
            <Flex width="100%" my={1} justifyContent="space-between">
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
            top={isStakeActive ? ["109", "133px"] : ["182px", "205px"]}
            variant="ghost"
            position="absolute"
            aria-label="Swap direction"
            bg="gray.50"
            border="2px"
            borderColor={colors.white}
            p={0}
            height="30px"
            minWidth="30px"
            rounded="3xl"
            zIndex={10}
            onClick={() => setStakeActive(!isStakeActive)}
          >
            <MdArrowDownward color={colors.marinadeGreen} fontSize="24px" />
          </MButton>
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
            {isStakeActive ? stakeText : unstakeText}
          </MButton>
          {!isUnstakeNowActive ? <UnstakeTicketsSection /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakeInputsSection;
