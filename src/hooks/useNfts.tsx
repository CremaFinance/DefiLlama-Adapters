import type { EscrowRelockerSDK } from "@marinade-finance/escrow-relocker-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import type { NFTType } from "services/domain/nftType";
import { fetchNFTs } from "services/marinade/fetchNfts";

import { useEscrow } from "./useEscrow";

const useNfts = () => {
  const { connected } = useWallet();

  const sdk = useEscrow();
  return useQuery(
    ["nfts"],
    () => {
      return fetchNFTs(sdk as EscrowRelockerSDK);
    },
    { enabled: connected }
  ) as UseQueryResult<{ parsedNfts: NFTType[]; lockedMnde: number }, Error>;
};

export default useNfts;
