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
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { drawerContentVariants } from '@/cva/drawer-content';
import { buttonVariants } from '@/cva';

/* -----------------------------------------------------------------------------
 * Provider: DrawerContext
 * -------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 * Provider: DrawerContext
 * -------------------------------------------------------------------------- */

export const DrawerContext = createContext<{
  scrollable?: boolean;
  variant?: 'default' | 'simple';
  position?: 'left' | 'right';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Drawer
 * -------------------------------------------------------------------------- */

export function Drawer({
  scrollable = false,
  variant = 'default',
  position = 'right',
  ...props
}: React.ComponentProps<typeof Root> & {
  scrollable?: boolean;
  variant?: 'default' | 'simple';
  position?: 'left' | 'right';
}): React.JSX.Element {
  return (
    <DrawerContext.Provider value={{ position, scrollable, variant }}>
      <Root {...props} />
    </DrawerContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: DialogClose
 * -------------------------------------------------------------------------- */

export const DrawerClose = Close;

/* -----------------------------------------------------------------------------
 * Component: DrawerContent
 * -------------------------------------------------------------------------- */

export const DrawerContent = forwardRef<
  React.ElementRef<typeof Content>,
  Omit<VariantProps<typeof drawerContentVariants>, 'position' | 'scrollable'> &
    React.ComponentPropsWithoutRef<typeof Content> & {
      classNames?: {
        content?: string;
        overlay?: string;
      };
    }
>(({ children, className, classNames, ...props }, forwardedRef) => {
  const { variant, scrollable, position } = useContext(DrawerContext);

  return (
    <Portal>
      <Overlay
        className={cx(
          [
            'bg-background/80 fixed inset-0 z-40 flex',
            'data-state-open:animate-overlay-show data-state-closed:animate-overlay-hide',
          ],
          {
            'justify-end': position === 'right',
            'justify-start': position === 'left',
          },
          classNames?.overlay,
        )}
      >
        <Content
          className={twMerge(
            drawerContentVariants({ position, scrollable }),
            className,
            classNames?.content,
          )}
          ref={forwardedRef}
          {...props}
        >
          <>
            {children}
            {variant === 'default' && (
              <DrawerClose
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
              </DrawerClose>
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

export const DrawerTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: DrawerHeader
 * -------------------------------------------------------------------------- */

export function DrawerHeader({
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
 * Component: DrawerBody
 * -------------------------------------------------------------------------- */

export function DrawerBody({
  className,
  ...props
}: React.ComponentProps<'main'>): React.JSX.Element {
  return (
    <main className={twMerge('grow overflow-y-auto', className)} {...props} />
  );
}

/* -----------------------------------------------------------------------------
 * Component: DrawerFooter
 * -------------------------------------------------------------------------- */

export function DrawerFooter({
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
 * Component: DrawerTitle
 * -------------------------------------------------------------------------- */

export const DrawerTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={twMerge('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

DrawerTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: DrawerDescription
 * -------------------------------------------------------------------------- */

export const DrawerDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, forwardedRef) => (
  <Description
    className={twMerge('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

DrawerDescription.displayName = Description.displayName;
