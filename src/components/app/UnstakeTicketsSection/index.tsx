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
};

const UnstakeTicketsSection = ({
  ticketAccounts,
}: UnstakeTicketsSectionProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isWiderThan768] = useMediaQuery("(min-width: 768px)");

  // TODO replace with actual values
  // const ticketAccounts = [
  //   {
  //     key: 1,
  //     address: "vfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
  //     amount: 12.2323333333,
  //     claimed: false,
  //   },
  //   {
  //     key: 2,
  //     address: "aaaavfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
  //     amount: 12.2323,
  //     claimed: false,
  //   },
  //   {
  //     key: 3,
  //     address: "bbbbvfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
  //     amount: 12.2323,
  //     claimed: true,
  //   },
  //   {
  //     key: 4,
  //     address: "vfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
  //     amount: 12.2,
  //     claimed: false,
  //   },
  // ];

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
          {ticketAccounts.map((account) => (
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
                  // isDisabled={account.claimed}
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
                >
                  {t("appPage.claim-action")}
                </MButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default UnstakeTicketsSection;
