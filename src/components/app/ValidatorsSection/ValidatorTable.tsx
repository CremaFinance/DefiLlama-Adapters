import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Image,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "next-export-i18n";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MdOutlineContentCopy } from "react-icons/md";
import { useQuery, UseQueryResult } from "react-query";

import MText from "../../atoms/Text";
import { numberToShortVersion } from "utils/number-to-short-version";
import { shortenAddress } from "utils/shorten-address";

interface Query {
  totalPages: number;
  data: Validator[];
}

interface Validator {
  pubkey: {
    address: string;
  };
  lamports: number;
  data: {
    stake: {
      delegation: {
        validatorInfo: {
          name: string;
          image: string;
        };
        voter_pubkey: {
          address: string;
        };
      };
    };
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const epochs = [
  220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234,
  235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
];
const activeStakes = [
  4072763.161070507, 4051075.066551863, 4052054.858973112, 5484387.030233282,
  5684468.243501075, 5708780.209760917, 5741928.247340158, 5867284.539062156,
  5903796.859640622, 5907522.166588127, 5892550.851038137, 5380652.535657598,
  5345727.220581916, 5292535.108541975, 5271852.135467568, 5379139.069056723,
  5386798.789321935, 5388546.43043774, 5401648.792333718, 5437185.096764735,
  5462996.963574909, 5400193.764581964, 5411662.977977125, 5400563.433956664,
  5223744.103347798, 5216777.860529208, 5232571.293974561, 5238363.018035473,
  5241898.45501964, 5320538.49202316,
];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
};

const graphData = {
  labels: epochs,
  datasets: [
    {
      label: "Active Stakes",
      data: activeStakes,
      borderColor: "#308d8a",
      backgroundColor: "#308d8a",
    },
  ],
};

const cell = {
  fontSize: "14.4px",
  borderBottom: "1px solid #edf2f7",
  py: "0px",
  height: { base: "40px", xl: "50px" },
};

const highlightedCell = {
  height: { base: "40px", xl: "50px" },
  fontSize: "14.4px",
  color: "#308d8a",
  fontWeight: "700",
  borderBottom: "1px solid #edf2f7",
  px: "10px",
  py: "0px",
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

const ValidatorTable = () => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState<(string | number)[]>([1, 2, 3, 4, 5]);

  const handlePagination = (key: string | number) => {
    if (key === "<") {
      setPageNumber((p: number) => p - 1);
    } else if (key === ">") {
      setPageNumber((p: number) => p + 1);
    } else {
      const newPageNumber = Number(key);
      setPageNumber(newPageNumber);
    }
  };

  const fetchData = async (): Promise<Query> => {
    const res = await fetch(
      `https://prod-api.solana.surf/v1/account/4bZ6o3eUUNXhKuqjdCnCoPAoLgWiuLYixKaxoa8PpiKk/stakes?limit=10&offset=${
        10 * (pageNumber - 1)
      }`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  };

  const {
    isLoading,
    isPreviousData,
    error,
    data,
  }: UseQueryResult<Query, Error> = useQuery<Query, Error>(
    `${pageNumber}`,
    fetchData,
    {
      keepPreviousData: true,
    }
  );

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
        justifyContent="flex-start"
        mb="40px"
        ml="40px"
      >
        <Spinner />
      </Box>
    );
  }

  function isError(err: unknown): err is Error {
    return err instanceof Error;
  }

  if (error) {
    if (isError(error)) {
      return <Box>{error.message}</Box>;
    }
    return <Box>Unknown error</Box>;
  }

  return (
    <Flex
      mt="20px"
      ml="30px"
      mr="30px"
      direction="column"
      height={{ base: "80vh", xl: "500px" }}
    >
      <Table
        variant="unstyled"
        height={{ base: "65vh", xl: "800px" }}
        maxHeight="570px"
      >
        <Thead>
          <Tr>
            <Th {...cell} textAlign="left" position="relative" right="23px">
              {t("appPage.validators-table-account")}
            </Th>
            <Th {...cell} textAlign="left">
              {t("appPage.validators-table-balance")}
            </Th>
            <Th {...cell} textAlign="left">
              Graph
            </Th>
            <Th {...cell} textAlign="left" position="relative" right="14px">
              {t("appPage.validators-table-validator")}
            </Th>
            <Th {...cell} textAlign="right" position="relative" right="10px">
              {t("appPage.validators-table-state")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data !== undefined &&
            data.data.map((tuple) => (
              <Tr key={tuple.pubkey.address}>
                <Td
                  {...highlightedCell}
                  textAlign="left"
                  position="relative"
                  right="10px"
                  width="100px"
                >
                  <Flex alignItems="center">
                    {shortenAddress(tuple.pubkey.address)}
                    <Box ml="7px">
                      <MdOutlineContentCopy fontSize="14px" color="#171923" />
                    </Box>
                  </Flex>
                </Td>
                <Td {...cell} width="100px">
                  <MText>
                    {numberToShortVersion(tuple.lamports / 1e9)} SOL
                  </MText>
                </Td>
                <Td {...cell} width="100px">
                  <Box width="150px" height="40px">
                    <Line options={options} data={graphData} />
                  </Box>
                </Td>
                <Td {...highlightedCell} width="180px">
                  <Flex alignItems="center" flexWrap="nowrap">
                    {tuple.data.stake.delegation.validatorInfo.image && (
                      <Image
                        src={tuple.data.stake.delegation.validatorInfo.image}
                        alt="?"
                        boxSize="12px"
                      />
                    )}

                    <MText pl="4px">
                      {formatValidatorName(
                        tuple.data.stake.delegation.validatorInfo.name ||
                          tuple.data.stake.delegation.voter_pubkey.address
                      )}
                    </MText>
                  </Flex>
                </Td>
                <Td
                  {...cell}
                  textAlign="right"
                  position="relative"
                  left="10px"
                  width="128px"
                >
                  {t("appPage.validators-table-delegated")}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" alignItems="center">
        {isPreviousData ? <Spinner /> : <h1> </h1>}
        <Flex
          justifyContent="flex-end"
          marginRight="20px"
          height="80px"
          alignItems="center"
        >
          {pages.map((page) => (
            <Box key={page}>
              {page === pageNumber ? (
                <Box {...currentPageStyle}>
                  <MText> {page}</MText>
                </Box>
              ) : (
                <Box onClick={() => handlePagination(page)} {...pageStyle}>
                  <MText>{page}</MText>
                </Box>
              )}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ValidatorTable;
