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
  // Image,
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
import colors from "styles/customTheme/colors";
import { numberToShortVersion } from "utils/number-to-short-version";
import { shortenAddress } from "utils/shorten-address";

interface Query {
  totalPages: number;
  validators: Validator[];
}

interface Validator {
  validator_vote_address: string;
  validator_description: string;
  most_recent_apy: number;
  epoch_stats: Stat[];
}

interface Stat {
  epoch: number;
  score: number;
  rank: number;
  vote_address: string;
  commission: number;
  data_center_concentration: number;
  apy: number;
  delinquent: string;
  pct: number;
  marinade_staked: number;
  should_have: number;
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

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
    },
  },
  tension: 0.3,
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

const genEpochs = (validator: Validator) => {
  return validator.epoch_stats.map((tuple) => tuple.epoch);
};

const genPctValues = (validator: Validator) => {
  return validator.epoch_stats.map((tuple) => tuple.pct);
};

const genGraph = (_epochs: number[], _pctValues: number[]) => {
  return {
    labels: _epochs,
    datasets: [
      {
        label: "Historical Marinade % SOL allocation",
        data: _pctValues,
        borderColor: colors.marinadeGreen,
        backgroundColor: colors.marinadeGreen,
      },
    ],
  };
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
  color: colors.marinadeGreen,
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
  color: colors.marinadeGreen,
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
      `https://marinade-dashboard-api.herokuapp.com/validators/?page=${pageNumber}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    // eslint-disable-next-line no-restricted-syntax
    for (const validator of data.validators) {
      validator.epoch_stats.reverse();
    }

    return data;
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
    <Flex ml="auto" mr="auto" direction="column" width="95%" maxWidth="1360px">
      <Table variant="unstyled" maxHeight="570px">
        <Thead>
          <Tr>
            <Th {...cell} textAlign="left" position="relative" right="23px">
              {t("appPage.validators-table-account")}
            </Th>
            <Th {...cell} textAlign="left" position="relative" right="14px">
              {t("appPage.validators-table-validator")}
            </Th>

            <Th {...cell} textAlign="left">
              {t("appPage.validators-table-staked")}
            </Th>
            <Th {...cell} textAlign="left">
              {t("appPage.validators-table-graph")}
            </Th>
            <Th {...cell} textAlign="right" position="relative" left="10px">
              {t("appPage.validators-table-apy")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data !== undefined &&
            data.validators.map((tuple) => (
              <Tr key={tuple.validator_vote_address}>
                <Td
                  {...highlightedCell}
                  textAlign="left"
                  position="relative"
                  right="10px"
                  width="200px"
                >
                  <Flex alignItems="center">
                    {shortenAddress(tuple.validator_vote_address)}
                    <Box ml="7px">
                      <MdOutlineContentCopy fontSize="14px" color="#171923" />
                    </Box>
                  </Flex>
                </Td>
                <Td {...highlightedCell} width="200px">
                  <Flex alignItems="center" flexWrap="nowrap">
                    <MText pl="4px">
                      {formatValidatorName(
                        tuple.validator_description ||
                          tuple.validator_vote_address
                      )}
                    </MText>
                  </Flex>
                </Td>

                <Td {...cell} width="200px">
                  <MText>
                    {numberToShortVersion(
                      tuple.epoch_stats[tuple.epoch_stats.length - 1]
                        .marinade_staked
                    )}{" "}
                    SOL
                  </MText>
                </Td>
                <Td {...cell} width="200px">
                  <Box width="178px" height="30px">
                    <Line
                      options={options}
                      data={genGraph(genEpochs(tuple), genPctValues(tuple))}
                    />
                  </Box>
                </Td>
                <Td
                  {...cell}
                  textAlign="right"
                  position="relative"
                  left="10px"
                  width="128px"
                >
                  {numberToShortVersion(tuple.most_recent_apy)}%
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
