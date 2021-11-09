export function numberToShortVersion(value: number): string {
  if (value > 999 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  if (value > 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  return `${value}`;
}
