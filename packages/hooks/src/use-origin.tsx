import { useMounted } from 'src/use-mounted.tsx';

export function useOrigin(): string {
  const mounted = useMounted();

  if (!mounted) {
    return '';
  }

  return typeof window !== 'undefined' ? window.location.origin || '' : '';
}
