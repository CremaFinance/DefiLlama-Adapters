import { EscrowRelockerSDK } from "@marinade-finance/escrow-relocker-sdk";
import { SolanaProvider } from "@saberhq/solana-contrib";

import { useAnchorProvider } from "contexts/AnchorContext";

export const useEscrow = () => {
  const anchorProvider = useAnchorProvider();
  const prov = SolanaProvider.init({
    connection: anchorProvider.connection,
    wallet: anchorProvider.wallet,
  });
  return new EscrowRelockerSDK(prov);
};
