import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import type { NftData } from "services/domain/nftData";
import { fetchNftData } from "services/marinade/nftDetails";
import { DEFAULT_ENDPOINT } from "utils/web3/endpoints";

export const useNftDetails = (mintAddress: string) => {
  return useQuery(
    ["nftUri", `${DEFAULT_ENDPOINT.nftEndpoint}metadata/${mintAddress}`],
    fetchNftData,
    {
      enabled: true,
      retry: false,
    }
  ) as UseQueryResult<NftData, Error>;
};
