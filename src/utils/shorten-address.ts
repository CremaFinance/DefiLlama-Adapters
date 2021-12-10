export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function shortenAddressForMobile(address: string, chars = 1): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
