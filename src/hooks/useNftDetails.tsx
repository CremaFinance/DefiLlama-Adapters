import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import type { ParsedAccountData } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
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
        const account = await sdk.provider.connection.getTokenLargestAccounts(
          new PublicKey(mint),
          "confirmed"
        );

        const accInfo = await sdk.provider.connection.getParsedAccountInfo(
          account.value[0].address,
          "confirmed"
        );

        if (!accInfo) {
          throw new Error();
        }

        const accountData = accInfo?.value?.data as ParsedAccountData;
        const accounts = await getParsedNftAccountsByOwner({
          publicAddress: accountData.parsed.info.owner,
          connection: sdk.provider.connection,
          limit: 200000,
        });
        return accounts.find((acc) => acc.mint === mint);
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
