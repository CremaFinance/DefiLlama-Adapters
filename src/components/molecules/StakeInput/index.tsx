import { Flex, Image, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

export enum StakeInputTypeEnum {
  Source = "source",
  Target = "target",
}

type StakeInputProps = {
  stakeInputType: StakeInputTypeEnum;
  tokenIcon: string;
  tokenName: string;
  tokenBalance: number;
  width: string[];
  tokenCardWidth?: string[];
  mb?: number;
};

const StakeInput = ({
  stakeInputType,
  tokenIcon,
  tokenName,
  tokenBalance,
  width,
  tokenCardWidth = ["103px"],
  mb = 0,
}: StakeInputProps) => {
  const { t } = useTranslation();
  const balanceLabel = t("appPage.balance");
  const [amount, setAmount] = useState<number | undefined>();

  useEffect(() => {
    setAmount(0);
  }, [stakeInputType]);

  return (
    <Flex
      height="104px"
      width={width}
      bg="gray.50"
      border="1px"
      borderColor="gray.100"
      rounded="md"
      px={4}
      py={2}
      mb={mb}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between">
        <Flex
          boxShadow="md"
          rounded="md"
          justifyContent="space-around"
          alignItems="center"
          width={tokenCardWidth}
          height="44px"
        >
          <Image src={tokenIcon} alt="Source Token Logo" width="30px" />
          <MText type="text-xl">{tokenName}</MText>
        </Flex>

        <NumberFormat
          customInput={Input}
          variant="unstyled"
          placeholder="0.0"
          flex={1}
          textAlign="right"
          fontSize="28.13px"
          fontWeight="bold"
          value={amount}
          allowNegative={false}
          allowEmptyFormatting
          decimalSeparator="."
          decimalScale={9}
          type="text"
          onValueChange={(values) => setAmount(values.floatValue)}
          isDisabled={stakeInputType === StakeInputTypeEnum.Target}
          cursor={
            stakeInputType === StakeInputTypeEnum.Target
              ? "not-allowed"
              : "auto"
          }
        />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-start" mb={2}>
        <MText type="text-sm">{`${balanceLabel}: ${tokenBalance.toLocaleString()} ${tokenName}`}</MText>
        {tokenBalance && stakeInputType === StakeInputTypeEnum.Source ? (
          <MButton
            variant="link"
            font="text-sm"
            color={colors.marinadeGreen}
            fontWeight="bold"
            onClick={() => setAmount(tokenBalance)}
            pb="1px"
            _hover={{}}
          >
            ({t("appPage.max")})
          </MButton>
        ) : undefined}
      </Flex>
    </Flex>
  );
};

export default StakeInput;
