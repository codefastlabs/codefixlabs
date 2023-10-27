'use client';

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
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  selectContentVariants,
  selectItemVariants,
  selectTriggerVariants,
} from '@/cva/select';

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
    VariantProps<typeof selectTriggerVariants>
>(({ children, className, size, block, ...props }, forwardedRef) => (
  <Trigger
    className={twMerge(selectTriggerVariants({ block, size }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      {children}
      <SelectIcon className="flex h-4 w-4">
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectIcon>
    </>
  </Trigger>
));

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
    Omit<VariantProps<typeof selectContentVariants>, 'position'>
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
  React.ComponentPropsWithoutRef<typeof Item> &
    VariantProps<typeof selectItemVariants>
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
