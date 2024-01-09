import type {
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupMultipleProps,
  ToolbarToggleGroupSingleProps,
  ToolbarToggleItemProps as ToggleItemProps,
} from '@radix-ui/react-toolbar';
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
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toolbarToggleItemVariants = cva(
  [
    'inline-flex items-center justify-center rounded text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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

type ToolbarToggleItemVariantsProps = VariantProps<
  typeof toolbarToggleItemVariants
>;

/* -----------------------------------------------------------------------------
 * Component: Toolbar
 * -------------------------------------------------------------------------- */

export type { ToolbarProps };

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof Root>,
  ToolbarProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn('flex w-full min-w-max rounded-md border p-1', className)}
    ref={forwardedRef}
    {...props}
  />
));

Toolbar.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarSeparator
 * -------------------------------------------------------------------------- */

export type { ToolbarSeparatorProps };

export const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  ToolbarSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-border mx-2.5 w-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

ToolbarSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToolbarButton
 * -------------------------------------------------------------------------- */

export type { ToolbarButtonProps };

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  ToolbarButtonProps
>(({ className, ...props }, forwardedRef) => (
  <Button
    className={cn(
      'bg-primary my-auto flex h-7 shrink-0 grow-0 basis-auto items-center justify-center rounded px-2.5 text-sm text-white outline-none',
      'hover:bg-primary/90',
      'ring-offset-background',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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

export type { ToolbarLinkProps };

export const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  ToolbarLinkProps
>(({ className, ...props }, forwardedRef) => (
  <Link
    className={cn(
      'px-1.25 text-muted-foreground my-auto flex h-7 shrink-0 grow-0 basis-auto items-center justify-center rounded-md bg-transparent text-sm',
      'hover:text-primary hover:cursor-pointer hover:bg-transparent',
      'ring-offset-background',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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

export type ToolbarToggleGroupProps =
  | ToolbarToggleGroupSingleProps
  | ToolbarToggleGroupMultipleProps;

export const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroup>,
  ToolbarToggleGroupProps
>(({ className, ...props }, forwardedRef) => (
  <ToggleGroup
    className={cn(
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

export interface ToolbarToggleItemProps
  extends ToggleItemProps,
    ToolbarToggleItemVariantsProps {}

export const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToggleItem>,
  ToolbarToggleItemProps
>(({ className, variant = 'primary', size = 'sm', ...props }, forwardedRef) => (
  <ToggleItem
    ref={forwardedRef}
    {...props}
    className={cn(toolbarToggleItemVariants({ size, variant }), className)}
  />
));

ToolbarToggleItem.displayName = ToggleItem.displayName;
