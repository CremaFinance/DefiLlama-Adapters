import { Flex, Stack } from "@chakra-ui/layout";
import { useToast, Image, useDisclosure } from "@chakra-ui/react";
import { BN } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useTranslation } from "next-export-i18n";
import { useState, useCallback, useContext, useEffect } from "react";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import MSolStakeModal from "components/molecules/MSolStakeModal";
import PendingStakeModal from "components/molecules/PendingStakeModal";
import TransactionLink from "components/molecules/TransactionLink";
import { AccountsContext } from "contexts/AccountsContext";
import { useChain } from "contexts/ConnectionProvider";
import { useQuarryProvider } from "contexts/QuaryContext";
import { useTracking } from "hooks/useTracking";
import {
  format5Dec,
  numberToShortVersion,
} from "utils/number-to-short-version";

const MsolSolLPRowExtension = () => {
  const { t } = useTranslation();
  const {
    mndeTokadaptState,
    farms: { mLP },
  } = useQuarryProvider();
  const chain = useChain();
  const toast = useToast();
  const { track } = useTracking();

  const { connected } = useWallet();
  const { transactionSigned, transactionSignedAction } =
    useContext(AccountsContext);
  const [isClaimProcessing, setIsClaimProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp, setTimestamp] = useState<BN>(
    new BN(Math.round(new Date().getTime() / 1000))
  );

  useEffect(() => {
    const clock = setInterval(() => {
      setTimestamp(new BN(Math.round(new Date().getTime() / 1000)));
    }, 1000 * 60);
    return () => clearTimeout(clock);
  }, []);
  const { isOpen, onClose } = useDisclosure({
    onClose: () => {
      transactionSignedAction(false);
    },
  });

  const triggerTransactionModal = (value: boolean) => {
    if (!value) {
      setIsLoading(false);
      transactionSignedAction(false);
    } else {
      setIsLoading(true);
    }
  };

  const userStake = mLP?.minerData?.balance || new BN(0);
  const rewardsPerTokenPaid = mLP?.minerData?.rewardsPerTokenPaid || new BN(0);
  const rewardsEarned = mLP?.minerData?.rewardsEarned || new BN(0);
  const rewards = mLP?.quarry?.payroll?.calculateRewardsEarned(
    timestamp,
    userStake,
    rewardsPerTokenPaid,
    rewardsEarned
  );

  // eslint-disable-next-line consistent-return
  const claimHandler = useCallback(() => {
    setIsClaimProcessing(true);
    setIsLoading(true);
    mLP
      ?.claim()
      .then(
        (transactionSignature) => {
          toast({
            title: t("mndePage.claim-mnde-confirmed"),
            description: (
              <p>
                {t("mndePage.succesfully-claimed-mnde")}{" "}
                <TransactionLink
                  chainName={chain.name}
                  transactionid={transactionSignature}
                />
              </p>
            ),
            status: "success",
          });
          track({
            event: "Claim mSOL Farm",
            category: "mSOL Farm",
            action: "Claim",
            label: "Success",
          });
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error(error);

          toast({
            title: t("mndePage.something-went-wrong"),
            description: t("mndePage.error-processing-transaction"),
            status: "warning",
          });
          track({
            event: "Claim mSOL Farm Error",
            category: "mSOL Farm",
            action: "Claim",
            label: "Error",
            description: error.message as string,
          });
        }
      )
      .finally(() => {
        setIsClaimProcessing(false);
        setIsLoading(false);
        transactionSignedAction(false);
      });
  }, [chain.name, mLP, t, toast, track, transactionSignedAction]);

  return (
    <Flex
      py={5}
      direction={{ base: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems={{ base: "flex-start", lg: "center" }}
    >
      <MText fontWeight="bold" fontSize="text-md">{`${t(
        "mndePage.your-deposit"
      )}:  ${numberToShortVersion(
        userStake.toNumber() / LAMPORTS_PER_SOL
      )} LP`}</MText>
      {connected && (
        <Stack
          direction="row"
          spacing={{ base: 6, md: 8 }}
          mt={{ base: 2, lg: "unset" }}
        >
          <Flex alignItems="center">
            <Image src="/icons/mnde.svg" boxSize="24px" mr="4px" />
            <MText fontSize="text-md">{`${format5Dec(
              rewards ? rewards?.toNumber() : 0,
              LAMPORTS_PER_SOL
            )} MNDE`}</MText>
          </Flex>
          <MButton
            variant="outline"
            borderColor="gray"
            _hover={{ bg: "gray.100" }}
            color="black"
            width={{ base: "70px", lg: "80px" }}
            fontWeight="600"
            fontSize="14.4px"
            onClick={() => claimHandler()}
            isLoading={isClaimProcessing}
            isDisabled={
              !mndeTokadaptState ||
              Number(format5Dec(rewards?.toNumber() ?? 0, LAMPORTS_PER_SOL)) <
                0.00001
            }
          >
            {t("mndePage.claim-action")}
          </MButton>
        </Stack>
      )}
      {isOpen && (
        <MSolStakeModal
          isOpen={isOpen}
          onClose={onClose}
          triggerTransactionModal={triggerTransactionModal}
        />
      )}
      <PendingStakeModal
        isTransactionSigned={transactionSigned}
        isOpen={isLoading}
        onClose={onClose}
      />
    </Flex>
  );
};

export default MsolSolLPRowExtension;
