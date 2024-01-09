import type {
  SelectArrowProps,
  SelectContentProps as ContentProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps as ItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectTriggerProps as TriggerProps,
  SelectValueProps,
  SelectViewportProps,
} from '@radix-ui/react-select';
import {
  Arrow,
  Content,
  Icon,
  Item,
  ItemIndicator,
  Label,
  Portal,
  ScrollDownButton,
  ScrollUpButton,
  Select,
  SelectGroup,
  SelectItemText,
  SelectValue,
  Separator,
  Trigger,
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
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const selectTriggerVariants = cva(
  [
    'border-input select-none items-center justify-between gap-2 rounded-md border bg-transparent text-sm',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
        lg: 'px-5.75 h-12',
        md: 'px-4.75 h-10',
        sm: 'px-3.75 h-8',
      },
    },
  },
);

type SelectTriggerVariantsProps = VariantProps<typeof selectTriggerVariants>;

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

type SelectContentVariantsProps = VariantProps<typeof selectContentVariants>;

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

type SelectItemVariantsProps = VariantProps<typeof selectItemVariants>;

/* -----------------------------------------------------------------------------
 * Component: Select
 * -------------------------------------------------------------------------- */

export { Select };
export type { SelectProps };

/* -----------------------------------------------------------------------------
 * Component: SelectValue
 * -------------------------------------------------------------------------- */

export { SelectValue };
export type { SelectValueProps };

/* -----------------------------------------------------------------------------
 * Component: SelectGroup
 * -------------------------------------------------------------------------- */

export { SelectGroup };
export type { SelectGroupProps };

/* -----------------------------------------------------------------------------
 * Component: SelectItemText
 * -------------------------------------------------------------------------- */

export { SelectItemText };
export type { SelectItemTextProps };

/* -----------------------------------------------------------------------------
 * Component: SelectIcon
 * -------------------------------------------------------------------------- */

export type { SelectIconProps };

export const SelectIcon = React.forwardRef<
  React.ElementRef<typeof Icon>,
  SelectIconProps
>(({ className, ...props }, forwardedRef) => (
  <Icon
    className={cn('flex size-4', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectIcon.displayName = Icon.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectTrigger
 * -------------------------------------------------------------------------- */

export interface SelectTriggerProps
  extends TriggerProps,
    SelectTriggerVariantsProps {
  loading?: boolean;
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  SelectTriggerProps
>(
  (
    { children, className, size, block, disabled, loading, ...props },
    forwardedRef,
  ) => (
    <Trigger
      className={cn(selectTriggerVariants({ block, size }), className)}
      disabled={loading ? true : disabled}
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}
        <SelectIcon className="flex size-4">
          {loading ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <ChevronDownIcon className="opacity-50" size={16} />
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

export type { SelectScrollUpButtonProps };

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, forwardedRef) => (
  <ScrollUpButton
    className={cn(
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

export type { SelectScrollDownButtonProps };

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, forwardedRef) => (
  <ScrollDownButton
    className={cn(
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

export type { SelectViewportProps };

export function SelectViewport({
  className,
  ...props
}: SelectViewportProps): React.JSX.Element {
  return <Viewport className={cn('p-1', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: SelectContent
 * -------------------------------------------------------------------------- */

export interface SelectContentProps
  extends ContentProps,
    Omit<SelectContentVariantsProps, 'position'> {}

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  SelectContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
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
          <ChevronUpIcon className="opacity-50" size={16} />
        </SelectScrollUpButton>

        <SelectViewport>{children}</SelectViewport>

        <SelectScrollDownButton>
          <ChevronDownIcon className="opacity-50" size={16} />
        </SelectScrollDownButton>
      </>
    </Content>
  </Portal>
));

SelectContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectItemIndicator
 * -------------------------------------------------------------------------- */

export type { SelectItemIndicatorProps };

export const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  SelectItemIndicatorProps
>(({ className, ...props }, forwardedRef) => (
  <ItemIndicator
    className={cn(
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

export interface SelectItemProps extends ItemProps, SelectItemVariantsProps {}

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  SelectItemProps
>(({ children, className, variant, ...props }, forwardedRef) => (
  <Item
    className={cn(selectItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator>
        <CheckIcon size={16} />
      </SelectItemIndicator>
    </>
  </Item>
));

SelectItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectSeparator
 * -------------------------------------------------------------------------- */

export type { SelectSeparatorProps };

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  SelectSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectArrow
 * -------------------------------------------------------------------------- */

export type { SelectArrowProps };

export const SelectArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  SelectArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: SelectLabel
 * -------------------------------------------------------------------------- */

export type { SelectLabelProps };

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  SelectLabelProps
>(({ className, ...props }, forwardedRef) => (
  <Label
    className={cn('px-8 py-1.5 text-sm font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

SelectLabel.displayName = Label.displayName;
