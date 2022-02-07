import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/layout";
import { FC } from "react";

import Header from "components/index/Header";
import Footer from "components/layout/Footer";
import { useTranslation } from "hooks/useTranslation";
import colors from "styles/customTheme/colors";

const Terms: FC = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Box position="relative" overflow="hidden" bg={colors.greenLight}>
      <Box position="relative">
        <Header />
        <Box
          py="200px"
          pb={[12, 8]}
          px={{ base: 4, md: "40px", lg: 168 }}
          position="relative"
        >
          <Heading mb={8}>{t("termsPage.page-header")}</Heading>
          <OrderedList spacing={6}>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.0.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.0.text.0")} (“
              <strong>{t("termsPage.list-items.0.text.1")}”</strong>, “
              <strong>Marinade Finance</strong>”, “
              <strong>{t("termsPage.list-items.0.text.2")}</strong>”, “
              <strong>{t("termsPage.list-items.0.text.3")}</strong>”){" "}
              {t("termsPage.list-items.0.text.4")} (“
              <strong>{t("termsPage.list-items.0.text.5")}</strong>”{" "}
              {t("termsPage.list-items.0.text.6")} “
              <strong>{t("termsPage.list-items.0.text.7")}</strong>
              ”) {t("termsPage.list-items.0.text.8")} https://marinade.finance/
              (“<strong>{t("termsPage.list-items.0.text.9")}</strong>”).{" "}
              {t("termsPage.list-items.0.text.10")} (“
              <strong>{t("termsPage.list-items.0.text.11")}</strong>
              ”) {t("termsPage.list-items.0.text.12")} <br />
              <br />
              {t("termsPage.list-items.0.text.13")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.1.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.1.text.0")}
              <br /> (a) {t("termsPage.list-items.1.text.1")}
              <br /> (b) {t("termsPage.list-items.1.text.2")}
              <br /> (c) {t("termsPage.list-items.1.text.3")} (“
              <strong>CTF</strong>”);
              <br /> (d) {t("termsPage.list-items.1.text.4")}
              <br /> (e) {t("termsPage.list-items.1.text.5")}
              <br /> (f) {t("termsPage.list-items.1.text.6")}
            </Text>

            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.2.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.2.text.0")}
              <br />
              <br />
              {t("termsPage.list-items.2.text.1")}
              <br />
              <br />
              {t("termsPage.list-items.2.text.2")}
              <br />
              <br />
              {t("termsPage.list-items.2.text.3")}
              <br />
              <br />
              {t("termsPage.list-items.2.text.4")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.3.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.3.text.0")}
              <br />
              (a) {t("termsPage.list-items.3.text.1")}
              <br />
              (b) {t("termsPage.list-items.3.text.2")}
              <br />
              (c) {t("termsPage.list-items.3.text.3")}
              <br />
              (d) {t("termsPage.list-items.3.text.4")}
              <br />
              (f) {t("termsPage.list-items.3.text.5")}
              <br />
              (g) {t("termsPage.list-items.3.text.6")}
              <br />
              (h) {t("termsPage.list-items.3.text.7")}
              <br />
              (i) {t("termsPage.list-items.3.text.8")}
              <br />
              (j) {t("termsPage.list-items.3.text.9")}
              <br />
              (k) {t("termsPage.list-items.3.text.10")}
              <br /> (l) {t("termsPage.list-items.3.text.11")}
              <br />
              (m) {t("termsPage.list-items.3.text.12")}
              <br /> (n) {t("termsPage.list-items.3.text.13")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.4.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.4.text.0")}
              <br /> <br /> {t("termsPage.list-items.4.text.1")}
              <br /> <br /> {t("termsPage.list-items.4.text.2")}
              <br /> <br /> {t("termsPage.list-items.4.text.3")}
              <br /> <br /> {t("termsPage.list-items.4.text.4")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.5.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.5.text.0")}</Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.6.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.6.text.0")}
              <br /> <br />
              {t("termsPage.list-items.6.text.1")}
              <br /> <br />
              {t("termsPage.list-items.6.text.4")}
              <br /> (a) {t("termsPage.list-items.6.text.5")}
              <br />
              (b) {t("termsPage.list-items.6.text.6")}
              <br /> (c) {t("termsPage.list-items.6.text.7")}
              <br /> (d) {t("termsPage.list-items.6.text.8")}
              <br /> (e) {t("termsPage.list-items.6.text.9")}
              <br /> (f) {t("termsPage.list-items.6.text.10")}
              <br /> <br />
              {t("termsPage.list-items.6.text.11")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.7.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.7.text.0")}
              <br /> <br />
              {t("termsPage.list-items.7.text.1")}
              <br /> <br />
              {t("termsPage.list-items.7.text.2")}
              <br /> <br />
              {t("termsPage.list-items.7.text.3")}
              <br /> <br />
              {t("termsPage.list-items.7.text.4")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.8.header")}
            </ListItem>
            <Text> {t("termsPage.list-items.8.text.0")} </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.9.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.9.text.0")}
              <br />
              (a) {t("termsPage.list-items.9.text.1")}
              <br />
              (b) {t("termsPage.list-items.9.text.2")}
              <br />
              (c) {t("termsPage.list-items.9.text.3")}
              <br />
              <br />
              {t("termsPage.list-items.9.text.4")}
              <br />
              <br />
              {t("termsPage.list-items.9.text.5")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.10.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.10.text.0")}</Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.11.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.11.text.0")}</Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.12.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.12.text.0")}</Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.13.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.13.text.0")}
              <br />
              <br />
              {t("termsPage.list-items.13.text.1")}
              <br />
              <br />
              {t("termsPage.list-items.13.text.2")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.14.header")}
            </ListItem>
            <Text>
              {t("termsPage.list-items.14.text.0")}
              <br />
              <br />
              {t("termsPage.list-items.14.text.1")}
            </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.15.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.15.text.0")}</Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.16.header")}
            </ListItem>
            <Text> {t("termsPage.list-items.16.text.0")} </Text>
            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.17.header")}
            </ListItem>
            <Text>{t("termsPage.list-items.17.text.0")}</Text>

            <ListItem
              listStylePosition="inside"
              fontSize="2xl"
              fontWeight="bold"
            >
              {t("termsPage.list-items.18.header")}
            </ListItem>
            <Text mb={6}>{t("termsPage.list-items.18.text.0")} </Text>
            <Text fontWeight="bold">
              {t("termsPage.list-items.18.text.1")}{" "}
            </Text>
          </OrderedList>
        </Box>
        <Box mt="200px">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Terms;
