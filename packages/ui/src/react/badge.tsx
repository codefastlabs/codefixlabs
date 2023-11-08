import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';
import { badgeVariants } from '@/cva/badge';

/* -----------------------------------------------------------------------------
 * Component: Badge
 * -------------------------------------------------------------------------- */

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof badgeVariants>): React.JSX.Element {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
