import { useQuery } from "react-query";

import { useConnection } from "../contexts/ConnectionProvider";
import { getEpochInfo } from "../solana/services/epochInfo";

const refetchInterval = 50000;

export const useEpochInfo = () => {
  const connection = useConnection();

  return useQuery("epochInfo", () => getEpochInfo(connection), {
    refetchInterval,
  });
};
