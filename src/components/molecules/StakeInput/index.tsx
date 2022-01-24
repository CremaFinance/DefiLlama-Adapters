/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import {
  Flex,
  Image,
  Input,
  Menu,
  MenuList,
  useMediaQuery,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import { useMarinade } from "../../../contexts/MarinadeContext";
import { useUserBalance } from "../../../contexts/UserBalanceContext";
import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import { coinSymbols } from "../../../services/domain/coinSymbols";
import colors from "../../../styles/customTheme/colors";
import { numberToShortVersion } from "../../../utils/number-to-short-version";
import {
  shortenAddress,
  shortenAddressForMobile,
} from "../../../utils/shorten-address";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import StakeInputButton from "../StakeInputButton";
import StakeInputMenuItem from "../StakeInputMenuItem";

export enum StakeInputTypeEnum {
  Source = "source",
  Target = "target",
  Liquidity = "liquidity",
}

export type StakeAccountType = {
  address: string;
  balance: number;
  isStakable?: boolean;
};

type StakeInputProps = {
  stakeInputType: StakeInputTypeEnum;
  tokenIcon: string;
  tokenName: string;
  tokenBalance: number;
  mb?: number;
  currentAccount?: StakeAccountType;
  stakeAccounts?: StakeAccountType[];
  selectAccountCallback?: (
    value: boolean,
    stakeAccount: StakeAccountType
  ) => void;
  onValueChange?: (value: string) => void;
  value?: string;
  isLoading?: boolean;
};

const StakeInput = ({
  stakeInputType,
  tokenIcon,
  tokenName,
  tokenBalance,
  mb = 0,
  currentAccount,
  stakeAccounts,
  selectAccountCallback,
  onValueChange,
  value = undefined,
  isLoading,
}: StakeInputProps) => {
  const { t } = useTranslation();
  const balanceLabel = t("appPage.balance");

  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");
  const [selectedAccount, setSelectedAccount] = useState(currentAccount);
  const [isStakeAccountSelected, setIsStakeAccountSelected] = useState(false);
  const { connected: isWalletConnected } = useWallet();
  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;
  const { nativeSOLBalance } = useUserBalance();

  const isInputWithStakeAccounts =
    stakeInputType === StakeInputTypeEnum.Source &&
    currentAccount !== undefined &&
    selectedAccount !== undefined &&
    stakeAccounts !== undefined;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const solTranslation = t("appPage.sol");
  const BUFFER =
    tokenName === coinSymbols.SOL
      ? 0.01 +
        ((marinadeState?.transactionFee ?? 0) * 4 +
          (state?.rent_exempt_for_token_acc?.toNumber() ?? 0)) /
          LAMPORTS_PER_SOL
      : 0;

  const handleSelectedAccount = (
    account: StakeAccountType,
    stakeAccountSelected: boolean
  ) => {
    if (onValueChange) {
      if (stakeAccountSelected) {
        onValueChange(account.balance.toString());
      } else if (tokenBalance - BUFFER < 0.0001) {
        onValueChange("0");
      } else {
        onValueChange((tokenBalance - BUFFER).toString());
      }
    }
    setSelectedAccount(account);
    setIsStakeAccountSelected(stakeAccountSelected);
    if (selectAccountCallback) {
      selectAccountCallback(stakeAccountSelected, account);
    }
  };

  useEffect(() => {
    if (
      !isWalletConnected ||
      stakeAccounts === undefined ||
      stakeAccounts === null ||
      stakeAccounts.length === 0 ||
      isLoading
    ) {
      return;
    }

    const dummyAccount: StakeAccountType = {
      address: "",
      balance: -LAMPORTS_PER_SOL,
    };

    const largestStakeAccount = stakeAccounts
      .filter((a) => a.isStakable)
      .reduce(
        (a: StakeAccountType, b: StakeAccountType) =>
          a.balance > b.balance ? a : b,
        dummyAccount
      );

    const maxWalletSOL = Math.max(
      0,
      (nativeSOLBalance ?? 0) -
        (marinadeState?.transactionFee ?? 0) * 4 -
        (state?.rent_exempt_for_token_acc?.toNumber() ?? 0) -
        BUFFER
    );

    if (largestStakeAccount.balance * LAMPORTS_PER_SOL > maxWalletSOL) {
      handleSelectedAccount(largestStakeAccount, true);
    } else if (onValueChange && selectAccountCallback && currentAccount) {
      onValueChange("");
      selectAccountCallback(false, currentAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    BUFFER,
    isWalletConnected,
    marinadeState?.transactionFee,
    nativeSOLBalance,
    stakeAccounts,
    state?.rent_exempt_for_token_acc,
  ]);

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
        {!isWalletConnected ? (
          <StakeInputButton component="Button" tokenIcon={tokenIcon}>
            <MText fontWeight="400">{solTranslation}</MText>
          </StakeInputButton>
        ) : null}
        {isWalletConnected && !isInputWithStakeAccounts ? (
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
              alt="Source Token Logo"
              width={["24px", "30px"]}
              mr={2}
            />
            <MText type="text-xl">{tokenName}</MText>
          </Flex>
        ) : null}

        {isWalletConnected && isInputWithStakeAccounts && isWiderThan768 ? (
          <Menu>
            <StakeInputButton
              component="MenuButton"
              tokenIcon={tokenIcon}
              rightIcon={
                stakeAccounts.length ? "/icons/expand-more-black.svg" : ""
              }
            >
              <MText fontWeight="400">
                {isWiderThan768
                  ? shortenAddress(`${selectedAccount.address}`)
                  : shortenAddressForMobile(`${selectedAccount.address}`)}
              </MText>
            </StakeInputButton>

            <MenuList
              width="320px"
              zIndex={11}
              border="none"
              rounded="md"
              shadow="md"
            >
              {isWalletConnected && (
                <Box>
                  <StakeInputMenuItem
                    key={currentAccount.address}
                    icon={tokenIcon}
                    balance={currentAccount.balance}
                    title={solTranslation}
                    subTitle={t("appPage.wrapped-sol")}
                    onClick={() => {
                      handleSelectedAccount(currentAccount, false);
                    }}
                  />

                  {stakeAccounts.map((stakeAccount) => (
                    <StakeInputMenuItem
                      key={stakeAccount.address}
                      isDisabled={!stakeAccount.isStakable}
                      onClick={() => {
                        handleSelectedAccount(stakeAccount, true);
                      }}
                      icon={tokenIcon}
                      balance={stakeAccount.balance}
                      title={t("appPage.sol-stake-account")}
                      subTitle={stakeAccount.address}
                      shortenSubtitle
                    />
                  ))}
                </Box>
              )}
              {!isWalletConnected && (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="50px"
                  direction="column"
                >
                  <MText type="text-sm">
                    {t("appPage.stake-accounts-connect-wallet")}
                  </MText>
                </Flex>
              )}
            </MenuList>
          </Menu>
        ) : null}

        {isWalletConnected && isInputWithStakeAccounts && !isWiderThan768 ? (
          <>
            <StakeInputButton
              component="Button"
              tokenIcon={tokenIcon}
              rightIcon="/icons/expand-more-black.svg"
              onClick={onOpen}
            >
              <MText fontWeight="400">
                {shortenAddressForMobile(`${selectedAccount.address}`)}
              </MText>
            </StakeInputButton>

            <Modal
              isOpen={isOpen}
              onClose={onClose}
              blockScrollOnMount
              size="full"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t("appPage.stake-accounts")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <StakeInputMenuItem
                    key={currentAccount.address}
                    icon={tokenIcon}
                    balance={currentAccount.balance}
                    title={solTranslation}
                    subTitle={t("appPage.wrapped-sol")}
                    onClick={() => {
                      handleSelectedAccount(currentAccount, false);
                      onClose();
                    }}
                  />
                  {stakeAccounts.map((stakeAccount) => (
                    <StakeInputMenuItem
                      key={stakeAccount.address}
                      isDisabled={!stakeAccount.isStakable}
                      onClick={() => {
                        handleSelectedAccount(stakeAccount, true);
                        onClose();
                      }}
                      icon={tokenIcon}
                      balance={stakeAccount.balance}
                      title={t("appPage.sol-stake-account")}
                      subTitle={stakeAccount.address}
                      shortenSubtitle
                    />
                  ))}
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : null}

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
          isDisabled={
            stakeInputType === StakeInputTypeEnum.Target ||
            isStakeAccountSelected
          }
          cursor={
            stakeInputType === StakeInputTypeEnum.Target ||
            isStakeAccountSelected
              ? "not-allowed"
              : "auto"
          }
        />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-start" mb={2}>
        <MText type="text-sm">
          {!isStakeAccountSelected
            ? `${balanceLabel}: ${numberToShortVersion(
                tokenBalance
              )} ${tokenName}`
            : `${t("appPage.stake-account-singular")} ${shortenAddress(
                currentAccount?.address || ""
              )}`}
        </MText>
        {tokenBalance &&
        !isStakeAccountSelected &&
        stakeInputType !== StakeInputTypeEnum.Target ? (
          <MButton
            variant="link"
            font="text-sm"
            color={colors.marinadeGreen}
            fontWeight="bold"
            onClick={() =>
              onValueChange
                ? onValueChange(Math.max(0, tokenBalance - BUFFER).toString())
                : {}
            }
            pb="1px"
            pl="4px"
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
