import {
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";
import { useTranslation } from "next-export-i18n";
import { MdContentCopy } from "react-icons/md";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import { useEpochInfo } from "hooks/useEpochInfo";
import { useWallet } from "hooks/useWallet";
import { LamportsToSol } from "solana/marinade-anchor/common";
import { TicketAccountData } from "solana/marinade-anchor/marinade-finance-schema";
import colors from "styles/customTheme/colors";
import { format5Dec, format2Dec } from "utils/number-to-short-version";
import { shortenAddress } from "utils/shorten-address";

export interface TicketAccount {
  ticketDueDateTime?: Date;
  ticketDue?: boolean;
  key: PublicKey;
  data: TicketAccountData;
}

type UnstakeTicketsSectionProps = {
  ticketAccounts: TicketAccount[];
  runClaimHandler: (accountPubkey: TicketAccount["key"]) => void;
};

const UnstakeTicketsSection = ({
  ticketAccounts,
  runClaimHandler,
}: UnstakeTicketsSectionProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");
  const { connected: isWalletConnected } = useWallet();
  const epochInfo = useEpochInfo()?.data;
  const accounts: TicketAccount[] = [];

  const SLOT_DURATION_MILLISECONDS = 600;
  const EXTRA_WAIT_MILLISECONDS = 1000 * 60 * 60 * 4 + 1000 * 60 * 45;
  const EPOCH_ELAPSED_MILLISECONDS = epochInfo
    ? epochInfo.slotIndex * SLOT_DURATION_MILLISECONDS
    : 0;
  const MILLISECONDS_UNTIL_EPOCH_END = epochInfo
    ? (epochInfo.slotsInEpoch - epochInfo.slotIndex) *
      SLOT_DURATION_MILLISECONDS
    : 0;
  const epochStarted = Date.now() - EPOCH_ELAPSED_MILLISECONDS;
  const epochEnds = Date.now() + MILLISECONDS_UNTIL_EPOCH_END;

  ticketAccounts?.forEach((account: TicketAccount) => {
    const createdEpoch = Number(account.data.created_epoch);
    if (epochInfo) {
      if (epochInfo?.epoch > createdEpoch + 2) {
        accounts.push({
          ...account,
          ticketDue: true,
          ticketDueDateTime: new Date(
            epochStarted +
              EXTRA_WAIT_MILLISECONDS -
              SLOT_DURATION_MILLISECONDS * (epochInfo.epoch - createdEpoch - 2)
          ),
        });
      } else if (epochInfo.epoch === createdEpoch + 2) {
        const millisecondsElapsed =
          epochInfo.slotIndex * SLOT_DURATION_MILLISECONDS;
        accounts.push({
          ...account,
          ticketDue: millisecondsElapsed > EXTRA_WAIT_MILLISECONDS,
          ticketDueDateTime: new Date(epochStarted + EXTRA_WAIT_MILLISECONDS),
        });
      } else if (epochInfo.epoch === createdEpoch + 1) {
        accounts.push({
          ...account,
          ticketDue: false,
          ticketDueDateTime: new Date(epochEnds + EXTRA_WAIT_MILLISECONDS),
        });
      } else if (epochInfo.epoch < createdEpoch) {
        accounts.push({
          ...account,
          ticketDue: false,
          ticketDueDateTime: new Date(
            epochEnds +
              2 * epochInfo.slotsInEpoch * SLOT_DURATION_MILLISECONDS +
              EXTRA_WAIT_MILLISECONDS
          ),
        });
      } else {
        accounts.push({
          ...account,
          ticketDue: false,
          ticketDueDateTime: new Date(
            epochEnds +
              epochInfo.slotsInEpoch * SLOT_DURATION_MILLISECONDS +
              EXTRA_WAIT_MILLISECONDS
          ),
        });
      }
      return accounts.sort((a: TicketAccount, b: TicketAccount) => {
        return a.ticketDue !== undefined && b.ticketDue !== undefined
          ? +b.ticketDue - +a.ticketDue
          : 1;
      });
    }

    return null;
  });

  const noTicketAccountsMessage = isWalletConnected
    ? t("appPage.no-ticket-accounts-message")
    : t("appPage.wallet-not-connected");

  const copyAddressToClipboard = (v: string) => {
    navigator.clipboard.writeText(v);

    toast({
      title: t("appPage.copy-success-title"),
      description: t("appPage.copy-success-message"),
      status: "success",
      variant: "subtle",
      isClosable: true,
    });
  };

  return (
    <Flex width="100%" pt={12}>
      {ticketAccounts.length ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Td pl={0} pr={[2, 6]}>
                <MText type="text-md" fontWeight="bold">
                  {t("appPage.tickets-accounts")}
                </MText>
              </Td>
              <Td isNumeric px={[2, 6]}>
                <MText type="text-md" fontWeight="bold">
                  {t("appPage.sol")}
                </MText>
              </Td>
              <Td />
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map((account) => (
              <Tr key={account.key.toBase58()} height="60px">
                <Td pl={0} py={0} pr={[2, 6]}>
                  <Flex>
                    <MText type="text-md">
                      {shortenAddress(`${account?.key?.toBase58()}`)}
                    </MText>
                    <IconButton
                      variant="link"
                      aria-label="Copy address"
                      size="sm"
                      icon={<MdContentCopy />}
                      _focus={{ boxShadow: "none" }}
                      onClick={() =>
                        copyAddressToClipboard(account?.key?.toBase58())
                      }
                    />
                  </Flex>
                </Td>
                <Td isNumeric py={0} px={[2, 6]}>
                  <MText type="text-md">
                    {isWiderThan768
                      ? format5Dec(
                          LamportsToSol(
                            JSBI.BigInt(account.data.lamports_amount.toString())
                          )
                        )
                      : format2Dec(
                          LamportsToSol(
                            JSBI.BigInt(account.data.lamports_amount.toString())
                          )
                        )}
                  </MText>
                </Td>
                <Td height="60px" pr={0} py={0} pl={[2, 6]} textAlign="end">
                  <MButton
                    isDisabled={!account.ticketDue}
                    font="text-md"
                    colorScheme="gray"
                    _hover={{ bg: "gray.100" }}
                    border="1px"
                    borderColor="gray.500"
                    textColor={colors.black}
                    rounded="md"
                    px={[4, 4]}
                    height="32px"
                    bg={colors.white}
                    onClick={() => {
                      runClaimHandler(new PublicKey(account.key));
                    }}
                  >
                    {t("appPage.claim-action")}
                  </MButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <MText type="text-md"> {noTicketAccountsMessage}</MText>
      )}
    </Flex>
  );
};

export default UnstakeTicketsSection;
