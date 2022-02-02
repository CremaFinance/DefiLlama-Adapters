import { Flex, Icon } from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MText from "../../atoms/Text";

type UnstakeOptionsProps = {
  active: boolean;
  unstakeNowReceive: string;
  delayedUnstakeReceive: string;
  initialUnstakeNowFee: number;
  actualUnstakeNowFee: () => number;
  inputValue: string;
  my: number;
  handleSwitch: (v: boolean) => void;
};

const UnstakeOptions = ({
  active,
  unstakeNowReceive,
  delayedUnstakeReceive,
  initialUnstakeNowFee,
  actualUnstakeNowFee,
  inputValue,
  my,
  handleSwitch,
}: UnstakeOptionsProps) => {
  const { t } = useTranslation();
  const delayedUnstakeFee = 0;

  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      gap={[2, 6]}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      my={my}
    >
      <Flex
        bg={active ? colors.marinadeEvenLighterGreen : "gray.50"}
        border="1px"
        borderColor={active ? colors.marinadeBorderGreen : "gray.100"}
        rounded="md"
        width="100%"
        flex={1}
        p={[2, 4]}
        _hover={{}}
        cursor="pointer"
        onClick={() => handleSwitch(true)}
      >
        <Flex width="100%" flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" pb={2}>
            <MText
              textTransform="uppercase"
              color="gray.500"
              fontWeight="bold"
              type="text-sm"
            >
              {t("appPage.unstake-now-action")}
            </MText>
            {active ? (
              <Icon
                as={IoCheckmarkCircle}
                color={colors.marinadeGreen}
                width="20px"
                height="20px"
              />
            ) : null}
          </Flex>
          <MText
            noOfLines={1}
            color={colors.black}
            type="text-lg"
            fontWeight="bold"
          >
            {unstakeNowReceive} SOL
          </MText>
          <Flex>
            <MText color={colors.black} type="text-sm">
              {t("appPage.stake-inputs-unstake-fee")}:
            </MText>
            {inputValue === "0" || inputValue === "" ? (
              <MText color={colors.black} type="text-sm" ml="2px">
                {`${t("appPage.from-fee")} ${initialUnstakeNowFee}%`}
              </MText>
            ) : (
              <MText color={colors.black} type="text-sm">
                {actualUnstakeNowFee()}%
              </MText>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg={active ? "gray.50" : colors.marinadeEvenLighterGreen}
        border="1px"
        borderColor={active ? "gray.100" : colors.marinadeBorderGreen}
        rounded="md"
        width="100%"
        flex={1}
        p={[2, 4]}
        _hover={{}}
        cursor="pointer"
        onClick={() => handleSwitch(false)}
      >
        <Flex width="100%" flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" pb={2}>
            <MText
              textTransform="uppercase"
              color="gray.500"
              fontWeight="bold"
              type="text-sm"
            >
              {t("appPage.delayed-unstake")}
            </MText>
            {!active ? (
              <Icon
                as={IoCheckmarkCircle}
                color={colors.marinadeGreen}
                width="20px"
                height="20px"
              />
            ) : null}
          </Flex>
          <MText
            noOfLines={1}
            color={colors.black}
            type="text-lg"
            fontWeight="bold"
          >
            {delayedUnstakeReceive} SOL
          </MText>
          <MText color={colors.black} type="text-sm">
            {t("appPage.stake-inputs-unstake-fee")}: {delayedUnstakeFee}%
          </MText>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UnstakeOptions;
