export const lendingFranciumPoolAddress = {
  FRANCIUM_mSOL: "ADW9ZJuRQ9xbzTtWCwX1Th24Vxq7GWHWwYtctrbyjSr1",
} as const;

export type LendingFranciumPoolAddress =
  typeof lendingFranciumPoolAddress[keyof typeof lendingFranciumPoolAddress];
