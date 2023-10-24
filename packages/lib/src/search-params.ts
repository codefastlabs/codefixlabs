import type { SearchParams } from './types';

function parseValue(value: string[] | string | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseValues(
  value: string[] | string | undefined,
): string[] | undefined {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value : [value];
}

export function parseStringParam(
  searchParams: SearchParams,
  paramName: string,
  defaultValue = '',
): string {
  const result = parseValue(searchParams[paramName]);

  return result || defaultValue;
}

export function parseStringParams(
  searchParams: SearchParams,
  paramName: string,
  defaultValue = [],
): string[] {
  const results = parseValues(searchParams[paramName]);

  return results || defaultValue;
}

export function parseNumberParam(
  searchParams: SearchParams,
  paramName: string,
  defaultValue = NaN,
): number {
  const result = Number(parseValue(searchParams[paramName]));

  return result || defaultValue;
}

export function parseNumberParams(
  searchParams: SearchParams,
  paramName: string,
  defaultValue = [],
): number[] {
  const results = parseValues(searchParams[paramName])?.map(Number);

  return results || defaultValue;
}

export function parsePaginationParams(
  searchParams: SearchParams,
  initialData?: {
    pageParam?: string;
    sizeParam?: string;
    defaultPage?: number;
    defaultSize?: number;
  },
): {
  page: number;
  size: number;
} {
  const {
    pageParam = 'page',
    sizeParam = 'size',
    defaultPage = 1,
    defaultSize = 10,
  } = initialData || {};

  const parsedPage = Math.max(
    parseNumberParam(searchParams, pageParam, defaultPage),
    defaultPage,
  );

  const parsedSize = Math.max(
    parseNumberParam(searchParams, sizeParam, defaultSize),
    1,
  );

  return {
    page: parsedPage - 1,
    size: parsedSize,
  };
}
