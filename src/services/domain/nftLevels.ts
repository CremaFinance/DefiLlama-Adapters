import type { ProcessedEditionsInfo } from "./processedEditionsInfo";

export const nftLevels: ProcessedEditionsInfo[] = [
  {
    amount: 1000,
    left: 0,
    editions: [
      {
        name: "Limited",
        address: "Lednq4o7qpgBPVpr69ECzUqwZwXPevBdm4iXUxrLeiL",
        limit: 3333,
        current: false,
      },
      {
        name: "Regular",
        address: "RedqkeUD3A1qn5SrmGBRAwGd6G2z2ArPK7Nw1cXbqFi",
        limit: 209600,
        current: false,
      },
    ],
  },
];

export type NftLevels = typeof nftLevels[keyof typeof nftLevels];
