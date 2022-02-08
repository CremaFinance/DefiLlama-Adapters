import { Flex } from "@chakra-ui/layout";
import { Image, Text, Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import colors from "styles/customTheme/colors";

const WhySection: FunctionComponent = () => {
  return (
    <Flex
      aria-label="why-section"
      direction="column"
      px={{ base: 4, md: "12vw" }}
      py={20}
      bg={colors.blackMate}
    >
      <Text
        color={colors.white800}
        textAlign="center"
        fontWeight="bold"
        fontSize={["30px", "43.95px"]}
        pb={10}
      >
        $MNDE token gives you a say on
      </Text>
      <Flex
        flexDirection={["column", "column", "row"]}
        flex={1}
        justifyContent="space-between"
      >
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/treasury.svg"
            width={["60px", "100px"]}
            alt="Treasury"
          />
          <Text
            color={colors.white800}
            textAlign="center"
            fontWeight="bold"
            fontSize={["20px", "28px"]}
            py={6}
          >
            $250M Treasury
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              The Marinade DAO treasury holds a 30% allocation of MNDE, as well
              as receiving ongoing fees from staked SOL.
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/sol-delegation.svg"
            width={["60px", "100px"]}
            alt="Treasury"
          />
          <Text
            color={colors.white800}
            textAlign="center"
            fontWeight="bold"
            fontSize={["20px", "28px"]}
            py={6}
          >
            Vote with your NFT
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              The security and decentralization of Solana is positively
              influenced by the Marinade staking algorithm, which stakes and
              balances the Marinade pool. You govern that algorithm.
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Image
            src="/ilustrations/exec-team.svg"
            width={["60px", "100px"]}
            alt="Treasury"
          />
          <Text
            color={colors.white800}
            textAlign="center"
            fontWeight="bold"
            fontSize={["20px", "28px"]}
            py={6}
          >
            Executive Team
          </Text>
          <Box maxWidth="278px">
            <Text
              color={colors.white800}
              textAlign="center"
              fontSize="18px"
              py={{ sm: 4 }}
            >
              The security and decentralization of Solana is positively
              influenced by the Marinade staking algorithm, which stakes and
              balances the Marinade pool. You govern that algorithm.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WhySection;
