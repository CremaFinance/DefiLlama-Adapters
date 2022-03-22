import { useQuery } from "react-query";

import { fetchEditionsData } from "services/marinade/fetchEditionsData";

import { useEscrow } from "./useEscrow";
import { useWallet } from "./useWallet";

const refetchInterval = 1000 * 2;

export const useEditions = () => {
  const sdk = useEscrow();
  const { connected } = useWallet();

  return useQuery(
    "editionsInfo",
    () => {
      return fetchEditionsData(sdk);
    },
    {
      enabled: connected,
      refetchInterval,
    }
  );
};
