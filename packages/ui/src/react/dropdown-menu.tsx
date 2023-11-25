import {
  Arrow,
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

export const dropdownMenuSubTriggerVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      inset: false,
      variant: 'default',
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-state-open:bg-accent data-state-open:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
          'data-highlighted:data-state-open:bg-accent data-highlighted:data-state-open:text-accent-foreground',
        ],
        destructive: [
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-state-open:bg-destructive-foreground data-state-open:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
          'data-highlighted:data-state-open:bg-destructive-foreground data-highlighted:data-state-open:text-destructive',
        ],
      },
    },
  },
);

type DropdownMenuSubTriggerVariants = VariantProps<
  typeof dropdownMenuSubTriggerVariants
>;

export const dropdownMenuItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      inset: false,
      variant: 'default',
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
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
        primary: [
          'text-primary',
          'focus:bg-primary-foreground focus:text-primary',
          'data-highlighted:bg-primary-foreground data-highlighted:text-primary',
        ],
      },
    },
  },
);

type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;

export const dropdownMenuCheckboxItemVariants = cva(
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

type DropdownMenuCheckboxItemVariants = VariantProps<
  typeof dropdownMenuCheckboxItemVariants
>;

export const dropdownMenuRadioItemVariants = cva(
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

type DropdownMenuRadioItemVariants = VariantProps<
  typeof dropdownMenuRadioItemVariants
>;

export const dropdownMenuLabelVariants = cva(
  'text-foreground cursor-default px-2 py-1.5 text-sm font-semibold',
  {
    defaultVariants: {
      inset: false,
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  },
);

type DropdownMenuLabelVariants = VariantProps<typeof dropdownMenuLabelVariants>;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuContent
 * -------------------------------------------------------------------------- */

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg will-change-[opacity,transform]',
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
        className,
      )}
      ref={forwardedRef}
      sideOffset={5}
      {...props}
    />
  </Portal>
));

DropdownMenuContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSubContent
 * -------------------------------------------------------------------------- */

export const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof SubContent>,
  React.ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <SubContent
      className={twMerge(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg will-change-[opacity,transform]',
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
        className,
      )}
      ref={forwardedRef}
      sideOffset={2}
      {...props}
    />
  </Portal>
));

DropdownMenuSubContent.displayName = SubContent.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSubTrigger
 * -------------------------------------------------------------------------- */

export const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> &
    DropdownMenuSubTriggerVariants
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={twMerge(
      dropdownMenuSubTriggerVariants({
        inset,
        variant,
      }),
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      {children}
      <DropdownMenuShortcut>
        <ChevronRightIcon className="text-accent-foreground" size={16} />
      </DropdownMenuShortcut>
    </>
  </SubTrigger>
));

DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuItem
 * -------------------------------------------------------------------------- */

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    shortcut?: string;
  } & DropdownMenuItemVariants
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={twMerge(
        dropdownMenuItemVariants({
          inset,
          variant,
        }),
        className,
      )}
      ref={forwardedRef}
      {...props}
    >
      {props.asChild ? (
        children
      ) : (
        <>
          {children}
          {shortcut ? (
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
          ) : null}
        </>
      )}
    </Item>
  ),
);

DropdownMenuItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuItemIndicator
 * -------------------------------------------------------------------------- */

export const DropdownMenuItemIndicator = forwardRef<
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

DropdownMenuItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuCheckboxItem
 * -------------------------------------------------------------------------- */

export const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem> & {
    shortcut?: string;
  } & DropdownMenuCheckboxItemVariants
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={twMerge(
      dropdownMenuCheckboxItemVariants({
        variant,
      }),
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      <DropdownMenuItemIndicator>
        <CheckIcon size={16} />
      </DropdownMenuItemIndicator>
      {children}
      {shortcut ? (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      ) : null}
    </>
  </CheckboxItem>
));

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuRadioItem
 * -------------------------------------------------------------------------- */

export const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem> & {
    shortcut?: string;
  } & DropdownMenuRadioItemVariants
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={twMerge(dropdownMenuRadioItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <DropdownMenuItemIndicator>
        <DotIcon size={16} />
      </DropdownMenuItemIndicator>
      {children}
      {shortcut ? (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      ) : null}
    </>
  </RadioItem>
));

DropdownMenuRadioItem.displayName = RadioItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuShortcut
 * -------------------------------------------------------------------------- */

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'text-muted-foreground ml-auto flex pl-4 text-xs',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuArrow
 * -------------------------------------------------------------------------- */

export const DropdownMenuArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuGroup
 * -------------------------------------------------------------------------- */

export const DropdownMenuGroup = Group;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuLabel
 * -------------------------------------------------------------------------- */

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & DropdownMenuLabelVariants
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={twMerge(dropdownMenuLabelVariants({ inset }), className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuRadioGroup
 * -------------------------------------------------------------------------- */

export const DropdownMenuRadioGroup = RadioGroup;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenu
 * -------------------------------------------------------------------------- */

export const DropdownMenu = Root;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSeparator
 * -------------------------------------------------------------------------- */

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSub
 * -------------------------------------------------------------------------- */

export const DropdownMenuSub = Sub;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuTrigger
 * -------------------------------------------------------------------------- */

export const DropdownMenuTrigger = Trigger;
