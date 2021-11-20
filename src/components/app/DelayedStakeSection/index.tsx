import {
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { MdContentCopy } from "react-icons/md";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const DelayedStakingSection = () => {
  const { t } = useTranslation();
  const ticketAccounts = [
    {
      key: 1,
      address: "vfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
      amount: "12.2323",
      claimed: false,
    },
    {
      key: 2,
      address: "aaaavfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
      amount: "12.2323",
      claimed: false,
    },
    {
      key: 3,
      address: "bbbbvfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
      amount: "12.2323",
      claimed: true,
    },
    {
      key: 4,
      address: "vfvvbfovbfobvfobvbvdfbvdfbvdfbvfdvbfvbfbvfvfvh",
      amount: "12.2323",
      claimed: false,
    },
  ];

  const action = (v: string) => {
    navigator.clipboard.writeText(v);
  };

  function shortenAddress(address: string, chars = 4): string {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  }

  return (
    <Flex width="100%" pt={12}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Td pl={0} py={[1]}>
              <MText type="text-md" fontWeight="bold">
                {t("appPage.tickets-accounts")}
              </MText>
            </Td>
            <Td py={[4]}>
              <MText type="text-md" fontWeight="bold">
                {t("appPage.sol")}
              </MText>
            </Td>
            <Td />
          </Tr>
        </Thead>
        <Tbody>
          {ticketAccounts.map((ticket) => (
            <Tr key={ticket.key}>
              <Td pl={0} py={[4]}>
                <Flex>
                  <MText type="text-md">
                    {shortenAddress(`${ticket.address}`)}
                  </MText>
                  <IconButton
                    variant="link"
                    aria-label="Copy address"
                    size="sm"
                    icon={<MdContentCopy />}
                    onClick={() => action(ticket.address)}
                  />
                </Flex>
              </Td>
              <Td py={[4]}>{ticket.amount}</Td>
              <Td py={[4]} pr={0} verticalAlign="top" textAlign="end">
                <MButton
                  isDisabled={ticket.claimed}
                  font="text-md"
                  _hover={{ bg: colors.gray100 }}
                  border="1px"
                  borderColor={colors.gray500}
                  textColor={colors.black}
                  rounded="md"
                  px={[4, 4]}
                  height="32px"
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

export default DelayedStakingSection;
