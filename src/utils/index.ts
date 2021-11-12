export function numberWithCommas(x: number): string {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function searchDeep(
  obj: Record<string, unknown>,
  deepProperty: string
): unknown {
  const path = deepProperty.split(".");
  if (typeof obj[path[0]] === "object") {
    return searchDeep(
      obj[path[0]] as Record<string, unknown>,
      deepProperty.slice(path[0].length + 1)
    );
  }
  return obj[path[0]];
}
