const map = new Map<string, Intl.NumberFormat>();

const getOrCreateFormatter = (
  options: Intl.NumberFormatOptions,
  locales?: string[] | string,
): Intl.NumberFormat => {
  const stringify = JSON.stringify([options, locales]);

  let numberFormat = map.get(stringify);

  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locales, options);

    map.set(stringify, numberFormat);
  }

  return numberFormat;
};

export const formatCurrency = (
  number: number,
  { currency = 'USD', ...options }: Intl.NumberFormatOptions = {},
  locales: string[] | string = 'en-US',
): string => {
  const formatter = getOrCreateFormatter(
    {
      ...options,
      currency,
      style: 'currency',
    },
    locales,
  );

  return formatter.format(number);
};

export const formatNumber = (
  number: number,
  { style = 'decimal', ...options }: Intl.NumberFormatOptions = {},
  locales: string[] | string = 'en-US',
): string => {
  const formatter = getOrCreateFormatter(
    {
      ...options,
      style,
    },
    locales,
  );

  return formatter.format(number);
};
