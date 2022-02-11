/* eslint-disable sonarjs/cognitive-complexity */
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
import { useTracking } from "../../../hooks/useTracking";
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

  const { track } = useTracking();
  const [isAddLiquidityActive, setAddLiquidityActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const {
    nativeSOLBalance,
    liqSOLBalance,
    liquiditySOLPart,
    liquidityMSolPart,
  } = useUserBalance();
  const { connected: isWalletConnected } = useWallet();
  const { liqPoolBalance } = useStats();
  const chain = useChain();
  const { data } = usePrice(coinSymbols.SOL);
  const solUSD = data ? data[coinSymbols.SOL]?.usd : 0;

  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;

  const removeLiquidityButton =
    liqSOLBalance === 0
      ? t("appPage.liquidity-modal.get-lp")
      : t("appPage.liquidity-modal.remove-liquidity");

  // eslint-disable-next-line consistent-return
  const addLiquidityHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      Number(amount),
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    if (
      Number(amount) +
        Number(format5Dec(liqPoolBalance ?? 0, LAMPORTS_PER_SOL)) >
      Number(
        format5Dec(Number(state?.liq_pool?.liquidity_sol_cap), LAMPORTS_PER_SOL)
      )
    ) {
      return toast({
        title: t("appPage.amount-exceeds-current-liquidity-cap"),
        description: t("appPage.try-using-max-button"),
        status: "warning",
        duration: 10000,
      });
    }

    const fundsNeeded =
      Number(amount) * LAMPORTS_PER_SOL +
      (marinadeState?.transactionFee ?? 0) * 4 +
      (marinadeState?.state.rent_exempt_for_token_acc.toNumber() ?? 0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    setLoading(true);

    marinade
      .runAddLiquidity(Number(amount) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          setAmount("");

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

          track({
            event: "Add Liquidity",
            category: "Liquidity",
            action: "Add",
            label: "Success",
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

          track({
            event: "Add Liquidity Error",
            category: "Liquidity",
            action: "Add",
            label: "Error",
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line consistent-return
  const removeLiquidityHandler = () => {
    const basicInputChecksErrors = basicInputChecks(
      Number(amount),
      isWalletConnected
    );
    if (basicInputChecksErrors) {
      return toast(basicInputChecksErrors);
    }

    const fundsNeeded =
      (marinadeState?.transactionFee ?? 0) * 4 +
      (marinadeState?.state.rent_exempt_for_token_acc.toNumber() ?? 0);
    const checkBalanceErrors = checkNativeSOLBalance(
      nativeSOLBalance ?? 0,
      fundsNeeded
    );
    if (checkBalanceErrors) {
      return toast(checkBalanceErrors);
    }

    if (liqSOLBalance && Number(amount) > liqSOLBalance) {
      return toast({
        title: t("appPage.insufficient-funds-to-remove"),
        description: t("appPage.requested-liquidity-not-enough-funds")
          .replace("{{amount}}", amount)
          .replace("{{liqSOLBalance}}", liqSOLBalance),
        status: "warning",
      });
    }
    setLoading(true);

    marinade
      .runRemoveLiquidity(Number(amount) * LAMPORTS_PER_SOL)
      .then(
        (transactionSignature) => {
          setAmount("");
          toast({
            title: t("appPage.remove-liquidity-confirmed"),
            description: (
              <p>
                {t("appPage.successfully-removed-liquidity-your-sol")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Remove Liquidity",
            category: "Liquidity",
            action: "Remove",
            label: "Success",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("appPage.something-went-wrong"),
            description: error.toString().includes("0xa7")
              ? t("appPage.your-lp-account-is-deactivated")
              : error.message,
            status: "warning",
          });
          track({
            event: "Remove Liquidity Error",
            category: "Liquidity",
            action: "Remove",
            label: "Success",
            description: error.message,
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
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
              handleSwitch={(switchValue) => {
                setAddLiquidityActive(switchValue);
                setAmount("");
              }}
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
          {isAddLiquidityActive ? (
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setAmount}
              tokenName="SOL"
              tokenIcon="/icons/solana-dark.png"
              tokenBalance={
                nativeSOLBalance
                  ? nativeSOLBalance / LAMPORTS_PER_SOL - 0.001
                  : 0
              }
              value={amount}
              mb={4}
            />
          ) : (
            <StakeInput
              stakeInputType={StakeInputTypeEnum.Liquidity}
              onValueChange={setAmount}
              tokenName=""
              tokenIcon="/icons/mSOL-SOL LP.svg"
              tokenBalance={liqSOLBalance ?? 0}
              value={amount}
              mb={4}
            />
          )}
          <Flex h="52px">
            {!isAddLiquidityActive ? (
              <Flex flexDirection="column" flex={1}>
                <Flex justifyContent="space-between">
                  <Text lineHeight="21.6px" fontSize="14.4px">
                    {t("appPage.liquidity-modal.conversion-explained")}
                  </Text>
                  <Text lineHeight="21.6px" fontSize="14.4px">
                    {`= ${
                      liquiditySOLPart && liqSOLBalance
                        ? format5Dec(
                            (Number(amount) * liquiditySOLPart) / liqSOLBalance
                          )
                        : 0
                    } SOL`}
                  </Text>
                </Flex>
                <Text mb={4} align="end" lineHeight="21.6px" fontSize="14.4px">
                  {`= ${
                    liquidityMSolPart && liqSOLBalance
                      ? format5Dec(
                          (Number(amount) * liquidityMSolPart) / liqSOLBalance
                        )
                      : 0
                  } mSOL`}
                </Text>
              </Flex>
            ) : null}
          </Flex>
          <Flex justifyContent="center">
            {isAddLiquidityActive ? (
              <Button
                bg={colors.marinadeGreen}
                isLoading={loading}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                width="100%"
                _focus={{ boxShadow: "none" }}
                my={8}
                onClick={addLiquidityHandler}
              >
                {t("appPage.liquidity-modal.add-liquidity")}
              </Button>
            ) : (
              <Button
                bg={colors.marinadeGreen}
                isLoading={loading}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                height="48px"
                width="100%"
                _focus={{ boxShadow: "none" }}
                my={8}
                onClick={
                  liqSOLBalance === 0
                    ? () => setAddLiquidityActive(true)
                    : removeLiquidityHandler
                }
              >
                {removeLiquidityButton}
              </Button>
            )}
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
  );
};

export default SolLiquidityModal;
