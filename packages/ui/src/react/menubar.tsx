import {
  Arrow,
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const menubarSubTriggerVariants = cva(
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

type MenubarSubTriggerVariants = VariantProps<typeof menubarSubTriggerVariants>;

const menubarItemVariants = cva(
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
      },
    },
  },
);

type MenubarItemVariants = VariantProps<typeof menubarItemVariants>;

const menubarCheckboxItemVariants = cva(
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

type MenubarCheckboxItemVariants = VariantProps<
  typeof menubarCheckboxItemVariants
>;

const menubarRadioItemVariants = cva(
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

type MenubarRadioItemVariants = VariantProps<typeof menubarRadioItemVariants>;

const menubarLabelVariants = cva(
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

type MenubarLabelVariants = VariantProps<typeof menubarLabelVariants>;

/* -----------------------------------------------------------------------------
 * Component: Menubar
 * -------------------------------------------------------------------------- */

export const Menubar = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'bg-background flex h-10 items-center space-x-1 rounded-md border p-1',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Menubar.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarMenu
 * -------------------------------------------------------------------------- */

export const MenubarMenu = Menu;

/* -----------------------------------------------------------------------------
 * Component: MenubarTrigger
 * -------------------------------------------------------------------------- */

export const MenubarTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, forwardedRef) => (
  <Trigger
    className={twMerge(
      'flex cursor-pointer select-none items-center justify-between gap-1 rounded px-3 py-1.5 text-sm font-medium outline-none',
      'focus:bg-accent focus:text-accent-foreground',
      'data-state-open:bg-accent data-state-open:text-accent-foreground',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

MenubarTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarContent
 * -------------------------------------------------------------------------- */

export const MenubarContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
        [
          'data-state-open:data-side-top:animate-slide-in-from-top',
          'data-state-open:data-side-bottom:animate-slide-in-from-bottom',
          'data-state-open:data-side-left:animate-slide-in-from-left',
          'data-state-open:data-side-right:animate-slide-in-from-right',
        ],
        className,
      )}
      ref={forwardedRef}
      sideOffset={8}
      {...props}
    />
  </Portal>
));

MenubarContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarSubContent
 * -------------------------------------------------------------------------- */

export const MenubarSubContent = forwardRef<
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
      {...props}
    />
  </Portal>
));

MenubarSubContent.displayName = SubContent.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarShortcut
 * -------------------------------------------------------------------------- */

export function MenubarShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
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
 * Component: MenubarSubTrigger
 * -------------------------------------------------------------------------- */

export const MenubarSubTrigger = forwardRef<
  React.ElementRef<typeof SubTrigger>,
  React.ComponentPropsWithoutRef<typeof SubTrigger> & MenubarSubTriggerVariants
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={twMerge(
      menubarSubTriggerVariants({
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
      <MenubarShortcut>
        <ChevronRightIcon className="text-accent-foreground" size={16} />
      </MenubarShortcut>
    </>
  </SubTrigger>
));

MenubarSubTrigger.displayName = SubTrigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarItem
 * -------------------------------------------------------------------------- */

export const MenubarItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> & {
    shortcut?: string;
  } & MenubarItemVariants
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={twMerge(menubarItemVariants({ inset, variant }), className)}
      ref={forwardedRef}
      {...props}
    >
      {props.asChild ? (
        children
      ) : (
        <>
          {children}
          {shortcut ? <MenubarShortcut>{shortcut}</MenubarShortcut> : null}
        </>
      )}
    </Item>
  ),
);

MenubarItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarItemIndicator
 * -------------------------------------------------------------------------- */

export const MenubarItemIndicator = forwardRef<
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

MenubarItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarCheckboxItem
 * -------------------------------------------------------------------------- */

export const MenubarCheckboxItem = forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof CheckboxItem> & {
    shortcut?: string;
  } & MenubarCheckboxItemVariants
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={twMerge(menubarCheckboxItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <MenubarItemIndicator>
        <CheckIcon size={16} />
      </MenubarItemIndicator>
      {children}
      {shortcut ? <MenubarShortcut>{shortcut}</MenubarShortcut> : null}
    </>
  </CheckboxItem>
));

MenubarCheckboxItem.displayName = CheckboxItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarRadioItem
 * -------------------------------------------------------------------------- */

export const MenubarRadioItem = forwardRef<
  React.ElementRef<typeof RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadioItem> & {
    shortcut?: string;
  } & MenubarRadioItemVariants
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={twMerge(menubarRadioItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <MenubarItemIndicator>
        <DotIcon size={16} />
      </MenubarItemIndicator>
      {children}
      {shortcut ? <MenubarShortcut>{shortcut}</MenubarShortcut> : null}
    </>
  </RadioItem>
));

MenubarRadioItem.displayName = RadioItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarGroup
 * -------------------------------------------------------------------------- */

export const MenubarGroup = Group;

/* -----------------------------------------------------------------------------
 * Component: MenubarLabel
 * -------------------------------------------------------------------------- */

export const MenubarLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & MenubarLabelVariants
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={twMerge(menubarLabelVariants({ inset }), className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarRadioGroup
 * -------------------------------------------------------------------------- */

export const MenubarRadioGroup = RadioGroup;

/* -----------------------------------------------------------------------------
 * Component: MenubarSeparator
 * -------------------------------------------------------------------------- */

export const MenubarSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-muted -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarArrow
 * -------------------------------------------------------------------------- */

export const MenubarArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarSub
 * -------------------------------------------------------------------------- */

export const MenubarSub = Sub;
