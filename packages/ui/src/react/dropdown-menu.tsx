import {
  type DropdownMenuArrowProps,
  type DropdownMenuCheckboxItemProps as CheckboxItemProps,
  type DropdownMenuContentProps,
  type DropdownMenuGroupProps,
  type DropdownMenuItemIndicatorProps,
  type DropdownMenuItemProps as ItemProps,
  type DropdownMenuLabelProps as LabelProps,
  type DropdownMenuProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps as RadioItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps as SubTriggerProps,
  type DropdownMenuTriggerProps,
  Arrow,
  CheckboxItem,
  Content,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuTrigger,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';
import { type VariantProps, cva } from 'class-variance-authority';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const dropdownMenuSubTriggerVariants = cva(
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

type DropdownMenuSubTriggerVariantsProps = VariantProps<
  typeof dropdownMenuSubTriggerVariants
>;

const dropdownMenuItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      inset: false,
      variant: 'ghost',
    },
    variants: {
      inset: {
        true: 'pl-8',
      },
      variant: {
        ghost: [
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

type DropdownMenuItemVariantsProps = VariantProps<
  typeof dropdownMenuItemVariants
>;

const dropdownMenuCheckboxItemVariants = cva(
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

type DropdownMenuCheckboxItemVariantsProps = VariantProps<
  typeof dropdownMenuCheckboxItemVariants
>;

const dropdownMenuRadioItemVariants = cva(
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

type DropdownMenuRadioItemVariantsProps = VariantProps<
  typeof dropdownMenuRadioItemVariants
>;

const dropdownMenuLabelVariants = cva(
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

type DropdownMenuLabelVariantsProps = VariantProps<
  typeof dropdownMenuLabelVariants
>;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuContent
 * -------------------------------------------------------------------------- */

export type { DropdownMenuContentProps };

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  DropdownMenuContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
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

export type { DropdownMenuSubContentProps };

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <SubContent
      className={cn(
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

export interface DropdownMenuSubTriggerProps
  extends SubTriggerProps,
    DropdownMenuSubTriggerVariantsProps {}

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={cn(
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

export interface DropdownMenuItemProps
  extends ItemProps,
    DropdownMenuItemVariantsProps {
  shortcut?: string;
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  DropdownMenuItemProps
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={cn(
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

export type { DropdownMenuItemIndicatorProps };

export const DropdownMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  DropdownMenuItemIndicatorProps
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

DropdownMenuItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuCheckboxItem
 * -------------------------------------------------------------------------- */

export interface DropdownMenuCheckboxItemProps
  extends CheckboxItemProps,
    DropdownMenuCheckboxItemVariantsProps {
  shortcut?: string;
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={cn(
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

export interface DropdownMenuRadioItemProps
  extends RadioItemProps,
    DropdownMenuRadioItemVariantsProps {
  shortcut?: string;
}

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={cn(dropdownMenuRadioItemVariants({ variant }), className)}
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

export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLDivElement>;

export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps): React.JSX.Element {
  return (
    <div
      className={cn(
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

export type { DropdownMenuArrowProps };

export const DropdownMenuArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  DropdownMenuArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuGroup
 * -------------------------------------------------------------------------- */

export { DropdownMenuGroup };
export type { DropdownMenuGroupProps };

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuLabel
 * -------------------------------------------------------------------------- */

export interface DropdownMenuLabelProps
  extends LabelProps,
    DropdownMenuLabelVariantsProps {}

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  DropdownMenuLabelProps
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={cn(dropdownMenuLabelVariants({ inset }), className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuRadioGroup
 * -------------------------------------------------------------------------- */

export { DropdownMenuRadioGroup };
export type { DropdownMenuRadioGroupProps };

/* -----------------------------------------------------------------------------
 * Component: DropdownMenu
 * -------------------------------------------------------------------------- */

export { DropdownMenu };
export type { DropdownMenuProps };

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSeparator
 * -------------------------------------------------------------------------- */

export type { DropdownMenuSeparatorProps };

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

DropdownMenuSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuSub
 * -------------------------------------------------------------------------- */

export { DropdownMenuSub };
export type { DropdownMenuSubProps };

/* -----------------------------------------------------------------------------
 * Component: DropdownMenuTrigger
 * -------------------------------------------------------------------------- */

export { DropdownMenuTrigger };
export type { DropdownMenuTriggerProps };
