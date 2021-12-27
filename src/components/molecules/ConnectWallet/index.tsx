import {
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
  useToast,
  Link,
} from "@chakra-ui/react";
import { WalletError } from "@solana/wallet-adapter-base";
import { useCallback, useEffect } from "react";

import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

export const ConnectWallet = () => {
  const {
    wallets,
    select,
    disconnect,
    connected,
    wallet,
    adapter,
    connecting,
  } = useWallet();

  const { t } = useTranslation();

  const toast = useToast();

  const msg = t("appPage.wallet-missing")?.replace(
    "{{wallet}}",
    String(wallet?.name)
  );

  const showToast = useCallback(() => {
    toast({
      title: "Wallet extension not detected",
      status: "error",
      description: (
        <Link target="_blank" rel="noreferrer noopener" href={wallet?.url}>
          {msg}
        </Link>
      ),
      variant: "subtle",
      isClosable: true,
    });
  }, [msg, toast, wallet?.url]);

  const tryConnect = useCallback(async () => {
    if (adapter) {
      try {
        // try to force connection to access adapter errors if not installed
        await adapter.connect();
      } catch (e) {
        const error = e as WalletError;
        if (
          error.name === "WalletNotFoundError" ||
          error.name === "WalletNotReadyError"
        ) {
          showToast();
        }
      }
    }
  }, [adapter, showToast]);

  useEffect(() => {
    if (adapter && wallet && !connected && !connecting) {
      tryConnect();
    }
  }, [tryConnect, adapter, wallet, connected, connecting]);

  const [isLargerThan430] = useMediaQuery("(min-width: 430px)");
  if (connected) {
    return (
      <MButton
        variant="solid"
        font="text-lg"
        height="40px"
        onClick={() => disconnect()}
      >
        {t("appPage.disconnect-wallet")}
      </MButton>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={MButton}
        variant="solid"
        font="text-lg"
        height="40px"
        leftIcon={<Image src="/icons/wallet.svg" width="0.8rem" />}
        rightIcon={<Image src="/icons/expand-more.svg" width="0.5rem" />}
      >
        {isLargerThan430 ? t("appPage.connect-wallet") : ""}
      </MenuButton>
      <MenuList border="none" rounded="md" shadow="none">
        {wallets.map((walletItem) => (
          <MenuItem
            key={walletItem.name}
            icon={<Image src={walletItem.icon} width="0.8rem" />}
            onClick={() => {
              select(walletItem.name);
            }}
          >
            <MText type="text-lg">{walletItem.name}</MText>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
