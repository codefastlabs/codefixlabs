import { useMounted } from '@/use-mounted';

export function useOrigin(): string {
  const mounted = useMounted();

  if (!mounted) {
    return '';
  }

  return typeof window !== 'undefined' ? window.location.origin || '' : '';
}
