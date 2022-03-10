import type { EscrowRelockerSDK } from "@marinade-finance/escrow-relocker-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import type { NFTType } from "services/domain/nftType";
import { fetchGovernanceData } from "services/marinade/fetchGovernanceData";

import { useEscrow } from "./useEscrow";

const useGovernance = () => {
  const { connected } = useWallet();

  const sdk = useEscrow();
  return useQuery(
    ["nfts"],
    () => {
      return fetchGovernanceData(sdk as EscrowRelockerSDK);
    },
    { enabled: connected, refetchOnWindowFocus: false }
  ) as UseQueryResult<{ nfts: NFTType[]; lockedMnde: number }, Error>;
};

export default useGovernance;
