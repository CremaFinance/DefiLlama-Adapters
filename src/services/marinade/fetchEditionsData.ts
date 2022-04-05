import type { EscrowRelockerSDK } from "@marinade.finance/escrow-relocker-sdk";
import { SimpleNftKindWrapper } from "@marinade.finance/escrow-relocker-sdk";
import { PublicKey } from "@solana/web3.js";

import { nftLevels } from "services/domain/nftLevels";
import type { ProcessedEditionsInfo } from "services/domain/processedEditionsInfo";

export async function fetchEditionsData(
  sdk: EscrowRelockerSDK
): Promise<ProcessedEditionsInfo[]> {
  return nftLevels.map((nftLevel) => {
    const nftKind = new PublicKey(nftLevel.editions[0].address);
    const nftKindWrapper = new SimpleNftKindWrapper(sdk, nftKind);
    const level = nftLevel;
    nftKindWrapper.data().then((res) => {
      level.editions[0].limit = res.mintLimit.toNumber();
      if (res.escrowCount.ucmp(res.mintLimit)) {
        level.editions[0].current = true;
        level.left = res.mintLimit.sub(res.escrowCount).toNumber();
      } else {
        level.editions[0].current = false;
        level.editions[1].current = true;
        level.left = 0;
      }
    });
    return level;
  });
}
