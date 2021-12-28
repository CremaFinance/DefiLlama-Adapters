/* eslint-disable complexity */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Image,
  ModalHeader,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";

import { useChain } from "../../../contexts/ConnectionProvider";
import { useMarinade } from "../../../contexts/MarinadeContext";
import { useStats } from "../../../contexts/StatsContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import { usePrice } from "../../../hooks/usePrice";
import { useWallet } from "../../../hooks/useWallet";
import { coinSymbols } from "../../../services/domain/coinSymbols";
import colors from "../../../styles/customTheme/colors";
import { basicInputChecks } from "../../../utils/basic-input-checks";
import { checkNativeSOLBalance } from "../../../utils/check-native-sol-balance";
import { format2Dec, format5Dec } from "../../../utils/number-to-short-version";
import StakeInput, { StakeInputTypeEnum } from "../StakeInput";
import SwitchButtons from "../SwitchButtons";
import TransactionLink from "../TransactionLink";

interface SolLiquidityModalProps {
  onClose: () => Promise<void> | void;
  isOpen: boolean;
}

const SolLiquidityModal = ({
  onClose: onCloseProp,
  isOpen: isOpenProp,
}: SolLiquidityModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isAddLiquidityActive, setAddLiquidityActive] = useState(true);
  const [addLiquidityLoading, setAddLiquidityLoading] = useState(false);
  const [liquidityAmount, setLiquidityAmount] = useState<string>("");
  const { nativeSOLBalance, liqSOLBalance, liquiditySOLPart } =
    useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const { liqPoolBalance } = useStats();
  const chain = useChain();
  const { data } = usePrice(coinSymbols.SOL);
  const solUSD = data ? data[coinSymbols.SOL]?.usd : 0;

  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;

  // replace these with data from services
  const removeLiqSolBalance = 0.0013;
  const removeLiqmSolBalance = 0.0023;

  const removeLiquidityButton =
    liqSOLBalance === 0
      ? t("appPage.liquidity-modal.get-lp")
      : t("appPage.liquidity-modal.remove-liquidity");

  const liquidityButtonText = isAddLiquidityActive
    ? t("appPage.liquidity-modal.add-liquidity")
    : removeLiquidityButton;

  // eslint-disable-next-line consistent-return
  const addLiquidityHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      Number(liquidityAmount),
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    if (
      Number(liquidityAmount) +
        Number(format5Dec(liqPoolBalance ?? 0, LAMPORTS_PER_SOL)) >
      Number(
        format5Dec(Number(state?.liq_pool?.liquidity_sol_cap), LAMPORTS_PER_SOL)
      )
    ) {
      return toast({
        title: t("appPage.ammount-exceeds-current-liquidity-cap"),
        description: t("appPage.try-using-max-button"),
        status: "warning",
        duration: 10000,
      });
    }

    const fundsNeeded =
      Number(liquidityAmount) * LAMPORTS_PER_SOL +
      (marinadeState?.transactionFee ?? 0) * 4 +
      (marinadeState?.state.rent_exempt_for_token_acc.toNumber() ?? 0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    setAddLiquidityLoading(true);

    marinade
      .runAddLiquidity(Number(liquidityAmount) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          setLiquidityAmount("");

          toast({
            title: t("appPage.liquidity-sol-confirmed"),
            description: (
              <p>
                {t("appPage.successfully-liquidity-your-sol")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("appPage.something-went-wrong"),
            description: error.message,
            status: "warning",
          });
        }
      )
      .finally(() => setAddLiquidityLoading(false));
  };

  return (
    <>
      <Modal isOpen={isOpenProp} onClose={onCloseProp}>
        <ModalOverlay w="100vw" />
        <ModalContent
          px={[4, 8]}
          pb={[4, 8]}
          w={["90vw", "480px"]}
          backgroundColor="white"
          overflow="auto"
        >
          <ModalHeader mb={[2, 0]} />
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody p={0}>
            <Flex display="flex" justifyContent="center">
              <SwitchButtons
                leftText={t("appPage.liquidity-modal.add-liquidity")}
                rightText={t("appPage.liquidity-modal.remove-liquidity")}
                height={40}
                mb={8}
                width={["254px", "322px"]}
                buttonWidth={["121px", "155px"]}
                active={isAddLiquidityActive}
                font="text-lg"
                display="flex"
                handleSwitch={setAddLiquidityActive}
              />
            </Flex>
            <Flex mb={2}>
              <Image src="/icons/mSOL-SOL LP.svg" width="24px" height="24px" />
              <Text marginLeft="8px" fontSize="14.4px">
                {t("appPage.liquidity-modal.pool")}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text lineHeight="21.6px" fontSize="14.4px">
                {t("appPage.liquidity-modal.balance")}
              </Text>
              <Text lineHeight="21.6px" fontSize="14.4px">
                {format5Dec(liqSOLBalance ?? 0)}
              </Text>
            </Flex>
            <Text align="end" lineHeight="21.6px" fontSize="14.4px">
              {`= ${format5Dec(liquiditySOLPart ?? 0)} SOL`}
            </Text>
            <Text align="end" mb={4} lineHeight="21.6px" fontSize="14.4px">
              {`= $ ${format2Dec((liquiditySOLPart ?? 0) * (solUSD ?? 0))}`}
            </Text>
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setLiquidityAmount}
              tokenName={isAddLiquidityActive ? "SOL" : "mSOL-SOL LP"}
              tokenIcon={
                isAddLiquidityActive
                  ? "/icons/solana-dark.png"
                  : "/icons/mSOL-SOL LP.svg"
              }
              tokenBalance={
                nativeSOLBalance
                  ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
                  : 0
              }
              value={liquidityAmount}
              mb={4}
            />
            <Flex h="52px">
              {!isAddLiquidityActive ? (
                <Flex flexDirection="column" flex={1}>
                  <Flex justifyContent="space-between">
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      {t("appPage.liquidity-modal.conversion-explained")}
                    </Text>
                    <Text lineHeight="21.6px" fontSize="14.4px">
                      {`= $ ${removeLiqSolBalance} SOL`}
                    </Text>
                  </Flex>
                  <Text
                    mb={4}
                    align="end"
                    lineHeight="21.6px"
                    fontSize="14.4px"
                  >
                    {`= $ ${removeLiqmSolBalance} mSOL`}
                  </Text>
                </Flex>
              ) : null}
            </Flex>
            <Flex justifyContent="center">
              <Button
                font="text-xl"
                bg={colors.marinadeGreen}
                isLoading={addLiquidityLoading}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                _focus={{ boxShadow: "none" }}
                my={8}
                onClick={addLiquidityHandler}
              >
                {liquidityButtonText}
              </Button>
            </Flex>
            <Text lineHeight="21.6px" fontSize="14.4px">
              {t(
                isAddLiquidityActive
                  ? "appPage.liquidity-modal.description-add-liqidity"
                  : "appPage.liquidity-modal.description-remove-liqidity"
              )}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SolLiquidityModal;
