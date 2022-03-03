import { Flex, Image, Stack, IconButton } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { MdInfoOutline } from "react-icons/md";

import MButton from "../../atoms/Button";
import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import TooltipWithContent from "components/molecules/TooltipWithContent";
import { useNftDetails } from "hooks/useNftDetails";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

interface NftDetailsSectionProps {
  dataUri: string;
}

const NftDetailsSection: FunctionComponent<NftDetailsSectionProps> = ({
  dataUri,
}) => {
  const { t } = useTranslation();
  const { data } = useNftDetails(dataUri as string);

  return (
    <Flex
      mb="100px"
      mt={20}
      aria-label="nft-details-section"
      flexDirection="column"
      px={{ base: 4, md: 10, lg: 160 }}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        p={6}
        direction="column"
        alignItems={{ base: "center", md: "unset" }}
        backgroundColor={colors.white}
        maxWidth="525px"
      >
        <Image
          src={data?.image || ""}
          maxWidth={{ base: "240px", md: "477px" }}
        />
        <MHeading fontSize="18px" mt="16px" mr={{ base: "auto", md: "unset" }}>
          {data?.name}
        </MHeading>
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
                t("nftDetailsPage.details-section.mnde-balance.tooltip") || ""
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

          {data?.properties.mnde_amount}
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

          {data?.properties.unlock_duration}
        </Flex>
        <Flex flexWrap="wrap" margin="-13px" mt={6}>
          {data?.attributes.map((attribute) => (
            <Flex
              p={4}
              width="140px"
              flexDirection="column"
              backgroundColor="#F7FAFC"
              border="1px solid"
              borderColor={colors.lightGray}
              borderRadius="6px"
              margin="10px"
            >
              <MText
                fontSize="11px"
                fontWeight="bold"
                color={colors.gray?.[500]}
              >
                {attribute.trait_type}
              </MText>
              <MText fontSize="14px">{attribute.value}</MText>
            </Flex>
          ))}
        </Flex>
        <Stack
          spacing={6}
          mt={6}
          direction={{ base: "column", md: "row" }}
          width="100%"
        >
          <MButton
            variant="outline"
            borderColor="gray"
            _hover={{ bg: "gray.100" }}
            color="black"
            font="text-lg"
            rounded="md"
            px={4}
            height="40px"
            width="100%"
            onClick={() => {}}
          >
            {t("nftDetailsPage.details-section.share-twitter")}
            <Image
              ml={2}
              color={colors.marinadeGreen}
              cursor="pointer"
              src="/icons/twitter-black.svg"
              alt="Twitter Logo"
              width={5}
            />
          </MButton>
          <MButton
            variant="outline"
            borderColor="gray"
            _hover={{ bg: "gray.100" }}
            color="black"
            font="text-lg"
            rounded="md"
            px={4}
            height="40px"
            width="100%"
            onClick={() => {}}
          >
            {t("nftDetailsPage.details-section.download")}
            <Image
              ml={2}
              cursor="pointer"
              src="/icons/pointer-down-black.svg"
              alt="Download"
              width={5}
            />
          </MButton>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NftDetailsSection;
