import { secondsToDhm } from "./seconds-to-dhm";
import { secondsToDhms } from "./seconds-to-dhms";

export function millisecondsToDhms(
  valueInMilliseconds: number,
  showSeconds = true
): string {
  const valueInSeconds = valueInMilliseconds / 1000;
  return showSeconds
    ? secondsToDhms(valueInSeconds)
    : secondsToDhm(valueInSeconds);
}
