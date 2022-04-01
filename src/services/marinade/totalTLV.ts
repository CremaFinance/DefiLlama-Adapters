export async function fetchTotalTLV(): Promise<number> {
  const response = await fetch("https://api.marinade.finance/tlv");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result.total_sol;
}
