import {
  Button,
  Link,
  Root,
  Separator,
  ToggleGroup,
  ToggleItem,
} from '@radix-ui/react-toolbar';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toolbarToggleItemVariants = cva(
  [
    'inline-flex items-center justify-center rounded text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-state-on:bg-primary data-state-on:text-primary-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'sm',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'px-4.25 h-9',
        md: 'px-2.25 h-8',
        sm: 'px-1.75 h-7',
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

type ToolbarToggleItemVariants = VariantProps<typeof toolbarToggleItemVariants>;

/* -----------------------------------------------------------------------------
 * Component: Toolbar
 * -------------------------------------------------------------------------- */

export const Toolbar = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'flex w-full min-w-max rounded-md border p-1',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Toolbar.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarSeparator
 * -------------------------------------------------------------------------- */

export const ToolbarSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-border mx-2.5 w-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

ToolbarSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarButton
 * -------------------------------------------------------------------------- */

export const ToolbarButton = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, forwardedRef) => (
  <Button
    className={twMerge(
      'bg-primary my-auto flex h-7 shrink-0 grow-0 basis-auto items-center justify-center rounded px-2.5 text-sm text-white outline-none',
      'hover:bg-primary/90',
      'focus:ring-ring/40 focus:relative focus:ring-2',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ToolbarButton.displayName = Button.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarLink
 * -------------------------------------------------------------------------- */

export const ToolbarLink = forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, forwardedRef) => (
  <Link
    className={twMerge(
      'px-1.25 text-muted-foreground my-auto flex h-7 shrink-0 grow-0 basis-auto items-center justify-center rounded-md bg-transparent text-sm',
      'hover:text-primary hover:cursor-pointer hover:bg-transparent',
      'focus:ring-ring/40 focus:relative focus:z-40 focus:outline-none focus:ring-2',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ToolbarLink.displayName = Link.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarToggleGroup
 * -------------------------------------------------------------------------- */

export const ToolbarToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup>
>(({ className, ...props }, forwardedRef) => (
  <ToggleGroup
    className={twMerge(
      'flex items-center gap-0.5',
      'data-orientation-vertical:flex-col',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ToolbarToggleGroup.displayName = ToggleGroup.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarToggleItem
 * -------------------------------------------------------------------------- */

export const ToolbarToggleItem = forwardRef<
  React.ElementRef<typeof ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToggleItem> & ToolbarToggleItemVariants
>(({ className, variant = 'primary', size = 'sm', ...props }, forwardedRef) => (
  <ToggleItem
    ref={forwardedRef}
    {...props}
    className={twMerge(toolbarToggleItemVariants({ size, variant }), className)}
  />
));

ToolbarToggleItem.displayName = ToggleItem.displayName;
