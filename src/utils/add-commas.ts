/**
 * adds commas to a string number
 * @param {string} str
 */
export function addCommas(str: string): string {
  let result = str;
  let n = result.indexOf(".");
  if (n === -1) n = result.length;
  n -= 4;
  while (n >= 0) {
    result = `${result.slice(0, n + 1)},${result.slice(n + 1)}`;
    n -= 3;
  }
  return result;
}
