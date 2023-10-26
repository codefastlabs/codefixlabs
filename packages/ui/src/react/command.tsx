'use client';

import type { VariantProps } from 'class-variance-authority';
import {
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandInput as Input,
  CommandItem as Item,
  CommandList as List,
  CommandLoading as Loading,
  CommandRoot as Root,
  CommandSeparator as Separator,
} from 'cmdk';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Dialog, DialogContent } from '@/react/dialog';
import { commandVariants } from '@/cva';

/* -----------------------------------------------------------------------------
 * Component: Command
 * -------------------------------------------------------------------------- */

export const Command = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof commandVariants>
>(({ className, variant = 'primary', ...props }, forwardedRef) => (
  <Root
    className={twMerge(commandVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Command.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandInput
 * -------------------------------------------------------------------------- */

export const CommandInput = forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, forwardedRef) => (
  <div className="flex items-center gap-2 border-b px-3">
    <SearchIcon className="h-5 w-5 shrink-0 opacity-50" />
    <Input
      className={twMerge(
        'h-11 w-full min-w-0 rounded-md bg-transparent py-3 text-sm outline-none',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  </div>
));

CommandInput.displayName = Input.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandList
 * -------------------------------------------------------------------------- */

export const CommandList = forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, forwardedRef) => (
  <List
    className={twMerge('overflow-y-auto overflow-x-hidden', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandList.displayName = List.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandLoading
 * -------------------------------------------------------------------------- */

export const CommandLoading = forwardRef<
  React.ElementRef<typeof Loading>,
  React.ComponentPropsWithoutRef<typeof Loading>
>(({ ...props }, forwardedRef) => <Loading ref={forwardedRef} {...props} />);

CommandLoading.displayName = Loading.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandEmpty
 * -------------------------------------------------------------------------- */

export const CommandEmpty = forwardRef<
  React.ElementRef<typeof Empty>,
  React.ComponentPropsWithoutRef<typeof Empty>
>(({ className, ...props }, forwardedRef) => (
  <Empty
    className={twMerge('py-6 text-center text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandEmpty.displayName = Empty.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandGroup
 * -------------------------------------------------------------------------- */

export const CommandGroup = forwardRef<
  React.ElementRef<typeof Group>,
  React.ComponentPropsWithoutRef<typeof Group>
>(({ className, ...props }, forwardedRef) => (
  <Group
    className={twMerge(
      'overflow-hidden p-1',
      '[&_[cmdk-group-items]]:space-y-0.5',
      '[&_[cmdk-group-heading]]:text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CommandGroup.displayName = Group.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandSeparator
 * -------------------------------------------------------------------------- */

export const CommandSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, forwardedRef) => (
  <Separator
    className={twMerge('bg-border h-px', className)}
    ref={forwardedRef}
    {...props}
  />
));

CommandSeparator.displayName = Separator.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandItem
 * -------------------------------------------------------------------------- */

export const CommandItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, forwardedRef) => (
  <Item
    className={twMerge(
      'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none',
      'hover:text-accent-foreground hover:bg-accent',
      'aria-selected:text-accent-foreground aria-selected:bg-accent',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CommandItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: CommandDialog
 * -------------------------------------------------------------------------- */

export function CommandDialog({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog>): React.JSX.Element {
  return (
    <Dialog scrollable variant="simple" {...props}>
      <DialogContent className="w-full max-w-md">
        <Command variant="dialog">{children}</Command>
      </DialogContent>
    </Dialog>
  );
}
