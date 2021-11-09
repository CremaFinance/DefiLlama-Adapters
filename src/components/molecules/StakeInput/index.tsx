import {
  ChakraProps,
  Flex,
  Image,
  Input,
  ResponsiveValue,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/types/utils/types";
import { useTranslation } from "next-export-i18n";

import MText from "../../atoms/Text";

type StakeInputProps = ChakraProps & {
  tokenIcon: string;
  tokenName: string;
  tokenBalance: number;
  width: ResponsiveValue<Union<string>>;
  mb?: number;
};

const StakeInput = ({
  tokenIcon,
  tokenName,
  tokenBalance,
  width,
  mb = 0,
}: StakeInputProps) => {
  const { t } = useTranslation();
  const balanceLabel = t("appPage.balance");

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
          width="103px"
          height="44px"
        >
          <Image src={tokenIcon} alt="Source Token Logo" width="30px" />
          <MText type="text-xl">{tokenName}</MText>
        </Flex>
        <Input
          variant="unstyled"
          placeholder="0"
          flex={0.5}
          textAlign="right"
          fontSize="28.13px"
          fontWeight="bold"
        />
      </Flex>
      <MText
        type="text-sm"
        mb={2}
      >{`${balanceLabel}: ${tokenBalance.toLocaleString()} ${tokenName}`}</MText>
    </Flex>
  );
};

export default StakeInput;
