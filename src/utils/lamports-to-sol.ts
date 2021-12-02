const lamportsToSol = (amountNum: number, decimals = 9): string => {
  const amount = amountNum.toString();
  const n: number = amount.length;
  const formatted: string[] = [];

  if (n < 10) {
    // less than 1SOL edge case
    for (let cnt = 0; cnt < 9; cnt += 1) {
      formatted.push(n - 1 - cnt >= 0 ? amount.charAt(n - 1 - cnt) : "0");
    }

    formatted.push(".");
    formatted.push("0");
    formatted.reverse();
    return formatted.join("").substring(0, 2 + decimals);
  }

  // handle decimals
  for (let i = 9 - decimals; i < 9; i += 1) {
    formatted.push(amount.charAt(n - 1 - i));
  }

  formatted.push(".");
  let cnt = 0;

  for (let i = 9; i < n; i += 1) {
    formatted.push(amount.charAt(n - 1 - i));
    cnt += 1;

    if (cnt === 3) {
      formatted.push(",");
      cnt = 0;
    }
  }

  if (formatted[formatted.length - 1] === ",") {
    formatted.pop();
  }

  formatted.reverse();
  return formatted.join("");
};

export default lamportsToSol;
