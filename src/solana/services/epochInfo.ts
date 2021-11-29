import { Connection } from "@solana/web3.js";

import { DEFAULT_ENDPOINT } from "../../utils/web3/endpoints";
import { ProcessedEpochInfo } from "../domain/processedEpochInfo";

export async function getEpochInfo(
  connection: Connection
): Promise<ProcessedEpochInfo> {
  const epochInfo = await connection.getEpochInfo();

  const msUntilEpochEnd =
    (epochInfo.slotsInEpoch - epochInfo.slotIndex) *
    DEFAULT_ENDPOINT.slotTimeAvg1h;

  const epochProgress = (100 * epochInfo.slotIndex) / epochInfo.slotsInEpoch;

  return {
    ...epochInfo,
    msUntilEpochEnd,
    epochProgress,
  };
}
