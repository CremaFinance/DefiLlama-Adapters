import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

import MHeading from "../../atoms/Heading";
import MText from "../../atoms/Text";
import colors from "styles/customTheme/colors";

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      aria-label="faq-section"
      px={{ base: 4, md: 0 }}
      pb={16}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src="/ilustrations/how-it-works1.svg"
        width="428px"
        height="257px"
        mb={4}
        ml={-8}
      />
      <Flex width="480px" flexDirection="column">
        <MHeading type="heading-sm" mt={8} mb={6}>
          {t("appPage.faq-title")}
        </MHeading>
        <Accordion mt={1}>
          <AccordionItem bg={colors.white} rounded="md" mb={4}>
            <AccordionButton pl={8} py={6} pr={6}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t("appPage.faq-first-q")}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel pb={4} pl={8} pr={6}>
              <MText type="text-md" lineHeight="170%">
                {t("appPage.faq-first-response")}
              </MText>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem bg={colors.white} rounded="md" mb={4}>
            <AccordionButton pl={8} py={6} pr={6}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t("appPage.faq-second-q")}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel pb={8} pl={8} pr={6}>
              <MText type="text-md" lineHeight="170%">
                {t("appPage.faq-second-response")}
              </MText>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem bg={colors.white} rounded="md" mb={4}>
            <AccordionButton pl={8} py={6} pr={6}>
              <MText flex="1" type="text-xl" fontWeight="bold" textAlign="left">
                {t("appPage.faq-third-q")}
              </MText>
              <AccordionIcon fontSize="2em" />
            </AccordionButton>
            <AccordionPanel pb={4} pl={8} pr={6}>
              <MText type="text-md" lineHeight="170%">
                {t("appPage.faq-third-response")}
              </MText>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default FAQSection;
