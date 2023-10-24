export const getFirstInitials = (
  str: string | null | undefined,
  fallback?: string,
): string => {
  if (!str) {
    return fallback || '';
  }

  return str
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};
