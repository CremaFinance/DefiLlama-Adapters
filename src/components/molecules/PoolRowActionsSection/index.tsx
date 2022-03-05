import { Flex, Image, useDisclosure } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { useContext, useState } from "react";

import { AccountsContext } from "../../../contexts/AccountsContext";
import { useWallet } from "../../../hooks/useWallet";
import type { Action } from "../../../services/domain/pool";
import colors from "../../../styles/customTheme/colors";
import Button from "../../atoms/Button";
import { ConnectWallet } from "../ConnectWallet";
import MSolLpModal from "../MSolLpModal";
import MSolStakeModal from "../MSolStakeModal";
import PendingStakeModal from "../PendingStakeModal";
import SolLiquidityModal from "../SolLiquidityModal";

type PoolRowActionsSectionProps = {
  actions: Action[];
  componentAction: string;
};

const PoolRowActionsSection: FunctionComponent<PoolRowActionsSectionProps> = ({
  actions,
  componentAction,
}) => {
  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      transactionSignedAction(false);
    },
  });
  const { connected: isWalletConnected } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const triggerTransactionModal = (value: boolean) => {
    if (!value) {
      setIsLoading(false);
      transactionSignedAction(false);
    } else {
      setIsLoading(true);
    }
  };

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
              flex={1}
              rightIcon={
                <Image src="/icons/external-link-white.svg" width="0.8rem" />
              }
              onClick={() => window.open(actions[0].url, "_blank")}
            >
              {actions[0].text}
            </Button>
          </Flex>
          {actions[1] ? (
            <Flex
              flex={{ base: 1, lg: 0 }}
              marginTop={{ base: 0, lg: "8px" }}
              marginRight={{ base: "8px", lg: 0 }}
            >
              <Button
                variant="outline"
                colorScheme="gray"
                _hover={{ bg: "gray.100" }}
                border="1px"
                borderColor="gray.500"
                textColor={colors.black}
                rounded="md"
                onClick={() => window.open(actions[1].url, "_blank")}
                flex={1}
                rightIcon={
                  <Image src="/icons/external-link-black.svg" width="0.8rem" />
                }
              >
                {actions[1].text}
              </Button>
            </Flex>
          ) : null}
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
              <Button variant="solid" flex={1} onClick={() => onOpen()}>
                {actions[0].text}
              </Button>
            ) : (
              <Flex
                width={{ base: "100%", lg: undefined }}
                justifyContent={{ base: "center", lg: undefined }}
              >
                <ConnectWallet size="small" props={{ width: "145px" }} />
              </Flex>
            )}
          </Flex>
          {isWalletConnected && actions[1] ? (
            <Flex
              flex={{ base: 1, lg: 0 }}
              marginTop={{ base: 0, lg: "8px" }}
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

      {componentAction === "mSOLSOLLiquidityModal" && (
        <SolLiquidityModal
          isOpen={isOpen}
          onClose={onClose}
          triggerTransactionModal={triggerTransactionModal}
        />
      )}
      {componentAction === "mSOLStakeModal" && (
        <MSolStakeModal
          isOpen={isOpen}
          onClose={onClose}
          triggerTransactionModal={triggerTransactionModal}
        />
      )}
      {componentAction === "mSolSolLPFarmModal" && (
        <MSolLpModal
          isOpenProp={isOpen}
          onCloseProp={onClose}
          triggerTransactionModal={triggerTransactionModal}
        />
      )}
      <PendingStakeModal
        isTransactionSigned={transactionSigned}
        isOpen={isLoading}
        onClose={onClose}
      />
    </>
  );
};

export default PoolRowActionsSection;
