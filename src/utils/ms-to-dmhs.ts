import { secondsToDhms } from "./seconds-to-dmhs";

export function millisecondsToDhms(valueInMilliseconds: number): string {
  const valueInSeconds = valueInMilliseconds / 1000;
  return secondsToDhms(valueInSeconds);
}
