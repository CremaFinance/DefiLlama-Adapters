import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useQuery } from "react-query";

import lamportsToSol from "utils/lamportsToSol";

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
  _hover: {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const currentPageStyle = {
  width: "50px",
  fontSize: "18px",
  display: "grid",
  placeItems: "center",
  mt: "5px",
  pb: "5px",
  fontWeight: "700",
  color: "#308d8a",
  cursor: "pointer",
  borderBottom: "2px solid #308d8a",
};

const pageStyle = {
  width: "50px",
  fontSize: "18px",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
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

const DEFAULT_IMAGE =
  "https://s3.amazonaws.com/keybase_processed_uploads/9fcd0386b266f3e4ed3a1dcbb509d305_360_360.jpg";

const ValidatorTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);

  const handlePagination = (key: string | number) => {
    if (key === "<") {
      setPageNumber((p) => p - 1);
    } else if (key === ">") {
      setPageNumber((p) => p + 1);
    } else {
      const newPageNumber = Number(key);
      setPageNumber(newPageNumber);
    }
  };

  const fetchData = async () => {
    const res = await fetch(
      `https://prod-api.solana.surf/v1/account/4bZ6o3eUUNXhKuqjdCnCoPAoLgWiuLYixKaxoa8PpiKk/stakes?limit=10&offset=${
        10 * (pageNumber - 1)
      }`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    return res.json();
  };

  const { isLoading, error, data } = useQuery(`${pageNumber}`, fetchData);

  useEffect(() => {
    if (data !== undefined) {
      const available = [];
      const { totalPages } = data;

      if (pageNumber !== 1) {
        available.push("<");
      }
      available.push(1);

      for (
        let i = Math.max(2, pageNumber - 2);
        i <= Math.min(totalPages - 1, pageNumber + 2);
        i += 1
      ) {
        available.push(i);
      }

      if (pageNumber !== totalPages) {
        available.push(">");
      }
      available.push(totalPages);

      setPages(available);
    }
  }, [pageNumber, data]);

  if (isLoading && data === undefined) {
    return (
      <Box
        height="710px"
        width="100%"
        display="flex"
        flexDirection="column-reverse"
        justifyContent="space-between"
      >
        <Flex
          flexDirection="row"
          justifyContent="flex-end"
          marginRight="50px"
          height="100px"
          alignItems="center"
        >
          {pages.map((page) => (
            <Box key={page}>
              {page === pageNumber ? (
                <Box {...currentPageStyle}>{page}</Box>
              ) : (
                <Box onClick={() => handlePagination(page)} {...pageStyle}>
                  {page}
                </Box>
              )}
            </Box>
          ))}
        </Flex>
      </Box>
    );
  }
  if (error) return <h1>{error.message}</h1>;

  return (
    <Flex mt="40px" ml="30px" mr="30px" direction="column">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th {...cell} textAlign="left" position="relative" right="23px">
              Account
            </Th>
            <Th {...cell} textAlign="left">
              Balance
            </Th>
            <Th {...cell} textAlign="left" position="relative" right="14px">
              Validator
            </Th>
            <Th {...cell} textAlign="right" position="relative" right="10px">
              State
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((tuple) => (
            <Tr key={tuple.pubkey.address}>
              <Td {...highlightedCell} position="relative" right="10px">
                <Flex alignItems="center">
                  {tuple.pubkey.address}{" "}
                  <Box ml="7px">
                    <MdOutlineContentCopy fontSize="14px" color="#171923" />
                  </Box>
                </Flex>
              </Td>
              <Td {...cell}>{lamportsToSol(tuple.lamports)} SOL</Td>
              <Td {...highlightedCell}>
                <Flex alignItems="center">
                  {tuple.data.stake.delegation.validatorInfo.image !==
                    undefined && (
                    <Image
                      src={
                        tuple.data.stake.delegation.validatorInfo.image ||
                        DEFAULT_IMAGE
                      }
                      alt="?"
                      width={12}
                      height={12}
                    />
                  )}

                  <Text pl="4px">
                    {formatValidatorName(
                      tuple.data.stake.delegation.validatorInfo.name ||
                        tuple.data.stake.delegation.voter_pubkey.address
                    )}
                  </Text>
                </Flex>
              </Td>
              <Td position="relative" left="30px" {...cell}>
                DELEGATED
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex
        justifyContent="flex-end"
        marginRight="20px"
        height="100px"
        alignItems="center"
      >
        {pages.map((page) => (
          <Box key={page}>
            {page === pageNumber ? (
              <Box {...currentPageStyle}>{page}</Box>
            ) : (
              <Box onClick={() => handlePagination(page)} {...pageStyle}>
                {page}
              </Box>
            )}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ValidatorTable;
