import { Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { useTranslation } from "../../../hooks/useTranslation";
import { useWallet } from "../../../hooks/useWallet";
import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";

export const Wallet = () => {
  const { wallets, select, disconnect, connected } = useWallet();

  const { t } = useTranslation();
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
        {t("appPage.connect-wallet")}
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
