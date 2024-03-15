import {
  type DialogCloseProps,
  type DialogContentProps,
  type DialogDescriptionProps as DrawerDescriptionProps,
  type DialogProps,
  type DialogTitleProps as DrawerTitleProps,
  type DialogTriggerProps as DrawerTriggerProps,
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger as DrawerTrigger,
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

const drawerContentVariants = cva(
  'bg-background relative shadow-lg focus:outline-none',
  {
    defaultVariants: {
      side: 'right',
      scrollable: false,
    },
    variants: {
      side: {
        left: 'border-r data-state-open:animate-drawer-show-from-left data-state-closed:animate-drawer-hide-to-left',
        right:
          'border-l data-state-open:animate-drawer-show-from-right data-state-closed:animate-drawer-hide-to-right',
        top: 'border-b data-state-open:animate-drawer-show-from-top data-state-closed:animate-drawer-hide-to-top',
        bottom:
          'border-t data-state-open:animate-drawer-show-from-bottom data-state-closed:animate-drawer-hide-to-bottom',
      },
      scrollable: {
        false: 'overflow-y-auto',
        true: 'flex flex-col',
      },
    },
  },
);

type DrawerContentVariantsProps = VariantProps<typeof drawerContentVariants>;

/* -----------------------------------------------------------------------------
 * Provider: DrawerContext
 * -------------------------------------------------------------------------- */

export const DrawerContext = React.createContext<{
  scrollable?: boolean;
  variant?: 'default' | 'simple';
  side?: 'left' | 'right' | 'top' | 'bottom';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Drawer
 * -------------------------------------------------------------------------- */

export interface DrawerProps extends DialogProps {
  scrollable?: boolean;
  variant?: 'default' | 'simple';
  side?: 'left' | 'right' | 'top' | 'bottom';
}

export function Drawer({
  scrollable = false,
  variant = 'default',
  side = 'right',
  ...props
}: DrawerProps): React.JSX.Element {
  return (
    <DrawerContext.Provider value={{ side, scrollable, variant }}>
      <Root {...props} />
    </DrawerContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DrawerClose
 * -------------------------------------------------------------------------- */

export interface DrawerCloseProps
  extends DialogCloseProps,
    ButtonVariantsProps {}
export const DrawerClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  DrawerCloseProps
>(({ className, variant, size, block, icon, ...props }, forwardedRef) => (
  <Close
    className={cn(buttonVariants({ block, icon, size, variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

DrawerClose.displayName = Close.displayName;

/* -----------------------------------------------------------------------------
 * Component: DrawerContent
 * -------------------------------------------------------------------------- */

export interface DrawerContentProps
  extends Omit<DrawerContentVariantsProps, 'side' | 'scrollable'>,
    DialogContentProps {
  classNames?: {
    content?: string;
    overlay?: string;
  };
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  DrawerContentProps
>(({ children, className, classNames, ...props }, forwardedRef) => {
  const { variant, scrollable, side } = React.useContext(DrawerContext);

  return (
    <Portal>
      <Overlay
        className={cn(
          [
            'bg-background/80 fixed inset-0 z-40 flex',
            'data-state-open:animate-overlay-show data-state-closed:animate-overlay-hide',
          ],
          {
            'justify-end': side === 'right',
            'justify-start': side === 'left',
            'items-end': side === 'bottom',
            'items-start': side === 'top',
          },
          classNames?.overlay,
        )}
      >
        <Content
          className={cn(
            drawerContentVariants({ side, scrollable }),
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

DrawerContent.displayName = 'DrawerContent';

/* -----------------------------------------------------------------------------
 * Component: DrawerTrigger
 * -------------------------------------------------------------------------- */

export { DrawerTrigger };
export type { DrawerTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: DrawerHeader
 * -------------------------------------------------------------------------- */

export type DrawerHeaderProps = React.HTMLAttributes<HTMLElement>;

export function DrawerHeader({
  className,
  ...props
}: DrawerHeaderProps): React.JSX.Element {
  return (
    <header
      className={cn('py-3.75 grid shrink-0 gap-2 border-b px-6', className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DrawerBody
 * -------------------------------------------------------------------------- */

export type DrawerBodyProps = React.HTMLAttributes<HTMLElement>;

export function DrawerBody({
  className,
  ...props
}: DrawerBodyProps): React.JSX.Element {
  return <main className={cn('grow overflow-y-auto', className)} {...props} />;
}

/* -----------------------------------------------------------------------------
 * Component: DrawerFooter
 * -------------------------------------------------------------------------- */

export type DrawerFooterProps = React.HTMLAttributes<HTMLElement>;

export function DrawerFooter({
  className,
  ...props
}: DrawerFooterProps): React.JSX.Element {
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
 * Component: DrawerTitle
 * -------------------------------------------------------------------------- */

export type { DrawerTitleProps };

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  DrawerTitleProps
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={cn('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

DrawerTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: DrawerDescription
 * -------------------------------------------------------------------------- */

export type { DrawerDescriptionProps };

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  DrawerDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <Description
    className={cn('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

DrawerDescription.displayName = Description.displayName;
