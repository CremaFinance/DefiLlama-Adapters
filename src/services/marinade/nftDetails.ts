import type { NftData } from "services/domain/nftData";

export const fetchNftData = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<NftData> => {
  const [, uri] = queryKey;
  const response = await fetch(uri, { mode: "cors" });
  if (!response.ok) throw new Error();
  return response.json();
};
