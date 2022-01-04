import { Flex, Icon } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { IoCheckmarkCircle } from "react-icons/io5";

import colors from "../../../styles/customTheme/colors";
import MText from "../../atoms/Text";

type UnstakeOptionsProps = {
  active: boolean;
  unstakeNowReceive: string;
  delayedUnstakeReceive: string;
  unstakeNowFee: string;
  mb: number;
  handleSwitch: (v: boolean) => void;
};

const UnstakeOptions = ({
  active,
  unstakeNowReceive,
  delayedUnstakeReceive,
  unstakeNowFee,
  mb,
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
      mb={mb}
    >
      <Flex
        bg={active ? colors.marinadeEvenLighterGreen : "gray.50"}
        border="1px"
        borderColor={active ? colors.marinadeBorderGreen : "gray.100"}
        rounded="md"
        height="fit-content"
        width="100%"
        flex={1}
        p={[2, 4]}
        _hover={{}}
        cursor="pointer"
        onClick={() => handleSwitch(true)}
      >
        <Flex width="100%" flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" pb={2}>
            <MText color="gray.500" fontWeight="bold" type="text-md">
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
          <MText color={colors.black} type="text-xl" fontWeight="bold">
            {unstakeNowReceive} SOL
          </MText>
          <MText color={colors.black} type="text-sm">
            {t("appPage.stake-inputs-unstake-fee")}: {unstakeNowFee}
          </MText>
        </Flex>
      </Flex>
      <Flex
        bg={active ? "gray.50" : colors.marinadeEvenLighterGreen}
        border="1px"
        borderColor={active ? "gray.100" : colors.marinadeBorderGreen}
        rounded="md"
        height="fit-content"
        width="100%"
        flex={1}
        p={[2, 4]}
        _hover={{}}
        cursor="pointer"
        onClick={() => handleSwitch(true)}
      >
        <Flex width="100%" flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" pb={2}>
            <MText color="gray.500" fontWeight="bold" type="text-md">
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
          <MText color={colors.black} type="text-xl" fontWeight="bold">
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
