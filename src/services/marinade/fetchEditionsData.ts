/* eslint-disable no-await-in-loop */
import type { EscrowRelockerSDK } from "@marinade.finance/escrow-relocker-sdk";
import { SimpleNftKindWrapper } from "@marinade.finance/escrow-relocker-sdk";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

import { nftEditions } from "services/domain/nftEditions";
import type { ProcessedEditionsInfo } from "services/domain/processedEditionsInfo";

export async function fetchEditionsData(
  sdk: EscrowRelockerSDK
): Promise<ProcessedEditionsInfo[]> {
  const nftLevels = nftEditions;
  const processedEditionsInfo: ProcessedEditionsInfo[] = [
    { address: "", left: "", limited: true },
    { address: "", left: "", limited: true },
    { address: "", left: "", limited: true },
    { address: "", left: "", limited: true },
    { address: "", left: "", limited: true },
  ];
  if (processedEditionsInfo && nftLevels) {
    for (let i = 0; i < nftLevels.length; i += 1) {
      const nftKind = new PublicKey(nftLevels[i].editions[0].address);
      const nftKindWrapper = new SimpleNftKindWrapper(sdk, nftKind);
      const data = await nftKindWrapper.data();
      if (data.escrowCount.ucmp(new BN(nftLevels[i].editions[0].limit))) {
        processedEditionsInfo[i].address = nftLevels[i].editions[0].address;
        processedEditionsInfo[i].left = new BN(nftLevels[i].editions[0].limit)
          .sub(data.escrowCount)
          .toString();
      } else {
        processedEditionsInfo[i].address = nftLevels[i].editions[1]?.address;
        processedEditionsInfo[i].left = "0";
        processedEditionsInfo[i].limited = false;
      }
    }
  }
  return processedEditionsInfo;
}
