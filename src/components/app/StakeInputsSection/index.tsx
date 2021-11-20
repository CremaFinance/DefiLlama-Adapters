import { Flex, IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { MdArrowDownward, MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import DelayedStakingSection from "../DelayedStakeSection";
import StakeInput from "components/molecules/StakeInput";
import SwitchButtons from "components/molecules/SwitchButtons";
import colors from "styles/customTheme/colors";

const StakeInputsSection = () => {
  const { t } = useTranslation();

  const [isStakeActive, setStakeActive] = useState(true);
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
  const sourceTokenBalance = 123456;
  const targetToken = "SOL";
  const targetTokenIcon = "/icons/solana-dark.png";
  const targetTokenBalance = 0;
  const timeToUnstake = "~7 days";

  const handleStakeActive = (v: boolean) => {
    setStakeActive(v);
    setUnstakeNowActive(true);
  };

  const handleUnstakeNowActive = (v: boolean) => {
    setUnstakeNowActive(v);
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
        width={["288px", "480px"]}
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
          bg={colors.white}
          rounded="md"
          alignItems="center"
          flexDirection="column"
          boxShadow="md"
          pt={isStakeActive ? 8 : 0}
          position="relative"
          p="10"
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
          <Flex flexDirection={!isStakeActive ? "column" : "column-reverse"}>
            <StakeInput
              tokenName={sourceToken}
              tokenIcon={sourceTokenIcon}
              tokenBalance={sourceTokenBalance}
              width={["256px", "400px"]}
              mb={2}
            />
            <StakeInput
              tokenName={targetToken}
              tokenIcon={targetTokenIcon}
              tokenBalance={targetTokenBalance}
              tokenCardWidth={["87px"]}
              width={["256px", "400px"]}
              mb={2}
            />
          </Flex>
          <Flex
            width={["256px", "400px"]}
            my={1}
            justifyContent="space-between"
          >
            <Flex>
              <MText type="text-md">
                {t("appPage.stake-inputs-exchange-rate")}
              </MText>
              <IconButton
                variant="link"
                aria-label="Info epoch"
                size="sm"
                icon={<MdInfoOutline />}
              />
            </Flex>
            <MText type="text-md">{`1 mSOL ≈ ${mSOLvsSOLParity} SOL`}</MText>
          </Flex>
          {isStakeActive ? (
            <Flex
              width={["256px", "400px"]}
              mt={1}
              mb={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-stake-fee")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info stake fee"
                  size="sm"
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">0%</MText>
            </Flex>
          ) : (
            <Flex
              width={["256px", "400px"]}
              mt={1}
              mb={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-unstake-fee")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info unstake fee"
                  size="sm"
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">{`${minUnstakeFee}-${maxUnstakeFee}%`}</MText>
            </Flex>
          )}
          {!isUnstakeNowActive ? (
            <Flex
              width={["256px", "400px"]}
              my={1}
              justifyContent="space-between"
            >
              <Flex>
                <MText type="text-md">
                  {t("appPage.stake-inputs-time-to-unstake")}
                </MText>
                <IconButton
                  variant="link"
                  aria-label="Info epoch"
                  size="sm"
                  icon={<MdInfoOutline />}
                />
              </Flex>
              <MText type="text-md">{timeToUnstake}</MText>
            </Flex>
          ) : null}
          <MButton
            top={isStakeActive ? "124px" : ["182px", "212px"]}
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
            <MdArrowDownward color={colors.green} fontSize="24px" />
          </MButton>
          <MButton
            font="text-xl"
            bg={colors.green}
            _hover={{ bg: colors.green800 }}
            colorScheme={colors.green}
            rounded="md"
            px={[4, 4]}
            height="48px"
            mx={4}
            mt={5}
          >
            {isStakeActive ? t("appPage.stake-action") : unstakeText}
          </MButton>
          {!isUnstakeNowActive ? <DelayedStakingSection /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StakeInputsSection;
