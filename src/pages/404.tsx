import { Flex, Image } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/dist/client/router";

import MButton from "components/atoms/Button";
import MotionBox from "components/atoms/MotionBox";
import MText from "components/atoms/Text";
import Header from "components/index/Header";
import Footer from "components/layout/Footer";
import colors from "styles/customTheme/colors";

const Page404 = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Flex direction="column" bg={colors.greenLight} height="100vh">
      <Header />
      <Flex
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
      >
        <MotionBox
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width="100vw"
          display="flex"
          mt={["5vh", "10vh"]}
          pt={{ base: "120px", md: "40px", "2xl": "unset" }}
          justifyContent="center"
        >
          <Image
            width={["95%", "60%", "50%"]}
            src="/404.svg"
            alt="Error 404 not found Illustration"
          />
        </MotionBox>
        <MText type="text-xl" color={colors.black} pt="48px" my="32px">
          {t("404Page.page-not-cooked")}
        </MText>
        <MButton
          bg={colors.marinadeGreen}
          _hover={{ bg: colors.green800 }}
          colorScheme={colors.marinadeGreen}
          rounded="md"
          width="200px"
          height="48px"
          font="text-xl"
          mb={["40px", "80px"]}
          onClick={() => router.push("/")}
        >
          {t("404Page.go-to-homepage")}
        </MButton>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Page404;
