/* eslint-disable no-console */
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { FiExternalLink } from "react-icons/fi";

import MButton from "../../atoms/Button";
import MText from "../../atoms/Text";
import NFTTableRow from "../NFTTableRow";
import colors from "styles/customTheme/colors";

export type NFTType = {
  lockedMNDE: number;
  id: string;
  thumbnailURL: string;
  lockEndDate?: Date;
};

type NFTTableProps = {
  accountNFTs?: NFTType[];
  lockedMNDE?: number;
};
const NFTTable = ({ accountNFTs, lockedMNDE }: NFTTableProps) => {
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const { t } = useTranslation();
  return (
    <Flex width="100%" pt={8} flexDirection="column">
      <Table variant="simple">
        {!isMobile ? (
          <Thead>
            <Tr>
              <Td pl={0} px="0">
                <MText
                  fontSize="14.4px"
                  fontWeight="bold"
                  textAlign="left"
                  width="102px"
                >
                  {t("appPage.mnde.nft-levels.nft-header")}
                </MText>
              </Td>
              <Td isNumeric px="0">
                <MText fontSize="14.4px" fontWeight="bold" textAlign="left">
                  {t("appPage.mnde.nft-levels.locked-mnde-header")}
                </MText>
              </Td>
            </Tr>
          </Thead>
        ) : undefined}
        <Tbody>
          {accountNFTs?.map((nft) => (
            <NFTTableRow
              key={nft.id}
              id={nft.id}
              thumbnailURL={nft.thumbnailURL}
              lockedMNDE={nft.lockedMNDE}
              lockEndDate={nft.lockEndDate}
              isClaimEnabled={nft.lockEndDate !== undefined}
              isCancelEnabled={nft.lockEndDate !== undefined}
              isUnlockEnabled={nft.lockEndDate === undefined}
            />
          ))}
          <Tr>
            <Td px="0">
              <MText fontSize="14.4px" fontWeight="bold" textAlign="left">
                {t("appPage.mnde.nft-levels.total-locked")}
              </MText>
            </Td>
            <Td isNumeric px="0">
              <MText
                pl={4}
                fontSize="14.4px"
                fontWeight="bold"
                textAlign={isMobile ? "right" : "left"}
              >
                {lockedMNDE ? `${lockedMNDE} MNDE` : "-"}
              </MText>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <MButton
        mt="32px"
        colorScheme="gray"
        _hover={{ bg: "gray.100" }}
        border="1px"
        borderColor="gray.500"
        textColor={colors.black}
        rounded="md"
        px={[4, 4]}
        height="48px"
        width="100%"
        bg={colors.white}
        fontWeight="700"
        fontSize="18px"
        rightIcon={<Icon as={FiExternalLink} width="16.67px" height="16.2px" />}
      >
        {t("appPage.mnde.nft-levels.vote")}
      </MButton>
    </Flex>
  );
};

export default NFTTable;
