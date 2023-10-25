function removeEmoji(text: string): string {
  return text.replace(/\p{Emoji}/gu, '');
}

function convertSpecialTextToLatin(text: string): string {
  return text.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
}

export const getFirstInitials = (
  text: string | null | undefined,
  fallback?: string,
): string => {
  if (!text) {
    return fallback || '';
  }

  return convertSpecialTextToLatin(removeEmoji(text))
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};
