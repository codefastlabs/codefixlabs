import {
  type DialogCloseProps as CloseProps,
  type DialogContentProps as ContentProps,
  type DialogDescriptionProps,
  type DialogProps as RootProps,
  type DialogTitleProps,
  type DialogTriggerProps,
  Close,
  Content,
  Description,
  DialogTrigger,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import {
  type ButtonVariantsProps,
  buttonVariants,
} from '@/server/button-variants';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const dialogContentVariants = cva(
  [
    'bg-background relative rounded-lg border shadow-lg focus:outline-none',
    'data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide',
  ],
  {
    defaultVariants: {
      scrollable: false,
    },
    variants: {
      scrollable: {
        true: 'flex max-h-full flex-col overflow-hidden',
      },
    },
  },
);

type DialogContentVariantsProps = VariantProps<typeof dialogContentVariants>;

/* -----------------------------------------------------------------------------
 * Provider: DialogContext
 * -------------------------------------------------------------------------- */

export const DialogContext = React.createContext<{
  scrollable?: boolean;
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Dialog
 * -------------------------------------------------------------------------- */

export interface DialogProps extends RootProps {
  scrollable?: boolean;
  variant?: 'default' | 'simple';
}

export function Dialog({
  scrollable = false,
  variant = 'default',
  ...props
}: DialogProps): React.JSX.Element {
  return (
    <DialogContext.Provider value={{ scrollable, variant }}>
      <Root {...props} />
    </DialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogClose
 * -------------------------------------------------------------------------- */

export interface DialogCloseProps extends CloseProps, ButtonVariantsProps {}
export const DialogClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  DialogCloseProps
>(({ className, variant, size, icon, block, ...props }, forwardedRef) => (
  <Close
    className={cn(buttonVariants({ block, icon, size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

DialogClose.displayName = Close.displayName;

/* -----------------------------------------------------------------------------
 * Component: DialogContent
 * -------------------------------------------------------------------------- */

export interface DialogContentProps
  extends Omit<DialogContentVariantsProps, 'scrollable'>,
    ContentProps {
  classNames?: {
    content?: string;
    overlay?: string;
  };
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  DialogContentProps
>(({ children, className, classNames, ...props }, forwardedRef) => {
  const { variant, scrollable } = React.useContext(DialogContext);

  return (
    <Portal>
      <Overlay
        className={cn(
          'bg-background/80 data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-40 p-4 sm:p-10',
          scrollable
            ? 'flex items-center justify-center'
            : 'grid place-items-center overflow-auto',
          classNames?.overlay,
        )}
      >
        <Content
          className={cn(
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
              <Close
                aria-label="Close"
                className={cn(
                  buttonVariants({ icon: true, size: 'sm', variant: 'ghost' }),
                  'absolute right-4 top-3.5 rounded-full',
                )}
              >
                <XIcon size={16} />
              </Close>
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

export { DialogTrigger };
export type { DialogTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: DialogHeader
 * -------------------------------------------------------------------------- */

export type DialogHeaderProps = React.HTMLAttributes<HTMLElement>;

export function DialogHeader({
  className,
  ...props
}: DialogHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn('py-3.75 grid shrink-0 gap-2 border-b px-6', className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogBody
 * -------------------------------------------------------------------------- */

export type DialogBodyProps = React.HTMLAttributes<HTMLElement>;

export function DialogBody({
  className,
  ...props
}: DialogBodyProps): React.JSX.Element {
  return <main className={cn('grow overflow-y-auto', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: DialogFooter
 * -------------------------------------------------------------------------- */

export type DialogFooterProps = React.HTMLAttributes<HTMLElement>;

export function DialogFooter({
  className,
  ...props
}: DialogFooterProps): React.JSX.Element {
  return (
    <footer
      className={cn(
        'py-3.75 flex shrink-0 flex-col-reverse gap-2 border-t px-6 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogTitle
 * -------------------------------------------------------------------------- */

export type { DialogTitleProps };

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  DialogTitleProps
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={cn('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

DialogTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: DialogDescription
 * -------------------------------------------------------------------------- */

export type { DialogDescriptionProps };

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  DialogDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <Description
    className={cn('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

DialogDescription.displayName = Description.displayName;
