/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import {
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useMediaQuery,
  Divider,
  Icon,
  IconButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import NumberFormat from "react-number-format";

import { useMarinade } from "../../../contexts/MarinadeContext";
import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import colors from "../../../styles/customTheme/colors";
import { format5Dec, format2Dec } from "../../../utils/number-to-short-version";
import {
  shortenAddress,
  shortenAddressForMobile,
} from "../../../utils/shorten-address";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

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
}: StakeInputProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const balanceLabel = t("appPage.balance");

  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");
  const [selectedAccount, setSelectedAccount] = useState(currentAccount);
  const [isStakeAccountSelected, setIsStakeAccountSelected] = useState(false);
  const { connected: isWalletConnected } = useWallet();
  const marinade = useMarinade();
  const state = marinade?.marinadeState?.state;
  const marinadeState = marinade?.marinadeState;

  const BUFFER =
    0.01 +
    ((marinadeState?.transactionFee ?? 0) * 4 +
      (state?.rent_exempt_for_token_acc?.toNumber() ?? 0)) /
      LAMPORTS_PER_SOL;

  const handleSelectedAccount = (
    account: StakeAccountType,
    stakeAccountSelected: boolean
  ) => {
    if (onValueChange) {
      onValueChange(account.balance.toString());
    }
    setSelectedAccount(account);
    setIsStakeAccountSelected(stakeAccountSelected);
    if (selectAccountCallback) {
      selectAccountCallback(stakeAccountSelected, account);
    }
  };

  const copyToClipBoard = (v: string) => {
    try {
      navigator.clipboard.writeText(v);
      toast({
        title: t("appPage.stake-dropdown-toast.successTitle"),
        description: t("appPage.stake-dropdown-toast.successBody"),
        status: "success",
        variant: "subtle",
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: t("appPage.stake-dropdown-toast.errorTitle"),
        description: t("appPage.stake-dropdown-toast.errorTitle"),
        status: "success",
        variant: "subtle",
        isClosable: true,
      });
    }
  };

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
        {isWalletConnected &&
        stakeInputType === StakeInputTypeEnum.Source &&
        currentAccount !== undefined &&
        selectedAccount !== undefined &&
        stakeAccounts !== undefined ? (
          <Menu>
            <MenuButton
              boxShadow="md"
              as={Button}
              rounded="md"
              bg="white"
              _focus={{ boxShadow: "none" }}
              variant="solid"
              font="text-lg"
              height="44px"
              px={2}
              leftIcon={
                <Image src={tokenIcon} mr={1} width={["24px", "30px"]} />
              }
              rightIcon={
                <Image src="/icons/expand-more-black.svg" width="1.5rem" />
              }
            >
              <MText fontWeight="400">
                {isWiderThan768
                  ? shortenAddress(`${selectedAccount.address}`)
                  : shortenAddressForMobile(`${selectedAccount.address}`)}
              </MText>
            </MenuButton>

            <MenuList
              width="320px"
              zIndex={11}
              border="none"
              rounded="md"
              shadow="md"
            >
              {isWalletConnected && (
                <Box>
                  <MenuItem>
                    <MText fontWeight="bold" type="text-lg">
                      {t("appPage.stake-dropdown-wallet-balance")}
                    </MText>
                  </MenuItem>
                  <MenuItem
                    px={4}
                    onClick={() => {
                      handleSelectedAccount(currentAccount, false);
                    }}
                  >
                    <Flex justifyContent="space-between" width="100%">
                      <Flex alignItems="center">
                        {selectedAccount.address === currentAccount.address ? (
                          <Icon
                            as={AiOutlineCheck}
                            width="16px"
                            height="16px"
                            color={colors.black}
                            mr={2}
                          />
                        ) : (
                          <Box width={6} />
                        )}

                        <MText width="100px" mr={2} type="text-lg">
                          {shortenAddress(`${currentAccount.address}`)}
                        </MText>
                        <IconButton
                          variant="link"
                          aria-label="Copy address"
                          size="sm"
                          icon={<MdContentCopy />}
                          _focus={{ boxShadow: "none" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            copyToClipBoard(currentAccount.address);
                          }}
                        />
                      </Flex>

                      <MText type="text-lg">
                        {isWiderThan768
                          ? format5Dec(currentAccount.balance)
                          : format2Dec(currentAccount.balance)}
                      </MText>
                    </Flex>
                  </MenuItem>
                  <Divider orientation="horizontal" color="gray.100" />
                  <MenuItem>
                    <MText fontWeight="bold" type="text-lg">
                      {t("appPage.stake-dropdown-stake-accounts")}
                    </MText>
                  </MenuItem>
                  {!stakeAccounts.length && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      direction="column"
                    >
                      <MText type="text-md">
                        {t("appPage.no-stake-accounts.line-1")}
                      </MText>
                      <MText type="text-md">
                        {t("appPage.no-stake-accounts.line-2")}
                      </MText>
                    </Flex>
                  )}

                  {stakeAccounts.map((stakeAccount) => (
                    <MenuItem
                      isDisabled={!stakeAccount.isStakable}
                      key={stakeAccount.address}
                      onClick={() => {
                        handleSelectedAccount(stakeAccount, true);
                      }}
                      px={4}
                    >
                      <Flex justifyContent="space-between" width="100%">
                        <Flex alignItems="center">
                          {selectedAccount.address === stakeAccount.address ? (
                            <Icon
                              as={AiOutlineCheck}
                              width="16px"
                              height="16px"
                              color={colors.black}
                              mr={2}
                            />
                          ) : (
                            <Box width={6} />
                          )}
                          <MText width="100px" mr={2} type="text-lg">
                            {shortenAddress(`${stakeAccount.address}`)}
                          </MText>
                          <IconButton
                            variant="link"
                            aria-label="Copy address"
                            size="sm"
                            icon={<MdContentCopy />}
                            _focus={{ boxShadow: "none" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              copyToClipBoard(stakeAccount.address);
                            }}
                          />
                        </Flex>

                        <MText type="text-lg">
                          {isWiderThan768
                            ? format5Dec(stakeAccount.balance)
                            : format2Dec(stakeAccount.balance)}
                        </MText>
                      </Flex>
                    </MenuItem>
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
        ) : (
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
        )}
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
        <MText type="text-sm">{`${balanceLabel}: ${tokenBalance.toLocaleString()} ${tokenName}`}</MText>
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
                ? onValueChange((tokenBalance - BUFFER).toString())
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
