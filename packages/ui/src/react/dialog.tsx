'use client';

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cx } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { buttonVariants, dialogContentVariants } from '@/cva';

/* -----------------------------------------------------------------------------
 * Provider: DialogContext
 * -------------------------------------------------------------------------- */

export const DialogContext = createContext<{
  scrollable?: boolean;
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Dialog
 * -------------------------------------------------------------------------- */

export function Dialog({
  scrollable = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Root> & {
  scrollable?: boolean;
  variant?: 'default' | 'simple';
}): React.JSX.Element {
  return (
    <DialogContext.Provider value={{ scrollable, variant }}>
      <Root {...props} />
    </DialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogClose
 * -------------------------------------------------------------------------- */

export const DialogClose = Close;

/* -----------------------------------------------------------------------------
 * Component: DialogContent
 * -------------------------------------------------------------------------- */

export const DialogContent = forwardRef<
  React.ElementRef<typeof Content>,
  Omit<VariantProps<typeof dialogContentVariants>, 'scrollable'> &
    React.ComponentPropsWithoutRef<typeof Content> & {
      classNames?: {
        content?: string;
        overlay?: string;
      };
    }
>(({ children, className, classNames, ...props }, forwardedRef) => {
  const { variant, scrollable } = useContext(DialogContext);

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
            dialogContentVariants({ scrollable }),
            className,
            classNames?.content,
          )}
          ref={forwardedRef}
          {...props}
        >
          <>
            {children}
            {variant === 'default' && (
              <DialogClose
                aria-label="Close"
                className={twMerge(
                  buttonVariants({
                    icon: true,
                    shape: 'pill',
                    size: 'sm',
                    variant: 'ghost',
                  }),
                  'absolute right-4 top-3.5',
                )}
              >
                <XIcon className="h-4 w-4" />
              </DialogClose>
            )}
          </>
        </Content>
      </Overlay>
    </Portal>
  );
});

DialogContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: DialogTrigger
 * -------------------------------------------------------------------------- */

export const DialogTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: DialogHeader
 * -------------------------------------------------------------------------- */

export function DialogHeader({
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
 * Component: DialogBody
 * -------------------------------------------------------------------------- */

export function DialogBody({
  className,
  ...props
}: React.ComponentProps<'main'>): React.JSX.Element {
  return (
    <main className={twMerge('grow overflow-y-auto', className)} {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogFooter
 * -------------------------------------------------------------------------- */

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<'footer'>): React.JSX.Element {
  return (
    <footer
      className={twMerge(
        'flex shrink-0 flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-between',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogTitle
 * -------------------------------------------------------------------------- */

export const DialogTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={twMerge('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

DialogTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: DialogDescription
 * -------------------------------------------------------------------------- */

export const DialogDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, forwardedRef) => (
  <Description
    className={twMerge('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

DialogDescription.displayName = Description.displayName;
