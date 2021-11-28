import { Connection } from "@solana/web3.js";

import { ProcessedEpochInfo } from "../domain/processedEpochInfo";

export async function getEpochInfo(
  connection: Connection
): Promise<ProcessedEpochInfo> {
  const epochInfo = await connection.getEpochInfo();

  const SLOT_DURATION_MILLISECONDS = 600;
  const msUntilEpochEnd =
    (epochInfo.slotsInEpoch - epochInfo.slotIndex) * SLOT_DURATION_MILLISECONDS;

  const epochProgress = (100 * epochInfo.slotIndex) / epochInfo.slotsInEpoch;

  return {
    ...epochInfo,
    msUntilEpochEnd,
    epochProgress,
  };
}
