import {
  Flex,
  Image,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FunctionComponent } from "react";

import { useWallet } from "../../../hooks/useWallet";
import { Action } from "../../../services/domain/pool";
import Button from "../../atoms/Button";
import MText from "../../atoms/Text";
import SolLiquidityModal from "../SolLiquidityModal";

type PoolRowActionsSectionProps = {
  actions: Action[];
};

const PoolRowActionsSection: FunctionComponent<PoolRowActionsSectionProps> = ({
  actions,
}) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected: isWalletConnected, wallets, select } = useWallet();

  return (
    <>
      {actions[0].isExternal ? (
        <Flex
          flexDir={{ base: "row-reverse", lg: "column" }}
          justifyContent={{ base: "stretch", lg: undefined }}
          width={{ base: undefined, lg: "145px" }}
          flex={1}
        >
          <Flex flex={{ base: 1.4, lg: 0 }}>
            <Button
              variant="solid"
              marginBottom={{ base: 0, lg: "8px" }}
              flex={1}
              rightIcon={
                <Image src="/icons/external-link-white.svg" width="0.8rem" />
              }
              onClick={() => window.open(actions[0].url, "_blank")}
            >
              {actions[0].text}
            </Button>
          </Flex>
          <Flex flex={{ base: 1, lg: 0 }} marginRight={{ base: "8px", lg: 0 }}>
            <Button
              variant="outline"
              _hover={{ bg: "gray.100" }}
              onClick={() => window.open(actions[1].url, "_blank")}
              flex={1}
              rightIcon={
                <Image src="/icons/external-link-green.svg" width="0.8rem" />
              }
            >
              {actions[1].text}
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex
          flexDir={{ base: "row-reverse", lg: "column" }}
          justifyContent={{ base: "stretch", lg: undefined }}
          width={{ base: undefined, lg: "145px" }}
          flex={1}
        >
          <Flex flex={{ base: 1.4, lg: 0 }}>
            {isWalletConnected ? (
              <Button
                variant="solid"
                marginBottom={{ base: 0, lg: "8px" }}
                flex={1}
                onClick={() => onOpen()}
              >
                {actions[0].text}
              </Button>
            ) : (
              <Flex
                width={{ base: "100%", lg: undefined }}
                justifyContent={{ base: "center", lg: undefined }}
              >
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="solid"
                    height="32px"
                    leftIcon={<Image src="/icons/wallet.svg" width="0.8rem" />}
                    rightIcon={
                      <Image src="/icons/expand-more.svg" width="0.5rem" />
                    }
                  >
                    {t("appPage.connect")}
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
              </Flex>
            )}
          </Flex>
          {isWalletConnected ? (
            <Flex
              flex={{ base: 1, lg: 0 }}
              marginRight={{ base: "8px", lg: 0 }}
            >
              <Button
                variant="outline"
                _hover={{ bg: "gray.100" }}
                onClick={() => window.open(actions[1].url, "_blank")}
                flex={1}
              >
                {actions[1].text}
              </Button>
            </Flex>
          ) : null}
        </Flex>
      )}

      <SolLiquidityModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PoolRowActionsSection;
