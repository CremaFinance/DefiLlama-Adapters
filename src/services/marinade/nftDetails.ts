export interface NftData {
  name: string;
  image: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  properties: {
    category: string;
    mnde_amount: number;
    unlock_duration: number;
  };
}

const metadataApi = "https://marinade-nft.beta.live/metadata";

export const fetchNftData = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<NftData> => {
  const [, id] = queryKey;
  const response = await fetch(`${metadataApi}/${id}`);
  if (!response.ok) throw new Error();
  return response.json();
};
