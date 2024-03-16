import {
  type ContextMenuArrowProps,
  type ContextMenuCheckboxItemProps as CheckboxItemProps,
  type ContextMenuContentProps,
  type ContextMenuGroupProps,
  type ContextMenuItemIndicatorProps,
  type ContextMenuItemProps as ItemProps,
  type ContextMenuLabelProps as LabelProps,
  type ContextMenuProps,
  type ContextMenuRadioGroupProps,
  type ContextMenuRadioItemProps as RadioItemProps,
  type ContextMenuSeparatorProps,
  type ContextMenuSubContentProps,
  type ContextMenuSubProps,
  type ContextMenuSubTriggerProps as SubTriggerProps,
  type ContextMenuTriggerProps,
  Arrow,
  CheckboxItem,
  Content,
  ContextMenu,
  ContextMenuGroup,
  ContextMenuRadioGroup,
  ContextMenuSub,
  ContextMenuTrigger,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-context-menu';
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react';
import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const contextMenuSubTriggerVariants = cva(
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

type ContextMenuSubTriggerVariantsProps = VariantProps<
  typeof contextMenuSubTriggerVariants
>;

const contextMenuItemVariants = cva(
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

type ContextMenuItemVariantsProps = VariantProps<
  typeof contextMenuItemVariants
>;

const contextMenuCheckboxItemVariants = cva(
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

type ContextMenuCheckboxItemVariantsProps = VariantProps<
  typeof contextMenuCheckboxItemVariants
>;

const contextMenuRadioItemVariants = cva(
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

type ContextMenuRadioItemVariantsProps = VariantProps<
  typeof contextMenuRadioItemVariants
>;

const contextMenuLabelVariants = cva(
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

type ContextMenuLabelVariantsProps = VariantProps<
  typeof contextMenuLabelVariants
>;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuItemIndicator
 * -------------------------------------------------------------------------- */

export type { ContextMenuItemIndicatorProps };

export const ContextMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof ItemIndicator>,
  ContextMenuItemIndicatorProps
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

ContextMenuItemIndicator.displayName = ItemIndicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuShortcut
 * -------------------------------------------------------------------------- */

export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLDivElement>;

export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps): React.JSX.Element {
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
 * Component: ContextMenuContent
 * -------------------------------------------------------------------------- */

export type { ContextMenuContentProps };

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  ContextMenuContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  </Portal>
));

ContextMenuContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSubContent
 * -------------------------------------------------------------------------- */

export type { ContextMenuSubContentProps };

export const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof SubContent>,
  ContextMenuSubContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <SubContent
      className={cn(
        'bg-popover text-popover-foreground relative z-40 min-w-[8rem] rounded-md border p-1 shadow-lg will-change-[opacity,transform]',
        [
          'data-[state=open]:data-[side=top]:animate-slide-in-from-bottom',
          'data-[state=open]:data-[side=bottom]:animate-slide-in-from-top',
          'data-[state=open]:data-[side=left]:animate-slide-in-from-right',
          'data-[state=open]:data-[side=right]:animate-slide-in-from-left',
        ],
        [
          'data-[state=closed]:data-[side=top]:animate-slide-out-to-bottom',
          'data-[state=closed]:data-[side=bottom]:animate-slide-out-to-top',
          'data-[state=closed]:data-[side=left]:animate-slide-out-to-right',
          'data-[state=closed]:data-[side=right]:animate-slide-out-to-left',
        ],
        className,
      )}
      ref={forwardedRef}
      sideOffset={2}
      {...props}
    />
  </Portal>
));

ContextMenuSubContent.displayName = SubContent.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSubTrigger
 * -------------------------------------------------------------------------- */

export interface ContextMenuSubTriggerProps
  extends SubTriggerProps,
    ContextMenuSubTriggerVariantsProps {}

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof SubTrigger>,
  ContextMenuSubTriggerProps
>(({ children, className, inset, variant, ...props }, forwardedRef) => (
  <SubTrigger
    className={cn(
      contextMenuSubTriggerVariants({
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
      <ContextMenuShortcut>
        <ChevronRightIcon className="text-accent-foreground" size={16} />
      </ContextMenuShortcut>
    </>
  </SubTrigger>
));

ContextMenuSubTrigger.displayName = SubTrigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuItem
 * -------------------------------------------------------------------------- */

export interface ContextMenuItemProps
  extends ItemProps,
    ContextMenuItemVariantsProps {
  shortcut?: string;
}

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  ContextMenuItemProps
>(
  (
    { children, className, inset, variant, shortcut, ...props },
    forwardedRef,
  ) => (
    <Item
      className={cn(
        contextMenuItemVariants({
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
            <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
          ) : null}
        </>
      )}
    </Item>
  ),
);

ContextMenuItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuCheckboxItem
 * -------------------------------------------------------------------------- */

export interface ContextMenuCheckboxItemProps
  extends CheckboxItemProps,
    ContextMenuCheckboxItemVariantsProps {
  shortcut?: string;
}

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <CheckboxItem
    className={cn(
      contextMenuCheckboxItemVariants({
        variant,
      }),
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      <ContextMenuItemIndicator>
        <CheckIcon size={16} />
      </ContextMenuItemIndicator>
      {children}
      {shortcut ? <ContextMenuShortcut>{shortcut}</ContextMenuShortcut> : null}
    </>
  </CheckboxItem>
));

ContextMenuCheckboxItem.displayName = CheckboxItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuRadioItem
 * -------------------------------------------------------------------------- */

export interface ContextMenuRadioItemProps
  extends RadioItemProps,
    ContextMenuRadioItemVariantsProps {
  shortcut?: string;
}

export const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioItem>,
  ContextMenuRadioItemProps
>(({ children, className, variant, shortcut, ...props }, forwardedRef) => (
  <RadioItem
    className={cn(contextMenuRadioItemVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <ContextMenuItemIndicator>
        <DotIcon size={16} />
      </ContextMenuItemIndicator>
      {children}
      {shortcut ? <ContextMenuShortcut>{shortcut}</ContextMenuShortcut> : null}
    </>
  </RadioItem>
));

ContextMenuRadioItem.displayName = RadioItem.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuArrow
 * -------------------------------------------------------------------------- */

export type { ContextMenuArrowProps };

export const ContextMenuArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  ContextMenuArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuGroup
 * -------------------------------------------------------------------------- */

export { ContextMenuGroup };
export type { ContextMenuGroupProps };

/* -----------------------------------------------------------------------------
 * Component: ContextMenuLabel
 * -------------------------------------------------------------------------- */

export interface ContextMenuLabelProps
  extends LabelProps,
    ContextMenuLabelVariantsProps {}

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  ContextMenuLabelProps
>(({ className, inset = false, ...props }, forwardedRef) => (
  <Label
    className={cn(contextMenuLabelVariants({ inset }), className)}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuRadioGroup
 * -------------------------------------------------------------------------- */

export { ContextMenuRadioGroup };
export type { ContextMenuRadioGroupProps };

/* -----------------------------------------------------------------------------
 * Component: ContextMenu
 * -------------------------------------------------------------------------- */

export { ContextMenu };
export type { ContextMenuProps };

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSeparator
 * -------------------------------------------------------------------------- */

export type { ContextMenuSeparatorProps };

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={cn('bg-border -mx-1 my-1.5 h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

ContextMenuSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: ContextMenuSub
 * -------------------------------------------------------------------------- */

export { ContextMenuSub };
export type { ContextMenuSubProps };

/* -----------------------------------------------------------------------------
 * Component: ContextMenuTrigger
 * -------------------------------------------------------------------------- */

export { ContextMenuTrigger };
export type { ContextMenuTriggerProps };
