import { Item, Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center text-sm font-medium transition-colors',
    'first:rounded-l-md last:rounded-r-md',
    'hover:bg-primary hover:text-primary-foreground',
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
          'hover:bg-primary hover:text-primary-foreground',
        ],
        primary: 'bg-transparent',
      },
    },
  },
);

type ToggleGroupItemVariants = VariantProps<typeof toggleGroupItemVariants>;

/* -----------------------------------------------------------------------------
 * Component: ToggleGroup
 * -------------------------------------------------------------------------- */

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'bg-muted text-muted-foreground inline-flex space-x-px rounded-md',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ToggleGroup.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToggleGroupItem
 * -------------------------------------------------------------------------- */

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & ToggleGroupItemVariants
>(({ className, variant = 'primary', size = 'md', ...props }, forwardedRef) => (
  <Item
    className={twMerge(toggleGroupItemVariants({ size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

ToggleGroupItem.displayName = Item.displayName;
