import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import lamportsToSol from "utils/lamportsToSol";

const DEFAULT_IMAGE =
  "https://s3.amazonaws.com/keybase_processed_uploads/9fcd0386b266f3e4ed3a1dcbb509d305_360_360.jpg";

const cell = {
  height: "40px",
  fontSize: "14.4px",
  borderBottom: "1px solid #edf2f7",
};

const highlightedCell = {
  height: "40px",
  fontSize: "14.4px",
  color: "#308d8a",
  fontWeight: "700",
  borderBottom: "1px solid #edf2f7",
  px: "10px",
};

const MAX_LEN = 18;

const formatValidatorName = (name: string): string => {
  const cutoff: number = Math.min(MAX_LEN, name.length);
  const shortenedName: string = name.substr(0, cutoff);
  const nameChars: string[] = shortenedName.split("");

  if (name.length > MAX_LEN) {
    for (let i = 0; i < 3; i += 1) {
      nameChars.push(".");
    }
  }

  return nameChars.join("");
};

const ValidatorTable = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const fetchData = async () => {
    const res = await axios.get(
      `https://prod-api.solana.surf/v1/account/4bZ6o3eUUNXhKuqjdCnCoPAoLgWiuLYixKaxoa8PpiKk/stakes?limit=10&offset=${
        10 * pageNumber
      }`
    );

    return res.data;
  };

  const { isLoading, error, data } = useQuery(`${pageNumber}`, fetchData);

  if (isLoading) return <h1>Loading</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <Flex mt="40px" direction="column">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th {...cell} textAlign="left">
              Account
            </Th>
            <Th {...cell} textAlign="left">
              Balance
            </Th>
            <Th {...cell} textAlign="left">
              Validator
            </Th>
            <Th {...cell} textAlign="right" position="relative" right="60px">
              State
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((tuple) => (
            <Tr key={tuple.pubkey.address}>
              <Td {...highlightedCell}>{tuple.pubkey.address}</Td>
              <Td {...cell}>{lamportsToSol(tuple.lamports)}</Td>
              <Td {...highlightedCell}>
                <Flex alignItems="center">
                  <Image
                    src={
                      tuple.data.stake.delegation.validatorInfo.image ||
                      DEFAULT_IMAGE
                    }
                    alt="?"
                    width={12}
                    height={12}
                  />
                  <Text pl="4px">
                    {formatValidatorName(
                      tuple.data.stake.delegation.validatorInfo.name ||
                        tuple.data.stake.delegation.voter_pubkey.address
                    )}
                  </Text>
                </Flex>
              </Td>
              <Td {...cell}>DELEGATED</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={() => setPageNumber((x) => x + 1)}>Up</Button>
      <Button onClick={() => setPageNumber((x) => x - 1)}>Down</Button>
      {pageNumber}
    </Flex>
  );
};

export default ValidatorTable;
