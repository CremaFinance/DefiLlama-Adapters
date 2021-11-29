export type ProcessedEpochInfo = {
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  absoluteSlot: number;
  blockHeight?: number;
  transactionCount?: number;
  msUntilEpochEnd: number;
  epochProgress: number;
};
