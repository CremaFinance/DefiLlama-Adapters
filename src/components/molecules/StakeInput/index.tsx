import { Flex, Image, Input, ResponsiveValue } from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/types/utils/types";
import { useState } from "react";

import { useTranslation } from "../../../hooks/useTranslation";
import colors from "../../../styles/customTheme/colors";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

type StakeInputProps = {
  tokenIcon: string;
  tokenName: string;
  tokenBalance: number;
  width: ResponsiveValue<Union<string>>;
  tokenCardWidth?: ResponsiveValue<Union<string>>;
  mb?: number;
};

const StakeInput = ({
  tokenIcon,
  tokenName,
  tokenBalance,
  width,
  tokenCardWidth = "103px",
  mb = 0,
}: StakeInputProps) => {
  const { t } = useTranslation();
  const balanceLabel = t("appPage.balance");
  const [amount, setAmount] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

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
        <Input
          variant="unstyled"
          placeholder="0"
          flex={1}
          textAlign="right"
          fontSize="28.13px"
          fontWeight="bold"
          value={amount}
          type="number"
          onChange={handleChange}
        />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-start" mb={2}>
        <MText type="text-sm">{`${balanceLabel}: ${tokenBalance.toLocaleString()} ${tokenName}`}</MText>
        {tokenBalance ? (
          <MButton
            variant="link"
            font="text-sm"
            color={colors.green}
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
