'use client';

import { Item, Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { toggleGroupItemVariants } from '@/cva/toggle-group';

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
  React.ComponentPropsWithoutRef<typeof Item> &
    VariantProps<typeof toggleGroupItemVariants>
>(({ className, variant = 'primary', size = 'md', ...props }, forwardedRef) => (
  <Item
    className={twMerge(toggleGroupItemVariants({ size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

ToggleGroupItem.displayName = Item.displayName;
