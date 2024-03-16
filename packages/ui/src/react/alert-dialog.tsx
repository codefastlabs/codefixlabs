import {
  type AlertDialogActionProps as ActionProps,
  type AlertDialogCancelProps as CancelProps,
  type AlertDialogContentProps as ContentProps,
  type AlertDialogDescriptionProps,
  type AlertDialogProps as RootProps,
  type AlertDialogTitleProps,
  type AlertDialogTriggerProps,
  Action,
  AlertDialogTrigger,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-alert-dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import {
  type ButtonVariantsProps,
  buttonVariants,
} from '@/server/button-variants';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const alertDialogContentVariants = cva(
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
        true: 'flex max-h-full flex-col',
      },
    },
  },
);

type AlertDialogContentVariantsProps = VariantProps<
  typeof alertDialogContentVariants
>;

/* -----------------------------------------------------------------------------
 * Provider: AlertDialogContext
 * -------------------------------------------------------------------------- */

export const AlertDialogContext = React.createContext<{
  scrollable?: boolean;
}>({});

/* -----------------------------------------------------------------------------
 * Component: AlertDialog
 * -------------------------------------------------------------------------- */

export interface AlertDialogProps extends RootProps {
  scrollable?: boolean;
}

export function AlertDialog({
  scrollable = false,
  ...props
}: AlertDialogProps): React.JSX.Element {
  return (
    <AlertDialogContext.Provider value={{ scrollable }}>
      <Root {...props} />
    </AlertDialogContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogContent
 * -------------------------------------------------------------------------- */

export interface AlertDialogContentProps
  extends Omit<AlertDialogContentVariantsProps, 'scrollable'>,
    ContentProps {
  classNames?: {
    content?: string;
    overlay?: string;
  };
}
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  AlertDialogContentProps
>(({ className, classNames, ...props }, forwardedRef) => {
  const { scrollable } = React.useContext(AlertDialogContext);

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
            alertDialogContentVariants({ scrollable }),
            className,
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

export interface AlertDialogActionProps
  extends ActionProps,
    ButtonVariantsProps {}

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Action>,
  AlertDialogActionProps
>(
  (
    { className, variant = 'destructive', size, block, icon, ...props },
    forwardedRef,
  ) => (
    <Action
      className={cn(buttonVariants({ variant, size, block, icon }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

AlertDialogAction.displayName = Action.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogCancel
 * -------------------------------------------------------------------------- */

export interface AlertDialogCancelProps
  extends CancelProps,
    ButtonVariantsProps {}

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Cancel>,
  AlertDialogCancelProps
>(
  (
    { className, variant = 'outline', size, block, icon, ...props },
    forwardedRef,
  ) => (
    <Cancel
      className={cn(buttonVariants({ variant, size, icon, block }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

AlertDialogCancel.displayName = Cancel.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogDescription
 * -------------------------------------------------------------------------- */

export type { AlertDialogDescriptionProps };

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <Description
    ref={forwardedRef}
    {...props}
    className={cn('text-muted-foreground text-sm', className)}
  />
));

AlertDialogDescription.displayName = Description.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTitle
 * -------------------------------------------------------------------------- */

export type { AlertDialogTitleProps };

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  AlertDialogTitleProps
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={cn('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDialogTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: AlertDialogTrigger
 * -------------------------------------------------------------------------- */

export { AlertDialogTrigger };
export type { AlertDialogTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: AlertDialogHeader
 * -------------------------------------------------------------------------- */

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLElement>;

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn('py-3.75 grid shrink-0 gap-2 border-b px-6', className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogBody
 * -------------------------------------------------------------------------- */

export type AlertDialogBodyProps = React.HTMLAttributes<HTMLElement>;

export function AlertDialogBody({
  className,
  ...props
}: AlertDialogBodyProps): React.JSX.Element {
  return <main className={cn('grow overflow-y-auto', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: AlertDialogFooter
 * -------------------------------------------------------------------------- */

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        'py-3.75 flex shrink-0 flex-col-reverse gap-2 border-t px-6 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}
