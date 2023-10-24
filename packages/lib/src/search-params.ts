import type { SearchParams } from './types.ts';

function parseQueryValue(
  value: string[] | string | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseQueryValues(value: string[] | string): string[] {
  return Array.isArray(value) ? value : [value];
}

export function parseStringParam<T extends string | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): string | T {
  const parsedValue = parseQueryValue(paramValue);

  return parsedValue || defaultValue;
}

export function parseNumberParam<T extends number | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): number | T {
  const parsedValue = parseQueryValue(paramValue);

  return Number(parsedValue) || defaultValue;
}

export function parseJoinedStringParam(
  paramValue: string[] | string | undefined,
  separator = '|',
): string[] {
  const parsedValue = parseQueryValue(paramValue);

  return parsedValue?.split(separator) || [];
}

export function parseStringParams<T extends string[] | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): string[] | T {
  if (!paramValue || paramValue.length === 0) {
    return defaultValue;
  }

  return parseQueryValues(paramValue);
}

export function parseNumberParams<T extends number[] | undefined>(
  paramValue: string[] | string | undefined,
  defaultValue: T = undefined as T,
): number[] | T {
  if (!paramValue) {
    return defaultValue;
  }

  const parsedValue = parseQueryValues(paramValue);

  return parsedValue.map((value) => Number(value));
}

export function parseJoinedStringParams(
  paramValue: string[] | string | undefined,
  separator = '|',
): string[][] | undefined {
  if (!paramValue) {
    return undefined;
  }

  const parsedValue = parseQueryValues(paramValue);

  return parsedValue.map((value) => value.split(separator));
}

interface PaginationOptions {
  pageParam?: string;
  sizeParam?: string;
  defaultPage?: number;
  defaultSize?: number;
}

interface PaginationParams {
  page: number;
  size: number;
}

export function parsePaginationParams(
  searchParams: SearchParams,
  {
    pageParam = 'page',
    sizeParam = 'size',
    defaultPage = 1,
    defaultSize = 30,
  }: PaginationOptions = {},
): PaginationParams {
  const parsedPage = Math.max(
    parseNumberParam(searchParams[pageParam], defaultPage),
    defaultPage,
  );
  const parsedSize = Math.max(
    parseNumberParam(searchParams[sizeParam], defaultSize),
    1,
  );

  return {
    page: parsedPage - 1,
    size: parsedSize,
  };
}
