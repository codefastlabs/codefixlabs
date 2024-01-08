export function union(arrays: string[]): string[] {
  return [...new Set(arrays)];
}
