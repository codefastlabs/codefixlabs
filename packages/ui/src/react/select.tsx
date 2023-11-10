import {
  Arrow,
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
} from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const selectTriggerVariants = cva(
  [
    'border-input h-10 select-none items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-state-open:ring-ring/10 data-state-open:outline-none data-state-open:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-muted-foreground',
  ],
  {
    defaultVariants: {
      block: false,
      size: 'md',
    },
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8',
      },
    },
  },
);

type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

const selectContentVariants = cva(
  [
    'bg-popover text-popover-foreground relative z-40 w-[var(--radix-select-trigger-width)] min-w-max overflow-hidden rounded-md border shadow-lg',
    [
      'data-state-open:data-side-top:animate-slide-in-from-top',
      'data-state-open:data-side-bottom:animate-slide-in-from-bottom',
      'data-state-open:data-side-left:animate-slide-in-from-left',
      'data-state-open:data-side-right:animate-slide-in-from-right',
    ],
    [
      'data-state-closed:data-side-top:animate-slide-out-to-top',
      'data-state-closed:data-side-bottom:animate-slide-out-to-bottom',
      'data-state-closed:data-side-left:animate-slide-out-to-left',
      'data-state-closed:data-side-right:animate-slide-out-to-right',
    ],
  ],
  {
    defaultVariants: {
      position: 'item-aligned',
    },
    variants: {
      position: {
        'item-aligned': undefined,
        popper:
          'max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]',
      },
    },
  },
);

type SelectContentVariants = VariantProps<typeof selectContentVariants>;

const selectItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
        ],
      },
    },
  },
);

type SelectItemVariants = VariantProps<typeof selectItemVariants>;

/* -----------------------------------------------------------------------------
 * Component: Select
 * -------------------------------------------------------------------------- */

export const Select = Root;

/* -----------------------------------------------------------------------------
 * Component: SelectValue
 * -------------------------------------------------------------------------- */

export const SelectValue = Value;

/* -----------------------------------------------------------------------------
 * Component: SelectGroup
 * -------------------------------------------------------------------------- */

export const SelectGroup = Group;

/* -----------------------------------------------------------------------------
 * Component: SelectItemText
 * -------------------------------------------------------------------------- */

export const SelectItemText = ItemText;

/* -----------------------------------------------------------------------------
 * Component: SelectIcon
 * -------------------------------------------------------------------------- */

export const SelectIcon = forwardRef<
  React.ElementRef<typeof Icon>,
  React.ComponentPropsWithoutRef<typeof Icon>
>(({ className, ...props }, forwardedRef) => (
  <Icon
    className={twMerge('flex h-4 w-4', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectIcon.displayName = Icon.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectTrigger
 * -------------------------------------------------------------------------- */

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> &
    SelectTriggerVariants & {
      loading?: boolean;
    }
>(
  (
    { children, className, size, block, disabled, loading, ...props },
    forwardedRef,
  ) => (
    <Trigger
      className={twMerge(selectTriggerVariants({ block, size }), className)}
      disabled={loading ? true : disabled}
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}
        <SelectIcon className="flex h-4 w-4">
          {loading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          )}
        </SelectIcon>
      </>
    </Trigger>
  ),
);

SelectTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectScrollUpButton
 * -------------------------------------------------------------------------- */

export const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, forwardedRef) => (
  <ScrollUpButton
    className={twMerge(
      'flex cursor-pointer items-center justify-center py-1.5',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

SelectScrollUpButton.displayName = ScrollUpButton.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectScrollDownButton
 * -------------------------------------------------------------------------- */

export const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, forwardedRef) => (
  <ScrollDownButton
    className={twMerge(
      'flex cursor-pointer items-center justify-center py-1.5',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

SelectScrollDownButton.displayName = ScrollDownButton.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectViewport
 * -------------------------------------------------------------------------- */

export function SelectViewport({
  className,
  ...props
}: React.ComponentProps<typeof Viewport>): React.JSX.Element {
  return <Viewport className={twMerge('p-1', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: SelectContent
 * -------------------------------------------------------------------------- */

export const SelectContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> &
    Omit<SelectContentVariants, 'position'>
>(({ children, className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        selectContentVariants({
          position: props.position ?? 'item-aligned',
        }),
        className,
      )}
      ref={forwardedRef}
      sideOffset={5}
      {...props}
    >
      <>
        <SelectScrollUpButton>
          <ChevronUpIcon className="h-4 w-4 opacity-50" />
        </SelectScrollUpButton>

        <SelectViewport>{children}</SelectViewport>

        <SelectScrollDownButton>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </SelectScrollDownButton>
      </>
    </Content>
  </Portal>
));

SelectContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectItemIndicator
 * -------------------------------------------------------------------------- */

export const SelectItemIndicator = forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof ItemIndicator>
>(({ className, ...props }, forwardedRef) => (
  <ItemIndicator
    className={twMerge(
      'absolute left-0 inline-flex w-8 items-center justify-center',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

SelectItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectItem
 * -------------------------------------------------------------------------- */

export const SelectItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & SelectItemVariants
>(({ children, className, variant, ...props }, forwardedRef) => (
  <Item
    className={twMerge(selectItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectItemIndicator>
    </>
  </Item>
));

SelectItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectSeparator
 * -------------------------------------------------------------------------- */

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectArrow
 * -------------------------------------------------------------------------- */

export const SelectArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectLabel
 * -------------------------------------------------------------------------- */

export const SelectLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, forwardedRef) => (
  <Label
    className={twMerge('px-8 py-1.5 text-sm font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectLabel.displayName = Label.displayName;
