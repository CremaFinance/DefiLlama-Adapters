export function numberToShortVersion(value: number): string {
  if (value < 1_000) {
    return `${value.toFixed(2)}`;
  }
  if (value < 1_000_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  if (value < 1_000_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }

  return `${(value / 1_000_000_000).toFixed(2)}B`;
}

export function format5Dec(balance: number, divisor?: number): string {
  return balance === null
    ? "0"
    : (Math.round((balance / (divisor || 1)) * 1e5) / 1e5).toString();
}

export function format2Dec(balance: number, divisor?: number): string {
  return balance == null
    ? "0"
    : (Math.round((balance / (divisor || 1)) * 1e2) / 1e2).toString();
}

export function format9Dec(balance: number, divisor?: number): string {
  return balance == null
    ? "0"
    : (Math.round((balance / (divisor || 1)) * 1e9) / 1e9).toString();
}
