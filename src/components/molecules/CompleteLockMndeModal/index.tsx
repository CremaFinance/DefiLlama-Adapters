import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MLink from "../../atoms/Link";
import MText from "../../atoms/Text";
import TwitterDataLoadingModal from "components/app/TwittedDataLoadingModal";
import useGovernance from "hooks/useGovernanceData";
import useShareOnTwitter from "hooks/useShareOnTwitter";
import type { NFTType } from "services/domain/nftType";
import { downloadPfp } from "services/marinade/downloadPfp";
import colors from "styles/customTheme/colors";

interface CompleteLockMndeModalProps {
  isOpen: boolean;
  txConfirmed: boolean;
  onClose: () => void;
}

const CompleteLockMndeModal: FunctionComponent<CompleteLockMndeModalProps> = ({
  isOpen,
  onClose,
  txConfirmed,
}) => {
  const { t } = useTranslation();
  const modalSize = useBreakpointValue({ base: "full", md: "md" });
  const [nft, setNft] = useState<NFTType | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const { data: governance, isFetching, isLoading } = useGovernance();
  const { isLoadingIntent, onLoadingIntent, shareOnTwitter } =
    useShareOnTwitter();

  useEffect(() => {
    if (!isFetching && !isLoading && governance?.nfts.length)
      setNft(governance?.nfts[0]);
  }, [setNft, isFetching, governance, isLoading]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent p={6}>
        <ModalCloseButton _focus={{ outline: "none" }} />
        <ModalBody display="flex" p={0}>
          <Flex
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            mt={6}
          >
            <Skeleton
              width={{ base: "300px", md: "382px" }}
              height={{ base: "300px", md: "382px" }}
              isLoaded={
                !isFetching && !isLoading && txConfirmed && thumbnailLoaded
              }
            >
              <Image
                src={nft?.thumbnailURL}
                alt="Fish"
                onLoad={() => {
                  setThumbnailLoaded(txConfirmed);
                }}
                maxWidth={{ base: "300px", md: "382px" }}
              />
            </Skeleton>
            <MHeading type="heading-2xsm" pt={6}>
              {!isFetching && !isLoading && txConfirmed
                ? t("mndePage.lock-mnde-complete-modal.header")
                : t("mndePage.lock-mnde-complete-modal.pending-header")}
            </MHeading>
            <MText mt={4} textAlign="center">
              {!isFetching && !isLoading && txConfirmed
                ? t("mndePage.lock-mnde-complete-modal.body.0.text")
                : t("mndePage.lock-mnde-complete-modal.pending-body")}
            </MText>
            <MText mt={8} textAlign="center">
              {!isFetching &&
                !isLoading &&
                txConfirmed &&
                t("mndePage.lock-mnde-complete-modal.body.1.text")}
            </MText>
            <Skeleton
              width="90%"
              isLoaded={!isFetching && !isLoading && txConfirmed}
              my={5}
            >
              <MButton
                font="text-lg"
                bg={colors.marinadeGreen}
                _hover={{ bg: colors.green800 }}
                colorScheme={colors.marinadeGreen}
                rounded="md"
                px={4}
                height="40px"
                width="100%"
                onClick={async () => {
                  if (nft?.dataUri) {
                    onLoadingIntent();
                    const res = await fetch(nft?.dataUri);
                    const metadata = await res.json();

                    await shareOnTwitter(
                      metadata.properties.index,
                      metadata.properties.tier,
                      nft.address.toString()
                    );
                  }
                }}
              >
                {t("mndePage.lock-mnde-complete-modal.links.twitter")}
                <Image
                  ml={2}
                  cursor="pointer"
                  src="/twitter.svg"
                  alt="Twitter Logo"
                  width={5}
                />
              </MButton>
            </Skeleton>
            <Flex justifyContent="space-between" w="100%">
              <Skeleton isLoaded={!isFetching && !isLoading && txConfirmed}>
                <MLink
                  target="_blank"
                  rel="noreferrer"
                  width="165px"
                  height="40px"
                  font="text-lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ textDecoration: "underline" }}
                  _focus={{ boxShadow: "none" }}
                  colorScheme={colors.marinadeGreen}
                  color={colors.marinadeGreen}
                  rounded="md"
                  flex={1}
                  onClick={() => {
                    window.open("https://tribeca.so/gov/mnde", "_blank");
                  }}
                >
                  {t("mndePage.lock-mnde-complete-modal.button")}
                  <Image
                    src="/icons/external-link-green.svg"
                    ml={2}
                    color="white"
                    cursor="pointer"
                    width={4}
                  />
                </MLink>
              </Skeleton>
              <Skeleton isLoaded={!isFetching && !isLoading && txConfirmed}>
                <MLink
                  target="_blank"
                  rel="noreferrer"
                  width="165px"
                  height="40px"
                  font="text-lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ textDecoration: "underline" }}
                  _focus={{ boxShadow: "none" }}
                  colorScheme={colors.marinadeGreen}
                  color={colors.marinadeGreen}
                  rounded="md"
                  flex={1}
                  onClick={() => {
                    downloadPfp(nft?.thumbnailURL, nft?.id);
                  }}
                >
                  {t("mndePage.lock-mnde-complete-modal.links.download")}

                  <Image
                    ml={2}
                    color={colors.marinadeGreen}
                    cursor="pointer"
                    src="/icons/download.svg"
                    alt="Twitter Logo"
                    width={5}
                  />
                </MLink>
              </Skeleton>
            </Flex>
            <TwitterDataLoadingModal isOpen={isLoadingIntent} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CompleteLockMndeModal;
