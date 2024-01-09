import type { ToggleProps as RootProps } from '@radix-ui/react-toggle';
import { Root } from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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

type ToggleVariantsProps = VariantProps<typeof toggleVariants>;

/* -----------------------------------------------------------------------------
 * Component: Toggle
 * -------------------------------------------------------------------------- */

export interface ToggleProps extends RootProps, ToggleVariantsProps {}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof Root>,
  ToggleProps
>(({ className, variant, size, ...props }, forwardedRef) => (
  <Root
    className={cn(toggleVariants({ size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Toggle.displayName = Root.displayName;
