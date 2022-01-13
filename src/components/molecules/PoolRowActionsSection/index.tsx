import { Flex, Image, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { useWallet } from "../../../hooks/useWallet";
import { Action } from "../../../services/domain/pool";
import Button from "../../atoms/Button";
import { ConnectWallet } from "../ConnectWallet";
import SolLiquidityModal from "../SolLiquidityModal";

type PoolRowActionsSectionProps = {
  actions: Action[];
};

const PoolRowActionsSection: FunctionComponent<PoolRowActionsSectionProps> = ({
  actions,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected: isWalletConnected } = useWallet();

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
                <ConnectWallet shortText />
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

      <SolLiquidityModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PoolRowActionsSection;
