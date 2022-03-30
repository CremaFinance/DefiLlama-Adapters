const apiUrl = "https://marinade-nft.beta.live/twitter/tweet";

export const getNftImageForTwitter = async (index: number, tier: number) => {
  const twitterRes = await fetch(apiUrl, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index,
      tier,
    }),
  });

  return twitterRes.json();
};
