import type { Edition } from "./edition";

export type ProcessedEditionsInfo = {
  amount: number;
  left: number;
  editions: Edition[];
};
