export const formatNumberLocale = (
  number: number | string | null | undefined,
  locale = "en-US"
) => {
  if (number === undefined || number === null) return "0";

  return new Intl.NumberFormat(locale).format(Number(number));
};
