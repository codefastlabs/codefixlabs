import {
  type MenubarArrowProps,
  type MenubarCheckboxItemProps as CheckboxItemProps,
  type MenubarContentProps,
  type MenubarGroupProps,
  type MenubarItemIndicatorProps,
  type MenubarItemProps as ItemProps,
  type MenubarLabelProps as LabelProps,
  type MenubarMenuProps,
  type MenubarProps,
  type MenubarRadioGroupProps,
  type MenubarRadioItemProps as RadioItemProps,
  type MenubarSeparatorProps,
  type MenubarSubContentProps,
  type MenubarSubProps,
  type MenubarSubTriggerProps as SubTriggerProps,
  type MenubarTriggerProps,
  Arrow,
  CheckboxItem,
  Content,
  Item,
  ItemIndicator,
  Label,
  MenubarGroup,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarSub,
  Portal,
  RadioItem,
  Root,
  Separator,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const menubarSubTriggerVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
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
          'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
          'data-[highlighted]:data-[state=open]:bg-accent data-[highlighted]:data-[state=open]:text-accent-foreground',
        ],
        destructive: [
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-[state=open]:bg-destructive-foreground data-[state=open]:text-destructive',
          'data-[highlighted]:bg-destructive-foreground data-[highlighted]:text-destructive',
          'data-[highlighted]:data-[state=open]:bg-destructive-foreground data-[highlighted]:data-[state=open]:text-destructive',
        ],
      },
    },
  },
);

type MenubarSubTriggerVariantsProps = VariantProps<
  typeof menubarSubTriggerVariants
>;

const menubarItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
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
          'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-[highlighted]:bg-destructive-foreground data-[highlighted]:text-destructive',
        ],
      },
    },
  },
);

type MenubarItemVariantsProps = VariantProps<typeof menubarItemVariants>;

const menubarCheckboxItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-[highlighted]:bg-destructive-foreground data-[highlighted]:text-destructive',
        ],
      },
    },
  },
);

type MenubarCheckboxItemVariantsProps = VariantProps<
  typeof menubarCheckboxItemVariants
>;

const menubarRadioItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-[highlighted]:bg-destructive-foreground data-[highlighted]:text-destructive',
        ],
      },
    },
  },
);

type MenubarRadioItemVariantsProps = VariantProps<
  typeof menubarRadioItemVariants
>;

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

type MenubarLabelVariantsProps = VariantProps<typeof menubarLabelVariants>;

/* -----------------------------------------------------------------------------
 * Component: Menubar
 * -------------------------------------------------------------------------- */

export type { MenubarProps };

export const Menubar = React.forwardRef<
  React.ElementRef<typeof Root>,
  MenubarProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
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

export { MenubarMenu };
export type { MenubarMenuProps };

/* -----------------------------------------------------------------------------
 * Component: MenubarTrigger
 * -------------------------------------------------------------------------- */

export type { MenubarTriggerProps };

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, forwardedRef) => (
  <Trigger
    className={cn(
      'flex cursor-pointer select-none items-center justify-between gap-1 rounded px-3 py-1.5 text-sm font-medium outline-none',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
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

export type { MenubarContentProps };

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  MenubarContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
        [
          'data-[state=open]:data-[side=top]:animate-slide-in-from-top',
          'data-[state=open]:data-[side=bottom]:animate-slide-in-from-bottom',
          'data-[state=open]:data-[side=left]:animate-slide-in-from-left',
          'data-[state=open]:data-[side=right]:animate-slide-in-from-right',
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

export type { MenubarSubContentProps };

export const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <SubContent
      className={cn(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg will-change-[opacity,transform]',
        [
          'data-[state=open]:data-[side=top]:animate-slide-in-from-top',
          'data-[state=open]:data-[side=bottom]:animate-slide-in-from-bottom',
          'data-[state=open]:data-[side=left]:animate-slide-in-from-left',
          'data-[state=open]:data-[side=right]:animate-slide-in-from-right',
        ],
        [
          'data-[state=closed]:data-[side=top]:animate-slide-out-to-top',
          'data-[state=closed]:data-[side=bottom]:animate-slide-out-to-bottom',
          'data-[state=closed]:data-[side=left]:animate-slide-out-to-left',
          'data-[state=closed]:data-[side=right]:animate-slide-out-to-right',
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

export type MenubarShortcutProps = React.HTMLAttributes<HTMLDivElement>;

export function MenubarShortcut({
  className,
  ...props
}: MenubarShortcutProps): React.JSX.Element {
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
 * Component: MenubarSubTrigger
 * -------------------------------------------------------------------------- */

export interface MenubarSubTriggerProps
  extends SubTriggerProps,
    MenubarSubTriggerVariantsProps {}

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  MenubarSubTriggerProps
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={cn(
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

export interface MenubarItemProps extends ItemProps, MenubarItemVariantsProps {
  shortcut?: string;
}

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  MenubarItemProps
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={cn(menubarItemVariants({ inset, variant }), className)}
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

export type { MenubarItemIndicatorProps };

export const MenubarItemIndicator = React.forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  MenubarItemIndicatorProps
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

MenubarItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarCheckboxItem
 * -------------------------------------------------------------------------- */

export interface MenubarCheckboxItemProps
  extends CheckboxItemProps,
    MenubarCheckboxItemVariantsProps {
  shortcut?: string;
}

export const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  MenubarCheckboxItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={cn(menubarCheckboxItemVariants({ variant }), className)}
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

export interface MenubarRadioItemProps
  extends RadioItemProps,
    MenubarRadioItemVariantsProps {
  shortcut?: string;
}

export const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  MenubarRadioItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={cn(menubarRadioItemVariants({ variant }), className)}
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

export { MenubarGroup };
export type { MenubarGroupProps };

/* -----------------------------------------------------------------------------
 * Component: MenubarLabel
 * -------------------------------------------------------------------------- */

export interface MenubarLabelProps
  extends LabelProps,
    MenubarLabelVariantsProps {}

export const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  MenubarLabelProps
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={cn(menubarLabelVariants({ inset }), className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarRadioGroup
 * -------------------------------------------------------------------------- */

export { MenubarRadioGroup };
export type { MenubarRadioGroupProps };

/* -----------------------------------------------------------------------------
 * Component: MenubarSeparator
 * -------------------------------------------------------------------------- */

export type { MenubarSeparatorProps };

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-muted -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarArrow
 * -------------------------------------------------------------------------- */

export type { MenubarArrowProps };

export const MenubarArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  MenubarArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

MenubarArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: MenubarSub
 * -------------------------------------------------------------------------- */

export { MenubarSub };
export type { MenubarSubProps };
