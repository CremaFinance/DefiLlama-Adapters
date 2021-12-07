export function numberToShortVersion(value: number): string {
  if (value > 999 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  if (value > 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  return `${value}`;
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
