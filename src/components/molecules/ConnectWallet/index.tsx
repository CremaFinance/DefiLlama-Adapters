import {
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Link,
} from "@chakra-ui/react";
import { WalletError } from "@solana/wallet-adapter-base";
import { useCallback, useEffect, useState } from "react";

import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import { shortenAddress } from "../../../utils/shorten-address";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

interface ConnectWalletProps {
  size?: "small" | "large";
  props?: { width?: string } | Record<string, never>;
}

export const ConnectWallet = ({
  size = "large",
  props = {},
}: ConnectWalletProps) => {
  const {
    wallets,
    select,
    disconnect,
    connected,
    wallet,
    adapter,
    connecting,
    publicKey,
  } = useWallet();

  const { t } = useTranslation();
  const toast = useToast();

  const msg = t("appPage.wallet-missing")?.replace(
    "{{wallet}}",
    String(wallet?.name)
  );

  const [requestConnect, setRequestConnect] = useState(false);

  const buttonProps = {
    height: size === "large" ? "40px" : "32px",
    font: size === "large" ? "text-lg" : "",
    ...props,
  };

  const buttonText =
    size === "large" ? t("appPage.connect-wallet") : t("appPage.connect");

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
    if (adapter && wallet && !connected && !connecting && requestConnect) {
      tryConnect();
    }
  }, [tryConnect, adapter, wallet, connected, connecting, requestConnect]);

  const tryDisconnect = useCallback(async () => {
    await disconnect();
    toast({
      title: t("appPage.disconnect-wallet-title"),
      status: "success",
      description: t("appPage.disconnect-wallet-description"),
      variant: "subtle",
      isClosable: true,
    });
  }, [disconnect, t, toast]);

  return (
    <Menu>
      <MenuButton
        as={MButton}
        variant="solid"
        leftIcon={<Image src="/icons/wallet.svg" width="0.8rem" />}
        {...buttonProps}
      >
        {connected && publicKey
          ? shortenAddress(publicKey.toString())
          : buttonText}
      </MenuButton>
      <MenuList zIndex={10} border="none" rounded="md" shadow="none">
        {connected ? (
          <MenuItem key="disconnect" onClick={() => tryDisconnect()}>
            <MText type="text-lg">{t("appPage.disconnect-wallet")}</MText>
          </MenuItem>
        ) : (
          wallets.map((walletItem) => (
            <MenuItem
              key={walletItem.name}
              icon={<Image src={walletItem.icon} width="0.8rem" />}
              onClick={() => {
                select(walletItem.name);
                setRequestConnect(true);
              }}
            >
              <MText type="text-lg">{walletItem.name}</MText>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};
