import { useQuery } from "react-query";

import { useConnection } from "../contexts/ConnectionProvider";
import { getEpochInfo } from "../solana/services/epochInfo";

const refetchInterval = 1000 * 60 * 5;

export const useEpochInfo = () => {
  const connection = useConnection();

  return useQuery("epochInfo", () => getEpochInfo(connection), {
    refetchInterval,
  });
};
