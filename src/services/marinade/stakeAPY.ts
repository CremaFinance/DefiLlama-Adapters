export async function fetchStakeAPY(): Promise<number> {
  const response = await fetch("https://api.marinade.finance/msol/apy/1y");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result.value;
}
