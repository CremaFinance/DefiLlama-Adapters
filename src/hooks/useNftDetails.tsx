import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import type { NftData } from "services/marinade/nftDetails";
import { fetchNftData } from "services/marinade/nftDetails";

export const useNftDetails = (id: string) => {
  return useQuery(["datauri", id as string], fetchNftData) as UseQueryResult<
    NftData,
    Error
  >;
};
