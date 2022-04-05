export interface NftData {
  name: string;
  symbol: string;
  image: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  collection: {
    name: string;
    family: string;
  };
  properties: {
    category: string;
    mnde_amount: number;
    unlock_duration: number;
    tier: number;
    files: { uri: string }[];
    edition: number;
    index: number;
  };
}
