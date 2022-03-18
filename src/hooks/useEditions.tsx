import { useQuery } from "react-query";

import { fetchEditionsData } from "services/marinade/fetchEditionsData";

import { useEscrow } from "./useEscrow";

const refetchInterval = 1000 * 5;

export const useEditions = () => {
  const sdk = useEscrow();

  return useQuery("editionsInfo", () => fetchEditionsData(sdk), {
    refetchInterval,
  });
};
