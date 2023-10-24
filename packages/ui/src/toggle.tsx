import { Root } from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Toggle
 * -------------------------------------------------------------------------- */

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-state-on:bg-primary data-state-on:text-primary-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'h-11 px-5',
        md: 'h-10 px-3',
        sm: 'h-9 px-2.5',
      },
      variant: {
        outline: [
          'border-input border bg-transparent',
          'hover:bg-accent hover:text-accent-foreground',
        ],
        primary: 'bg-transparent',
      },
    },
  },
);

export const Toggle = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, forwardedRef) => (
  <Root
    className={twMerge(toggleVariants({ className, size, variant }))}
    ref={forwardedRef}
    {...props}
  />
));

Toggle.displayName = Root.displayName;
