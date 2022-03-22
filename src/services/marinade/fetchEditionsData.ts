import type { EscrowRelockerSDK } from "@marinade.finance/escrow-relocker-sdk";
import { SimpleNftKindWrapper } from "@marinade.finance/escrow-relocker-sdk";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

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
      if (res.escrowCount.ucmp(new BN(nftLevel.editions[0].limit))) {
        level.editions[0].current = true;
        level.left = new BN(nftLevel.editions[0].limit)
          .sub(res.escrowCount)
          .toNumber();
      } else {
        level.editions[0].current = false;
        level.editions[1].current = true;
        level.left = 0;
      }
    });
    return level;
  });
}
