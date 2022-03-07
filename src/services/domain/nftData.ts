export interface NftData {
  name: string;
  image: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  properties: {
    category: string;
    mnde_amount: number;
    unlock_duration: number;
    files: { uri: string }[];
  };
}
