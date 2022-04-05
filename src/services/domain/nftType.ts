import type { PublicKey } from "@solana/web3.js";

export type NFTType = {
  address: PublicKey;
  lockedMNDE: number;
  id: string;
  thumbnailURL: string;
  lockEndDate?: Date;
  dataUri: string;
};
