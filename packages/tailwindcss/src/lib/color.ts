const formatNumber = (
  number: number,
  options: {
    maximumFractionDigits?: number;
    style?: 'decimal' | 'percent' | 'currency';
  } = {},
): string => {
  const { maximumFractionDigits = 2, style = 'decimal' } = options;
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    style,
  });

  return formatter.format(number);
};

export const hexToHsl = (hex: string): string => {
  const shorthandRegex =
    /^#?(?<first>[a-f\d])(?<second>[a-f\d])(?<third>[a-f\d])$/i;
  const hexColor = hex.replace(
    shorthandRegex,
    (_m, r: string, g: string, b: string) => r + r + g + g + b + b,
  );
  const result =
    /^#?(?<first>[a-f\d]{2})(?<second>[a-f\d]{2})(?<third>[a-f\d]{2})$/i.exec(
      hexColor,
    );
  if (!result) {
    return '0 0% 0%';
  }
  const rgb = [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
  const max = Math.max(...rgb);
  const min = Math.min(...rgb);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rgb[0]:
        h = (rgb[1] - rgb[2]) / d + (rgb[1] < rgb[2] ? 6 : 0);
        break;
      case rgb[1]:
        h = (rgb[2] - rgb[0]) / d + 2;
        break;
      case rgb[2]:
        h = (rgb[0] - rgb[1]) / d + 4;
        break;
    }
    h /= 6;
  }

  return [
    formatNumber(h * 360, { maximumFractionDigits: 2 }),
    formatNumber(s, { maximumFractionDigits: 2, style: 'percent' }),
    formatNumber(l, { maximumFractionDigits: 2, style: 'percent' }),
  ].join(' ');
};
