'use client';

import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Skeleton
 * -------------------------------------------------------------------------- */

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={twMerge('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
