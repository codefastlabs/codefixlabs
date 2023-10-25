'use client';

import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { badgeVariants } from './cva';

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
      className={twMerge(badgeVariants({ className, variant }))}
      {...props}
    />
  );
}
