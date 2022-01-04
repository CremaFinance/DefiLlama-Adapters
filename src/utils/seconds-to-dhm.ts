export function secondsToDhm(valueInSeconds: number): string {
  const noOfD = Math.floor(valueInSeconds / (3600 * 24));
  const days = noOfD > 0 ? `${noOfD}d ` : "";
  const noOfH = Math.floor((valueInSeconds % (3600 * 24)) / 3600);
  const hours = noOfH > 0 ? `${noOfH}h ` : "";
  const noOfM = Math.floor((valueInSeconds % 3600) / 60);
  const minutes = noOfM > 0 ? `${noOfM}m ` : "";

  return days + hours + minutes;
}
