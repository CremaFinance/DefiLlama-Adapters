import {
  getParsedAccountByMint,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import type { NftData } from "services/domain/nftData";
import { fetchNftData } from "services/marinade/nftDetails";

import { useEscrow } from "./useEscrow";

export const useNftDetails = (mintAddress: string) => {
  const sdk = useEscrow();
  const { data, isError } = useQuery(
    ["mintAddress", mintAddress],
    async ({ queryKey }: { queryKey: string[] }) => {
      try {
        const [, mint] = queryKey;
        const acc = await getParsedAccountByMint({
          mintAddress: mint,
          connection: sdk.provider.connection,
        });
        if (!acc) {
          throw new Error();
        }
        const accounts = await getParsedNftAccountsByOwner({
          publicAddress: acc.account.data.parsed.info.owner,
          connection: sdk.provider.connection,
        });
        return accounts.find((account) => account.mint === mint);
      } catch (err) {
        throw new Error();
      }
    },
    { retry: false }
  ) as UseQueryResult<{ data: { uri: string } }, Error>;
  return useQuery(["nftUri", data?.data.uri as string], fetchNftData, {
    enabled: !!data?.data.uri || isError,
    retry: false,
  }) as UseQueryResult<NftData, Error>;
};
