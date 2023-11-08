'use client';

import {
  Anchor,
  Arrow,
  Close,
  Content,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-popover';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/button';

/* -----------------------------------------------------------------------------
 * Provider: PopoverContext
 * -------------------------------------------------------------------------- */

export const PopoverContext = createContext<{
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Popover
 * -------------------------------------------------------------------------- */

export function Popover({
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Root> & {
  variant?: 'default' | 'simple';
}): React.JSX.Element {
  return (
    <PopoverContext.Provider value={{ variant }}>
      <Root {...props} />
    </PopoverContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: PopoverAnchor
 * -------------------------------------------------------------------------- */

export const PopoverAnchor = Anchor;

/* -----------------------------------------------------------------------------
 * Component: PopoverTrigger
 * -------------------------------------------------------------------------- */

export const PopoverTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: PopoverClose
 * -------------------------------------------------------------------------- */

export const PopoverClose = Close;

/* -----------------------------------------------------------------------------
 * Component: PopoverArrow
 * -------------------------------------------------------------------------- */

export const PopoverArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

PopoverArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: PopoverContent
 * -------------------------------------------------------------------------- */

export const PopoverContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ children, className, ...props }, forwardedRef) => {
  const { variant } = useContext(PopoverContext);

  return (
    <Portal>
      <Content
        className={twMerge(
          [
            'bg-popover text-popover-foreground relative z-40 w-auto rounded-md border shadow-lg will-change-[opacity,transform]',
            'min-w-[var(--radix-popover-trigger-width)]',
            [
              'data-state-open:data-side-top:animate-slide-in-from-top',
              'data-state-open:data-side-bottom:animate-slide-in-from-bottom',
              'data-state-open:data-side-left:animate-slide-in-from-left',
              'data-state-open:data-side-right:animate-slide-in-from-right',
            ],
            [
              'data-state-closed:data-side-top:animate-slide-out-to-top',
              'data-state-closed:data-side-bottom:animate-slide-out-to-bottom',
              'data-state-closed:data-side-left:animate-slide-out-to-left',
              'data-state-closed:data-side-right:animate-slide-out-to-right',
            ],
          ],
          className,
        )}
        ref={forwardedRef}
        sideOffset={5}
        {...props}
      >
        <>
          {children}

          {variant === 'default' && (
            <PopoverClose
              aria-label="Close"
              asChild
              className="absolute right-2.5 top-2.5"
            >
              <Button
                shape="pill"
                startIcon={<XIcon className="h-4 w-4" />}
                variant="ghost"
              />
            </PopoverClose>
          )}
        </>
      </Content>
    </Portal>
  );
});

PopoverContent.displayName = Content.displayName;
