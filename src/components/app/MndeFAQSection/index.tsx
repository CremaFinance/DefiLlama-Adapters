import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const MndeFAQSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      mt="44px"
      aria-label="faq-section"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex width={["288px", "480px"]} flexDirection="column">
        <MHeading type="heading-sm" mt={8} mb={[5, 6]} textAlign="center">
          {t("appPage.mnde.faq-title")}
        </MHeading>
        <Accordion mt={[0, 1]} allowToggle>
          <AccordionItem key="faq-item-0" bg={colors.white} rounded="xl" mb={4}>
            <AccordionButton pl={[4, 8]} py={[2, 5]} pr={[4, 6]} _focus={{}}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t(`appPage.mnde.faq-items.0.question`)}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel position="relative" pl={[4, 8]} pr={[4, 6]}>
              <MText type="text-md" lineHeight="170%">
                {t(`appPage.mnde.faq-items.0.response`)}
              </MText>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key="faq-item-1" bg={colors.white} rounded="xl" mb={4}>
            <AccordionButton pl={[4, 8]} py={[2, 5]} pr={[4, 6]} _focus={{}}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t(`appPage.mnde.faq-items.1.question`)}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel
              position="relative"
              bottom="10px"
              pb={4}
              pl={[4, 8]}
              pr={[4, 6]}
            >
              <MText type="text-md" lineHeight="170%">
                {t(`appPage.mnde.faq-items.1.response`)}
              </MText>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key="faq-item-2" bg={colors.white} rounded="xl" mb={4}>
            <AccordionButton pl={[4, 8]} py={[2, 5]} pr={[4, 6]} _focus={{}}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t(`appPage.mnde.faq-items.2.question`)}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel
              position="relative"
              bottom="10px"
              pb={4}
              pl={[4, 8]}
              pr={[4, 6]}
            >
              <MText type="text-md" lineHeight="170%">
                {t(`appPage.mnde.faq-items.2.response`)}
              </MText>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem key="faq-item-3" bg={colors.white} rounded="xl" mb={4}>
            <AccordionButton pl={[4, 8]} py={[2, 5]} pr={[4, 6]} _focus={{}}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t(`appPage.mnde.faq-items.3.question`)}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel
              position="relative"
              bottom="10px"
              pb={4}
              pl={[4, 8]}
              pr={[4, 6]}
            >
              <MText type="text-md" lineHeight="170%">
                {t(`appPage.mnde.faq-items.3.response`)}
              </MText>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default MndeFAQSection;
