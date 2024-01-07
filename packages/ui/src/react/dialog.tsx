import type {
  DialogCloseProps as CloseProps,
  DialogContentProps as ContentProps,
  DialogDescriptionProps,
  DialogProps as RootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@radix-ui/react-dialog';
import {
  Close,
  Content,
  Description,
  DialogTrigger,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { buttonVariants } from '@/classes/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/react/button';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const dialogContentVariants = cva(
  [
    'bg-background relative rounded-lg border shadow-lg focus:outline-none',
    'data-state-open:animate-content-show data-state-closed:animate-content-hide',
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

export interface DialogCloseProps extends CloseProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  shape?: ButtonProps['shape'];
  block?: ButtonProps['block'];
}
export const DialogClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  DialogCloseProps
>(
  (
    { className, variant = 'outline', size, shape, block, ...props },
    forwardedRef,
  ) => (
    <Close
      className={cn(
        buttonVariants({
          variant,
          size,
          shape,
          block,
        }),
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

DialogClose.displayName = Close.displayName;

/* -----------------------------------------------------------------------------
 * Component: DialogContent
 * -------------------------------------------------------------------------- */

export interface DialogContentProps
  extends Omit<VariantProps<typeof dialogContentVariants>, 'scrollable'>,
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
          [
            'bg-background/80 fixed inset-0 z-40 p-4 sm:p-10',
            'data-state-open:animate-overlay-show data-state-closed:animate-overlay-hide',
          ],
          scrollable
            ? 'flex items-center justify-center'
            : 'grid place-items-center overflow-auto',
          classNames?.overlay,
        )}
        data-test-id="overlay"
      >
        <Content
          className={cn(
            dialogContentVariants({ scrollable }),
            className,
            classNames?.content,
          )}
          data-test-id="content"
          ref={forwardedRef}
          {...props}
        >
          <>
            {children}
            {variant === 'default' && (
              <Close
                aria-label="Close"
                className={cn(
                  buttonVariants({
                    icon: true,
                    shape: 'pill',
                    size: 'sm',
                    variant: 'ghost',
                  }),
                  'absolute right-4 top-3.5',
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
        'py-3.75 flex shrink-0 flex-col-reverse gap-2 border-t px-6 sm:flex-row sm:justify-between',
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
