import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" px={ 5 } py= { 3 } color="white" bg="#242731">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link href="/">
          marinade.finance
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
