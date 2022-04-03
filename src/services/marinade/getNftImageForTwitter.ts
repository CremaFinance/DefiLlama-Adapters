import { DEFAULT_ENDPOINT } from "utils/web3/endpoints";

export const getNftImageForTwitter = async (index: number, tier: number) => {
  const twitterRes = await fetch(
    `${DEFAULT_ENDPOINT.nftEndpoint}twitter/tweet`,
    {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index,
        tier,
      }),
    }
  );

  return twitterRes.json();
};
