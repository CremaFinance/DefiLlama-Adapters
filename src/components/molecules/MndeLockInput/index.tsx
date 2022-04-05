/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import { Flex, Image, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import NumberFormat from "react-number-format";

import { usePrices } from "../../../hooks/usePrices";
import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import { coinSymbols } from "../../../services/domain/coinSymbols";
import colors from "../../../styles/customTheme/colors";
import {
  numberToShortVersion,
  format3Dec,
} from "../../../utils/number-to-short-version";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

type MndeLockInputProps = {
  tokenIcon: string;
  tokenName: string;
  tokenBalance: number;
  mb?: number;
  onValueChange?: (value: string) => void;
  value?: string;
};

const MndeLockInput = ({
  tokenIcon,
  tokenName,
  tokenBalance,
  mb = 0,
  onValueChange,
  value = undefined,
}: MndeLockInputProps) => {
  const { t } = useTranslation();
  const prices = usePrices([coinSymbols.MNDE, coinSymbols.MNDE]);
  const balanceLabel = t("appPage.balance");
  const mndeUSD =
    prices[coinSymbols.MNDE]?.usd && Number(prices[coinSymbols.MNDE]?.usd);
  const tokenPrices = {
    [coinSymbols.MNDE]: mndeUSD,
  };
  const { connected: isWalletConnected } = useWallet();

  useEffect(() => {}, [isWalletConnected]);

  return (
    <Flex
      height="104px"
      width="100%"
      bg="gray.50"
      border="1px"
      borderColor="gray.100"
      rounded="md"
      px={[2, 4]}
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
          height="44px"
          px={2}
          bg="white"
        >
          <Image
            src={tokenIcon}
            alt="Token Logo"
            width={["24px", "30px"]}
            mr={2}
          />
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
          value={value}
          onValueChange={(values: { value: string }) => {
            if (Number.isNaN(values.value) || values.value === ".") {
              return;
            }

            if (onValueChange) {
              onValueChange(values.value);
            }
          }}
          allowNegative={false}
          allowEmptyFormatting
          decimalSeparator="."
          decimalScale={9}
        />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Flex>
          {tokenBalance ? (
            <MButton
              variant="link"
              font="text-sm"
              color={colors.marinadeGreen}
              fontWeight="bold"
              pb="1px"
              pl="4px"
              _hover={{}}
            >
              ({t("appPage.max")})
            </MButton>
          ) : undefined}
        </Flex>
        {isWalletConnected && parseFloat(value || "") ? (
          <MText type="text-sm">{`-$ ${format3Dec(
            parseFloat(value || "") * (tokenPrices[tokenName] || 0)
          )}`}</MText>
        ) : null}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Flex>
          <MText type="text-sm">
            {balanceLabel}: {numberToShortVersion(tokenBalance)} {tokenName}
          </MText>
          <MButton
            variant="link"
            font="text-sm"
            color={colors.marinadeGreen}
            fontWeight="bold"
            pb="1px"
            pl="4px"
            _hover={{}}
          >
            ({t("appPage.max")})
          </MButton>
        </Flex>

        <MText type="text-sm">{`-$ ${format3Dec(
          parseFloat(value || "") * (tokenPrices[tokenName] || 0)
        )}`}</MText>
      </Flex>
    </Flex>
  );
};

export default MndeLockInput;
