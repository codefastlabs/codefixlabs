'use client';

import { Root } from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { toggleVariants } from '@/cva/toggle';

/* -----------------------------------------------------------------------------
 * Component: Toggle
 * -------------------------------------------------------------------------- */

export const Toggle = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, forwardedRef) => (
  <Root
    className={twMerge(toggleVariants({ size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Toggle.displayName = Root.displayName;
