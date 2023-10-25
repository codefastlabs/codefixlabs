'use client';

import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cx } from 'class-variance-authority';
import * as React from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { alertDialogContentVariants, buttonVariants } from '@/cva';

/* -----------------------------------------------------------------------------
 * Provider: AlertDialogContext
 * -------------------------------------------------------------------------- */

export const AlertDialogContext = createContext<{
  scrollable?: boolean;
}>({});

/* -----------------------------------------------------------------------------
 * Component: AlertDialog
 * -------------------------------------------------------------------------- */

export function AlertDialog({
  scrollable = false,
  ...props
}: React.ComponentProps<typeof Root> & {
  scrollable?: boolean;
}): React.JSX.Element {
  return (
    <AlertDialogContext.Provider value={{ scrollable }}>
      <Root {...props} />
    </AlertDialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogContent
 * -------------------------------------------------------------------------- */

export const AlertDialogContent = forwardRef<
  React.ElementRef<typeof Content>,
  Omit<VariantProps<typeof alertDialogContentVariants>, 'scrollable'> &
    React.ComponentPropsWithoutRef<typeof Content> & {
      classNames?: {
        content?: string;
        overlay?: string;
      };
    }
>(({ className, classNames, ...props }, forwardedRef) => {
  const { scrollable } = useContext(AlertDialogContext);

  return (
    <Portal>
      <Overlay
        className={cx(
          [
            'bg-background/80 fixed inset-0 z-40 p-4 sm:p-10',
            'data-state-open:animate-overlay-show data-state-closed:animate-overlay-hide',
          ],
          scrollable
            ? 'flex items-center justify-center'
            : 'grid place-items-center overflow-auto',
          classNames?.overlay,
        )}
      >
        <Content
          className={twMerge(
            alertDialogContentVariants({ className, scrollable }),
            classNames?.content,
          )}
          ref={forwardedRef}
          {...props}
        />
      </Overlay>
    </Portal>
  );
});

AlertDialogContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogAction
 * -------------------------------------------------------------------------- */

export const AlertDialogAction = forwardRef<
  React.ElementRef<typeof Action>,
  React.ComponentPropsWithoutRef<typeof Action>
>(({ className, ...props }, forwardedRef) => (
  <Action
    className={twMerge(buttonVariants({ variant: 'destructive' }), className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDialogAction.displayName = Action.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogCancel
 * -------------------------------------------------------------------------- */

export const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof Cancel>,
  React.ComponentPropsWithoutRef<typeof Cancel>
>(({ className, ...props }, forwardedRef) => (
  <Cancel
    ref={forwardedRef}
    {...props}
    className={twMerge(buttonVariants({ variant: 'outline' }), className)}
  />
));

AlertDialogCancel.displayName = Cancel.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogDescription
 * -------------------------------------------------------------------------- */

export const AlertDialogDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, forwardedRef) => (
  <Description
    ref={forwardedRef}
    {...props}
    className={twMerge('text-muted-foreground text-sm', className)}
  />
));

AlertDialogDescription.displayName = Description.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTitle
 * -------------------------------------------------------------------------- */

export const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={twMerge('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDialogTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTrigger
 * -------------------------------------------------------------------------- */

export const AlertDialogTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogHeader
 * -------------------------------------------------------------------------- */

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'header'>): React.JSX.Element {
  return (
    <header
      className={twMerge('grid shrink-0 gap-2 border-b px-6 py-4', className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogBody
 * -------------------------------------------------------------------------- */

export function AlertDialogBody({
  className,
  ...props
}: React.ComponentProps<'main'>): React.JSX.Element {
  return (
    <main className={twMerge('grow overflow-y-auto', className)} {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogFooter
 * -------------------------------------------------------------------------- */

export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={twMerge(
        'flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-between',
        className,
      )}
      {...props}
    />
  );
}
