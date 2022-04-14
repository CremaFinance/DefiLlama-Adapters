import {
  Flex,
  Stack,
  IconButton,
  Image,
  Box,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import type { FunctionComponent } from "react";
import { MdInfoOutline } from "react-icons/md";

import { formatNumberLocale } from "../../../utils/format-number-locale";
import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import UpgradeNFTModal from "../../molecules/UpgradeNFTModal";
import TwitterDataLoadingModal from "../TwittedDataLoadingModal";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import useGovernanceData from "hooks/useGovernanceData";
import { useNftDetails } from "hooks/useNftDetails";
import useShareOnTwitter from "hooks/useShareOnTwitter";
import { useTranslation } from "hooks/useTranslation";
import { useWallet } from "hooks/useWallet";
import { downloadPfp } from "services/marinade/downloadPfp";
import colors from "styles/customTheme/colors";

interface NftDetailsSectionProps {
  id: string;
}

const NftDetailsSection: FunctionComponent<NftDetailsSectionProps> = ({
  id,
}) => {
  const router = useRouter();
  const { connected: isWalletConnected } = useWallet();
  const { data: governance } = useGovernanceData();
  const { t } = useTranslation();
  const { isLoading, data, isIdle } = useNftDetails(id as string);
  const { isLoadingIntent, onLoadingIntent, shareOnTwitter } =
    useShareOnTwitter();
  const unlockPeriod = (data?.properties.unlock_duration ?? 0) / 86_400;
  const {
    isOpen: isUpgradeModalOpen,
    onClose: onUpgradeModalClose,
    onOpen: onUpgradeModalOpen,
  } = useDisclosure();

  const owned = governance?.nfts.find((x) => x.address.toString() === id);

  const skeleton = (
    <Flex
      p={6}
      marginTop={{ base: "16px", lg: "40px" }}
      height="50vh"
      backgroundColor={colors.white}
      width="525px"
      margin="0 auto"
      borderRadius="8px"
      border="1px solid #EDF2F7"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="md" />
    </Flex>
  );

  return (
    <Flex
      mb="100px"
      mt={20}
      aria-label="nft-details-section"
      flexDirection="column"
      pt={{ base: "112px", lg: "88px" }}
      marginTop={{ base: "24px", lg: "48px" }}
      marginBottom={{ base: "16px", lg: "40px" }}
      alignItems="center"
      justifyContent="center"
    >
      {(isLoading || isIdle) && skeleton}
      {!isLoading && !isIdle && (
        <Flex
          p={6}
          direction="column"
          alignItems={{ base: "center", md: "unset" }}
          backgroundColor={colors.white}
          borderRadius="8px"
          border="1px solid #EDF2F7"
          maxWidth="525px"
        >
          <Image
            src={data?.image || ""}
            maxWidth={{ base: "240px", md: "477px" }}
          />
          <Flex alignItems="center" justifyContent="space-between" mt="16px">
            <MHeading fontSize="18px" mr={{ base: "auto", md: "unset" }}>
              {data?.name}
            </MHeading>
            {isWalletConnected && !!owned && !owned.lockEndDate && (
              <MButton
                alignSelf="flex-end"
                textColor={colors.white}
                rounded="md"
                px={[4, 4]}
                height="32px"
                _hover={{ bg: colors.green800 }}
                _focus={{ boxShadow: "none" }}
                colorScheme={colors.marinadeGreen}
                bg={colors.marinadeGreen}
                mb="12px"
                mt="16px"
                color="white"
                fontWeight="700"
                fontSize="14.4px"
                onClick={() => {
                  onUpgradeModalOpen();
                }}
              >
                {t("appPage.mnde.nft-levels.lock-more")}
              </MButton>
            )}
          </Flex>
          <Flex
            pt={6}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Flex alignItems="center">
              <MText type="text-md" mr={{ base: "auto", md: "unset" }}>
                {t("nftDetailsPage.details-section.mnde-balance.text")}
              </MText>
              <TooltipWithContent
                tooltipText={
                  t(
                    "nftDetailsPage.details-section.mnde-balance.tooltip"
                  )?.replace(
                    "{{value}}",
                    formatNumberLocale(data?.properties.mnde_amount)
                  ) || ""
                }
              >
                <IconButton
                  _focus={{ boxShadow: "none" }}
                  variant="link"
                  aria-label="Info epoch"
                  size="sm"
                  icon={<MdInfoOutline />}
                />
              </TooltipWithContent>
            </Flex>

            {formatNumberLocale(data?.properties.mnde_amount)}
          </Flex>
          <Flex
            pt={1}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Flex alignItems="center" mr={{ base: "auto", md: "unset" }}>
              <MText type="text-md">
                {t("nftDetailsPage.details-section.cooldown-period.text")}
              </MText>
              <TooltipWithContent
                tooltipText={
                  t("nftDetailsPage.details-section.cooldown-period.tooltip") ||
                  ""
                }
              >
                <IconButton
                  _focus={{ boxShadow: "none" }}
                  variant="link"
                  aria-label="Info epoch"
                  size="sm"
                  icon={<MdInfoOutline />}
                />
              </TooltipWithContent>
            </Flex>
            {`${
              unlockPeriod < 1
                ? unlockPeriod.toFixed(4)
                : unlockPeriod.toFixed(0)
            } days`}
          </Flex>
          <Stack spacing={6} mt={6} direction="column" width="100%">
            <MButton
              bg={colors.marinadeGreen}
              _hover={{ bg: colors.green800 }}
              colorScheme={colors.marinadeGreen}
              font="text-lg"
              rounded="md"
              px={4}
              height="40px"
              width="100%"
              onClick={() => {
                downloadPfp(data?.image, data?.properties.files[0].uri);
              }}
            >
              {t("nftDetailsPage.details-section.download")}
              <Image
                ml={2}
                color={colors.marinadeGreen}
                cursor="pointer"
                src="/icons/download-black.svg"
                alt="Download"
                width="16px"
              />
            </MButton>
            <Stack
              spacing={6}
              mt={6}
              direction={{ base: "column", md: "row" }}
              width="100%"
            >
              <MButton
                _hover={{ bg: "gray.100" }}
                width="100%"
                color={colors.marinadeGreen}
                font="text-xl"
                rounded="md"
                height="40px"
                onClick={async () => {
                  if (data?.properties.index && data.properties.tier) {
                    onLoadingIntent();
                    await shareOnTwitter(
                      data?.properties.index,
                      data?.properties.tier,
                      id
                    );
                  }
                }}
              >
                {t("nftDetailsPage.details-section.share-twitter")}
                <Image
                  ml={2}
                  color={colors.marinadeGreen}
                  cursor="pointer"
                  src="/icons/twitter-black.svg"
                  alt="Twitter Logo"
                  width="22px"
                  height="17.87px"
                />
              </MButton>
              {!isWalletConnected || !governance?.nfts.length ? (
                <MButton
                  _hover={{ bg: "gray.100" }}
                  width="100%"
                  color={colors.marinadeGreen}
                  font="text-xl"
                  rounded="md"
                  height="40px"
                  onClick={() => router.push("/app/mnde")}
                >
                  {t("nftDetailsPage.details-section.buy-yours")}
                  <Image
                    ml={2}
                    color={colors.marinadeGreen}
                    cursor="pointer"
                    src="/icons/buy-yours.svg"
                    alt="Twitter Logo"
                    width="14.67px"
                    height="14.26px"
                  />
                </MButton>
              ) : undefined}
            </Stack>
          </Stack>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={6} mt={6}>
            <Flex
              key={`${data?.description}`}
              p={4}
              flexDirection="column"
              backgroundColor="gray.50"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="6px"
            >
              <MText fontSize="11px" fontWeight="bold" color="gray.500">
                {t("nftDetailsPage.details-section.description")}
              </MText>
              <MText fontSize="14px" fontWeight="bold" color={colors.blackMate}>
                {data?.description}
              </MText>
            </Flex>
            {data?.collection ? (
              <>
                <Flex
                  key={`${data?.collection?.family}`}
                  p={4}
                  flexDirection="column"
                  backgroundColor="gray.50"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="6px"
                >
                  <MText fontSize="11px" fontWeight="bold" color="gray.500">
                    {t("nftDetailsPage.details-section.collection-family")}
                  </MText>
                  <MText
                    fontSize="14px"
                    fontWeight="bold"
                    color={colors.blackMate}
                  >
                    {data?.collection?.family}
                  </MText>
                </Flex>
                <Flex
                  key={`${data?.collection?.name}`}
                  p={4}
                  flexDirection="column"
                  backgroundColor="gray.50"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="6px"
                >
                  <MText fontSize="11px" fontWeight="bold" color="gray.500">
                    {t("nftDetailsPage.details-section.collection-name")}
                  </MText>
                  <MText
                    fontSize="14px"
                    fontWeight="bold"
                    color={colors.blackMate}
                  >
                    {data?.collection?.name}
                  </MText>
                </Flex>
              </>
            ) : undefined}
            <Flex
              key={`${data?.symbol}`}
              p={4}
              flexDirection="column"
              backgroundColor="gray.50"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="6px"
            >
              <MText fontSize="11px" fontWeight="bold" color="gray.500">
                {t("nftDetailsPage.details-section.symbol")}
              </MText>
              <MText fontSize="14px" fontWeight="bold" color={colors.blackMate}>
                {data?.symbol}
              </MText>
            </Flex>
            <Flex
              key="Edition"
              p={4}
              flexDirection="column"
              backgroundColor="gray.50"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="6px"
            >
              <MText fontSize="11px" fontWeight="bold" color="gray.500">
                {t("nftDetailsPage.details-section.edition")}
              </MText>
              <MText fontSize="14px" fontWeight="bold" color={colors.blackMate}>
                {data?.properties.edition === 0 ? "Limited" : "Regular"}
              </MText>
            </Flex>
            <Flex
              key={`${data?.properties.tier}`}
              p={4}
              flexDirection="column"
              backgroundColor="gray.50"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="6px"
            >
              <MText fontSize="11px" fontWeight="bold" color="gray.500">
                {t("nftDetailsPage.details-section.level")}
              </MText>
              <MText fontSize="14px" fontWeight="bold" color={colors.blackMate}>
                {data?.properties.tier}
              </MText>
            </Flex>
            {data?.attributes.map((attribute) => (
              <Flex
                key={`${attribute.trait_type}-${attribute.value}`}
                p={4}
                flexDirection="column"
                backgroundColor="gray.50"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="6px"
              >
                <MText fontSize="11px" fontWeight="bold" color="gray.500">
                  {`${attribute.trait_type
                    .charAt(0)
                    .toUpperCase()}${attribute.trait_type.slice(1)}`}
                </MText>
                <MText
                  fontSize="14px"
                  fontWeight="bold"
                  color={colors.blackMate}
                >
                  {attribute.value}
                </MText>
              </Flex>
            ))}
          </Box>
        </Flex>
      )}
      <TwitterDataLoadingModal isOpen={isLoadingIntent} />
      <UpgradeNFTModal
        isOpen={isUpgradeModalOpen}
        onClose={onUpgradeModalClose}
        nftAddress={id as string}
      />
    </Flex>
  );
};

export default NftDetailsSection;
