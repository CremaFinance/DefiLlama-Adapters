export function numberToShortVersion(value: number): string {
  if (value < 1_000) {
    return `${Math.floor(value * 100) / 100}`;
  }
  if (value < 1_000_000) {
    return `${Math.floor((value / 1_000) * 100) / 100}K`;
  }
  if (value < 1_000_000_000) {
    return `${Math.floor((value / 1_000_000) * 100) / 100}M`;
  }

  return `${Math.floor((value / 1_000_000_000) * 100) / 100}B`;
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

export function format3Dec(balance: number, divisor?: number): string {
  return balance == null
    ? "0"
    : (Math.round((balance / (divisor || 1)) * 1e3) / 1e3).toString();
}

export function format9Dec(balance: number, divisor?: number): string {
  return balance == null
    ? "0"
    : (Math.round((balance / (divisor || 1)) * 1e9) / 1e9).toString();
}
