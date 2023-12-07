import { twMerge } from 'tailwind-merge';
import * as React from 'react';

/* -----------------------------------------------------------------------------
 * Component: Skeleton
 * -------------------------------------------------------------------------- */

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        'relative overflow-hidden rounded bg-neutral-100',
        className,
      )}
      {...props}
    />
  );
}
