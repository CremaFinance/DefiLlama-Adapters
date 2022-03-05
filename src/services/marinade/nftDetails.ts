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

export const fetchNftData = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<NftData> => {
  const [, uri] = queryKey;
  const response = await fetch(uri);
  if (!response.ok) throw new Error();
  return response.json();
};
